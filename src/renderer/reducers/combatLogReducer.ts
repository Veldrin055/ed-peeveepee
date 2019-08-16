import { Reducer } from 'redux';

import { PvPEvent, PvpEventType } from '../../common/types';
import { CmdrStateAction, DEATH, KILL } from '../actions/cmdrStateActions';

export interface CombatLogState {
  readonly eventLog: PvPEvent[];
}

const defaultState: CombatLogState = {
  eventLog: []
};

export const combatLogReducer: Reducer<CombatLogState, CmdrStateAction> = (
  state = defaultState,
  action: CmdrStateAction
) => {
  switch (action.type) {
    case KILL:
      return {
        ...state,
        eventLog: [action.payload, ...state.eventLog]
      };
    case DEATH:
      const { location, timestamp } = action.payload;
      return {
        ...state,
        eventLog: [
          ...action.payload.killers.map(({ name, combatRank }) => ({
            name,
            combatRank,
            location,
            timestamp,
            event: PvpEventType.Death
          })),
          ...state.eventLog
        ]
      };
    default:
      return state;
  }
};
