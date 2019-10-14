import { BeaconMessage } from '../../common/types'
import { Reducer } from 'redux'
import { BEACON_ADD, BEACON_REMOVE, BEACON_TOGGLE, BeaconAction } from '../actions/beaconActions'

export interface BeaconState {
  beacons: BeaconMessage[]
  enabled: boolean
}

const defaultState: BeaconState = {
  beacons: [],
  enabled: false,
}

export const beaconReducer: Reducer<BeaconState, BeaconAction> = (state = defaultState, action: BeaconAction) => {
  switch (action.type) {
    case BEACON_TOGGLE:
      return {
        ...state,
        enabled: action.payload,
      }
    case BEACON_ADD:
      return {
        ...state,
        beacons: [...action.payload, ...state.beacons.filter(e => action.payload.find(i => i.cmdr !== e.cmdr))],
      }
    case BEACON_REMOVE:
      return {
        ...state,
        beacons: [...state.beacons.filter(e => e.cmdr !== action.payload)],
      }
    default:
      return state
  }
}
