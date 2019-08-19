import * as fs from 'fs'
import * as path from 'path'
import { app, BrowserWindow, ipcMain, remote } from 'electron'
import { Journal } from 'edjr'
import { ReceiveTextEvent } from '../../common/types'

export enum IFFLabel {
  ally = 'Ally',
  neutral = 'Neutral',
  enemy = 'Enemy',
}

export interface IFFRecord {
  name: string
  label: IFFLabel
  notes?: string
}

export default (journal: Journal, { webContents }: BrowserWindow) => {
  const iffStore = new IFFStore()
  webContents.on('dom-ready', () => webContents.send('iffSnapshot', iffStore.getAll()))

  ipcMain.on('iffAdd', (event: any, payload: IFFRecord) => iffStore.set(payload))

  ipcMain.on('iffDelete', (event: any, payload: string) => iffStore.del(payload))

  journal.on('ReceiveText', (e: ReceiveTextEvent) => {
    if (iffStore.get(e.From)) {
      // handle target found
    }
  })
}

class IFFStore {
  private readonly path: string
  private data: IFFRecord[]

  constructor() {
    const appData = (app || remote.app).getPath('userData')
    this.path = path.join(appData, 'iff.json')
    this.data = IFFStore.parseDataFile(this.path)
  }

  get(name: string) {
    return this.data.find(it => it.name === name.toLowerCase())
  }

  getAll() {
    return this.data
  }

  set(record: IFFRecord) {
    this.data = [record, ...this.data.filter(it => it.name.toLowerCase() !== record.name.toLowerCase())]
    this.persist()
  }

  del(name: string) {
    this.data = this.data.filter(it => it.name.toLowerCase() !== name.toLowerCase())
    this.persist()
  }

  private persist = () => fs.writeFileSync(this.path, JSON.stringify(this.data))

  private static parseDataFile(filePath: string): IFFRecord[] {
    try {
      return JSON.parse(fs.readFileSync(filePath).toString())
    } catch (error) {
      return []
    }
  }
}
