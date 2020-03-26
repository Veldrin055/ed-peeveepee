import { autoUpdater } from 'electron-updater'
import { BrowserWindow, ipcMain } from 'electron'

export default ({ webContents }: BrowserWindow) => {
  autoUpdater.allowPrerelease = true
  autoUpdater.checkForUpdatesAndNotify()

  autoUpdater.on('update-available', () => webContents.send('update-available'))

  autoUpdater.on('update-downloaded', () => {
    webContents.send('update-downloaded')
    ipcMain.on('restart-app', autoUpdater.quitAndInstall)
  })
}
