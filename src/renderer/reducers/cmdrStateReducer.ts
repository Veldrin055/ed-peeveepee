import {Reducer} from 'redux';
import {CmdrState, CombatRank, PvpEventType} from "../../common/types"

import {CmdrStateAction, DEATH, KILL, LOAD_GAME, LOCATION_CHANGE, RANK} from '../actions/cmdrStateActions';

const defaultState: CmdrState = {
  name: 'The Unknown CMDR',
  rank: CombatRank.Harmless,
  totalKills: 0,
  totalDeaths: 0,
  eventLog: [],
  location: {
    body: 'Unknown',
    starSystem: 'Unknown',
    position: {
      x: 0,
      y: 0,
      z: 0,
    },
  }
};

export const cmdrStateReducer: Reducer<CmdrState, CmdrStateAction> = (
  state = defaultState,
  action: CmdrStateAction
) => {
  switch (action.type) {
    case LOAD_GAME:
      return Object.assign({}, state, {
        name: action.payload
      })
    case KILL:
      return Object.assign({}, state, {
        totalKills: state.totalKills + 1,
        eventLog: [
          ...state.eventLog,
          action.payload,
        ]
      })
    case DEATH:
      const { location, timestamp } = action.payload
      return Object.assign({}, state, {
        totalDeaths: state.totalDeaths + 1,
        eventLog: [
          ...state.eventLog,
          ...action.payload.killers.map(({ name, combatRank }) => ({
            name,
            combatRank,
            event: PvpEventType.Death,
            location,
            timestamp,
          })),
        ]
      })
    case LOCATION_CHANGE:
      return Object.assign({}, state, {
        location: action.payload,
      })
    case RANK:
      return Object.assign({}, state, {
        rank: action.payload
      })
    default:
      return state;
  }
};
