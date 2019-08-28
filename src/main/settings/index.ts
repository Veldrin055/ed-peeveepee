import { app, remote, ipcMain, BrowserWindow } from 'electron'
import * as path from 'path'
import * as fs from 'fs'
import { Settings } from '@material-ui/icons'

export interface Settings {
  volume: number
}

class SettingsStore {
  private readonly path: string
  private data: Settings

  constructor() {
    const appData = (app || remote.app).getPath('userData')
    this.path = path.join(appData, 'settings.json')
    this.data = SettingsStore.parseDataFile(this.path)
  }

  get() {
    return this.data
  }

  set(settings: Settings) {
    this.data = {
      ...this.data,
      ...settings,
    }
    this.persist()
  }

  private persist = () => fs.writeFileSync(this.path, JSON.stringify(this.data))

  private static parseDataFile(filePath: string): Settings {
    try {
      return JSON.parse(fs.readFileSync(filePath).toString())
    } catch (error) {
      return { volume: 50 }
    }
  }
}

export default ({ webContents }: BrowserWindow) => {
  const settingsStore = new SettingsStore()

  ipcMain.on('settings', (event: any, payload: Settings) => {
    settingsStore.set(payload)
  })

  webContents.on('dom-ready', () => webContents.send('settingsSnapshot', settingsStore.get()))
}
