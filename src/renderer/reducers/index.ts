import { combineReducers } from 'redux';

import { combatLogReducer, CombatLogState } from './combatLogReducer';
import { cmdrStateReducer } from './cmdrStateReducer';
import { CmdrState } from '../../common/types';

export interface RootState {
  combatLog: CombatLogState;
  cmdr: CmdrState;
}

export const rootReducer = combineReducers<RootState | undefined>({
  combatLog: combatLogReducer,
  cmdr: cmdrStateReducer
});
