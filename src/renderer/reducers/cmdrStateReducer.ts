import { Reducer } from 'redux'
import { CmdrState, CombatRank } from '../../common/types'

import { CmdrStateAction, DEATH, KILL, LOAD_GAME, LOCATION_CHANGE, RANK } from '../actions/cmdrStateActions'

const defaultState: CmdrState = {
  name: 'The Unknown CMDR',
  rank: CombatRank.Harmless,
  gameMode: '',
  totalKills: 0,
  totalDeaths: 0,
  location: {
    body: 'Unknown',
    starSystem: 'Unknown',
    position: {
      x: 0,
      y: 0,
      z: 0,
    },
  },
}

export const cmdrStateReducer: Reducer<CmdrState, CmdrStateAction> = (
  state = defaultState,
  action: CmdrStateAction
) => {
  switch (action.type) {
    case LOAD_GAME:
      return {
        ...state,
        ...action.payload,
      }
    case KILL:
      return {
        ...state,
        totalKills: state.totalKills + 1,
      }
    case DEATH:
      return {
        ...state,
        totalDeaths: state.totalDeaths + 1,
      }
    case LOCATION_CHANGE:
      return {
        ...state,
        location: action.payload,
      }
    case RANK:
      return {
        ...state,
        rank: action.payload,
      }
    default:
      return state
  }
}
