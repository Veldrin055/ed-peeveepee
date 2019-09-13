import { combineReducers } from 'redux'

import { combatLogReducer, CombatLogState } from './combatLogReducer'
import { cmdrStateReducer } from './cmdrStateReducer'
import { BeaconMessage, CmdrState } from '../../common/types'
import { iffReducer, IffState } from './iffReducer'
import { settingsReducer, SettingsState } from './settingsReducer'
import { beaconReducer } from './beaconReducer'

export interface RootState {
  combatLog: CombatLogState
  cmdr: CmdrState
  iff: IffState
  settings: SettingsState
  beacons: BeaconMessage[]
}

export const rootReducer = combineReducers<RootState | undefined>({
  combatLog: combatLogReducer,
  cmdr: cmdrStateReducer,
  iff: iffReducer,
  settings: settingsReducer,
  beacons: beaconReducer,
})
