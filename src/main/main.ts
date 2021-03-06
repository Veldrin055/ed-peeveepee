import { app, BrowserWindow } from 'electron'
import * as path from 'path'
import * as url from 'url'
import journal from './journal'
import iffStore from './iff'
import settings from './settings'
import { Journal } from 'edjr'
import autoUpdate from './autoUpdate'

let win: BrowserWindow | null
let jrnl: Journal

const installExtensions = async () => {
  const installer = require('electron-devtools-installer')
  const forceDownload = !!process.env.UPGRADE_EXTENSIONS
  const extensions = ['REACT_DEVELOPER_TOOLS', 'REDUX_DEVTOOLS']

  return Promise.all(extensions.map(name => installer.default(installer[name], forceDownload))).catch(console.log)
}

const createWindow = async () => {
  if (process.env.NODE_ENV !== 'production') {
    await installExtensions()
  }

  win = new BrowserWindow({
    width: 800,
    height: 830,
    frame: false,
    resizable: true,
    hasShadow: true,
    thickFrame: true,
    backgroundColor: '#616161',
    title: 'ED: PvP',
  })
  jrnl = journal(win)
  iffStore(jrnl, win)
  settings(win)
  autoUpdate(win)

  if (process.env.NODE_ENV !== 'production') {
    process.env.ELECTRON_DISABLE_SECURITY_WARNINGS = '1'
    win.loadURL(`http://localhost:2003`)
  } else {
    win.loadURL(
      url.format({
        pathname: path.join(__dirname, 'index.html'),
        protocol: 'file:',
        slashes: true,
      })
    )
  }

  if (process.env.NODE_ENV !== 'production') {
    // Open DevTools, see https://github.com/electron/electron/issues/12438 for why we wait for dom-ready
    win.webContents.once('dom-ready', () => {
      win!.webContents.openDevTools()
    })
  }

  win.on('closed', () => {
    win = null
  })
}

app.setAppUserModelId(process.execPath) // todo dev?
app.on('ready', createWindow)

app.on('window-all-closed', () => {
  jrnl.stop()
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (win === null) {
    createWindow()
  }
})
