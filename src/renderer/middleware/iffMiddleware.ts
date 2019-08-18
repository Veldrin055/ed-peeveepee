import { Middleware } from 'redux'
import { ipcRenderer } from 'electron'
import { ADD, IffAddAction } from '../actions/iffActions'

export const addIff: Middleware = store => next => action => {
  if (action.type === ADD) {
    ipcRenderer.send('iffAdd', (action as IffAddAction).payload)
  }
  return next(action)
}
