import { BrowserWindow, ipcMain, Notification } from 'electron'
import { Journal } from 'edjr'
import {
  InterdictedEvent,
  InterdictionEvent,
  ReceiveTextEvent,
  SendTextEvent,
  ShipTargetedEvent,
} from '../../common/types'
import IFFStore, { IFFRecord } from './iffStore'

export default (journal: Journal, { webContents }: BrowserWindow) => {
  const iffStore = new IFFStore()
  const cooldownCache = new Map<string, boolean>()

  const targetIdentified = ({ name, label, notes }: IFFRecord) => {
    if (cooldownCache.has(name)) {
      return
    }
    const notification = new Notification({
      title: 'Target found!',
      body: `${label}: ${name}
      ${notes ? notes : ''}`,
    })

    notification.show()
    cooldownCache.set(name, true)
    // Don't spam notifications. Set Cool down of 30 seconds
    setTimeout(() => cooldownCache.delete(name), 30 * 1000)
  }

  webContents.on('dom-ready', () => webContents.send('iffSnapshot', iffStore.getAll()))

  ipcMain.on('iffAdd', (event: any, payload: IFFRecord) => iffStore.set(payload))

  ipcMain.on('iffDelete', (event: any, payload: string) => iffStore.del(payload))

  journal.on('ReceiveText', ({ From }: ReceiveTextEvent, historical) => {
    if (!historical) {
      const record = iffStore.get(From)
      if (record) {
        targetIdentified(record)
      }
    }
  })

  journal.on('SendText', ({ To }: SendTextEvent, historical) => {
    if (!historical) {
      const record = iffStore.get(To)
      if (record) {
        targetIdentified(record)
      }
    }
  })

  journal.on('Interdiction', ({ IsPlayer, Interdicted }: InterdictionEvent, historical) => {
    if (!historical && IsPlayer) {
      const record = iffStore.get(Interdicted)
      if (record) {
        targetIdentified(record)
      }
    }
  })

  journal.on('Interdicted', ({ IsPlayer, Interdictor }: InterdictedEvent, historical) => {
    if (!historical && IsPlayer) {
      const record = iffStore.get(Interdictor)
      if (record) {
        targetIdentified(record)
      }
    }
  })

  journal.on('ShipTargeted', ({ PilotName }: ShipTargetedEvent, historical) => {
    const pattern = /\$cmdr_decorate:#name=(.*);/
    if (!historical && PilotName && pattern.test(PilotName)) {
      const cmdr = PilotName.match(pattern)
      if (cmdr && cmdr.length) {
        const record = iffStore.get(cmdr[0])
        if (record) {
          targetIdentified(record)
        }
      }
    }
  })
}
