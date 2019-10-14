import { Action, ActionCreator } from 'redux'
import { BeaconMessage } from '../../common/types'

export const BEACON_ADD = 'BEACON_ADD'
export const BEACON_REMOVE = 'BEACON_REMOVE'
export const BEACON_TOGGLE = 'BEACON_TOGGLE'

// When a beacon location message is received from the server
export interface BeaconAddAction extends Action {
  type: 'BEACON_ADD'
  payload: BeaconMessage[]
}

// When a CMDR unsubscribe message is received from the server
export interface BeaconRemoveAction extends Action {
  type: 'BEACON_REMOVE'
  payload: string
}

// When this CMDR turns on/off their beacon
export interface BeaconToggleAction extends Action {
  type: 'BEACON_TOGGLE'
  payload: boolean
}

export const beaconAdd: ActionCreator<BeaconAddAction> = (payload: BeaconMessage[]) => ({
  payload,
  type: BEACON_ADD,
})

export const beaconRemove: ActionCreator<BeaconRemoveAction> = (payload: string) => ({
  payload,
  type: BEACON_REMOVE,
})

export const beaconToggle: ActionCreator<BeaconToggleAction> = (payload: boolean) => ({
  payload,
  type: BEACON_TOGGLE,
})

export type BeaconAction = BeaconAddAction | BeaconRemoveAction | BeaconToggleAction
