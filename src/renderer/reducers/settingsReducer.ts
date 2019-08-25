import { Reducer } from 'redux'
import { SET_SETTINGS, SettingsAction } from '../actions/settingsActions'

export interface SettingsState {
  readonly volume: number
}

const defaultState: SettingsState = {
  volume: 5,
}

export const settingsReducer: Reducer<SettingsState, SettingsAction> = (
  state = defaultState,
  action: SettingsAction
) => {
  if (action.type === SET_SETTINGS) {
    return {
      ...state,
      ...action.payload,
    }
  }
  return state
}
