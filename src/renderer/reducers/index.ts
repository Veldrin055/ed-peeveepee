import { combineReducers } from 'redux'

import { combatLogReducer, CombatLogState } from './combatLogReducer'
import { cmdrStateReducer } from './cmdrStateReducer'
import { CmdrState } from '../../common/types'
import { iffReducer, IffState } from './iffReducer'
import { settingsReducer, SettingsState } from './settingsReducer'
import { beaconReducer, BeaconState } from './beaconReducer'

export interface RootState {
  combatLog: CombatLogState
  cmdr: CmdrState
  iff: IffState
  settings: SettingsState
  beacon: BeaconState
}

export const rootReducer = combineReducers<RootState | undefined>({
  combatLog: combatLogReducer,
  cmdr: cmdrStateReducer,
  iff: iffReducer,
  settings: settingsReducer,
  beacon: beaconReducer,
})
