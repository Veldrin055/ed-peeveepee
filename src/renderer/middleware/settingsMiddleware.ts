import { Middleware } from 'redux'
import { KILL } from '../actions/cmdrStateActions'
import { SET_SETTINGS } from '../actions/settingsActions'
import { ipcRenderer } from 'electron'

const killAudio = new Audio(require('../assets/killsound.wav'))

export const settingsMiddlware: Middleware = store => next => action => {
  if (action.type === KILL && !action.payload.historical) {
    killAudio.volume = store.getState().settings.volume / 100
    killAudio.play().catch(err => console.error(err))
  }
  if (action.type === SET_SETTINGS) {
    ipcRenderer.send('settings', { ...action.payload })
  }
  return next(action)
}
