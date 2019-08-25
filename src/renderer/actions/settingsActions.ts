import { Action, ActionCreator } from 'redux'
import { SettingsState } from '../reducers/settingsReducer'

export const SET_SETTINGS = 'SET_SETTINGS'

export interface SetSettings extends Action {
  type: 'SET_SETTINGS'
  payload: SettingsState
}

export const setSettings: ActionCreator<SetSettings> = (payload: SettingsState) => ({
  payload,
  type: SET_SETTINGS,
})

export type SettingsAction = SetSettings
