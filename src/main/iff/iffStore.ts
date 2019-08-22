import { app, remote } from 'electron'
import * as path from 'path'
import * as fs from 'fs'

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

export default class IFFStore {
  private readonly path: string
  private data: IFFRecord[]

  constructor() {
    const appData = (app || remote.app).getPath('userData')
    this.path = path.join(appData, 'iff.json')
    this.data = IFFStore.parseDataFile(this.path)
  }

  get(name: string) {
    return this.data.find(it => it.name.toLowerCase() === name.toLowerCase())
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
