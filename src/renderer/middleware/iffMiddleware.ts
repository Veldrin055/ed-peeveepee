import { Middleware } from 'redux'
import { ipcRenderer } from 'electron'
import { ADD, DELETE, IffAddAction, IffDeleteAction } from '../actions/iffActions'

export const addIff: Middleware = store => next => action => {
  if (action.type === ADD) {
    ipcRenderer.send('iffAdd', (action as IffAddAction).payload)
  } else if (action.type === DELETE) {
    ipcRenderer.send('iffDelete', (action as IffDeleteAction).name)
  }
  return next(action)
}
