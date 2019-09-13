import { BeaconMessage } from '../../common/types'
import { Reducer } from 'redux'
import { BEACON_ADD, BEACON_REMOVE, BeaconAction } from '../actions/beaconActions'

const defaultState: BeaconMessage[] = []

export const beaconReducer: Reducer<BeaconMessage[], BeaconAction> = (state = defaultState, action: BeaconAction) => {
  switch (action.type) {
    case BEACON_ADD:
      return [...action.payload, ...state.filter(e => action.payload.find(i => i.cmdr !== e.cmdr))]
    case BEACON_REMOVE:
      return [...state.filter(e => e.cmdr !== action.payload)]
    default:
      return state
  }
}
