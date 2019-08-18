import * as fs from 'fs'
import * as path from 'path'
import { app, remote } from 'electron'
import { Journal } from 'edjr'
import { ReceiveTextEvent } from '../../common/types'
import BrowserWindow = Electron.BrowserWindow

export enum IFFLabel {
  ally,
  neutral,
  enemy,
}

export interface IFFRecord {
  name: string
  label: IFFLabel
  notes?: string
}

export default (journal: Journal, { webContents }: BrowserWindow) => {
  const iffStore = new IFFStore()
  webContents.send('iffSnapshot', iffStore.getAll())

  journal.on('ReceiveText', (e: ReceiveTextEvent) => {
    if (iffStore.get(e.From)) {
      // handle target found
    }
  })
}

class IFFStore {
  private readonly path: string
  private readonly data: Map<string, IFFRecord>

  constructor() {
    const appData = (app || remote.app).getPath('userData')
    this.path = path.join(appData, 'iff.json')
    this.data = IFFStore.parseDataFile(this.path)
  }

  get(name: string) {
    return this.data.get(name.toLowerCase())
  }

  getAll() {
    const records: IFFRecord[] = []
    this.data.forEach(record => records.push(record))
    return records
  }

  set(record: IFFRecord) {
    this.data.set(record.name.toLowerCase(), record)
    fs.writeFileSync(this.path, JSON.stringify(this.data))
  }

  delete(name: string) {
    this.data.delete(name.toLowerCase())
  }

  private static parseDataFile(filePath: string) {
    try {
      return JSON.parse(fs.readFileSync(filePath).toString())
    } catch (error) {
      return []
    }
  }
}

// store provides crud
// emits add actions to the renderer
// render redux provides middleware to change the file store on ui update actions
