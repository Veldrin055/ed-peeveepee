import { Action, ActionCreator } from 'redux'
import { BeaconMessage } from '../../common/types'

export const BEACON_ADD = 'BEACON_ADD'
export const BEACON_REMOVE = 'BEACON_REMOVE'

export interface BeaconAddAction extends Action {
  type: 'BEACON_ADD'
  payload: BeaconMessage[]
}

export interface BeaconRemoveAction extends Action {
  type: 'BEACON_REMOVE'
  payload: string
}

export const beaconAdd: ActionCreator<BeaconAddAction> = (payload: BeaconMessage[]) => ({
  payload,
  type: BEACON_ADD,
})

export const beaconRemove: ActionCreator<BeaconRemoveAction> = (payload: string) => ({
  payload,
  type: BEACON_REMOVE,
})

export type BeaconAction = BeaconAddAction | BeaconRemoveAction
