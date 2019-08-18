import { Action, ActionCreator } from 'redux'
import { IFFRecord } from '../../main/iffStore'

export const IFF_SNAPSHOT = 'IFF_SNAPSHOT'
export const ADD = 'ADD'
export const DELETE = 'DELETE'

export interface IffSnapshotAction extends Action {
  type: 'IFF_SNAPSHOT'
  payload: IFFRecord[]
}

export interface IffAddAction extends Action {
  type: 'ADD'
  payload: IFFRecord
}

export interface IffDeleteAction extends Action {
  type: 'DELETE'
  name: string
}

export const iffSnapshot: ActionCreator<IffSnapshotAction> = (payload: IFFRecord[]) => ({
  payload,
  type: IFF_SNAPSHOT,
})

export const iffAdd: ActionCreator<IffAddAction> = (payload: IFFRecord) => ({
  payload,
  type: ADD,
})

export const iffDelete: ActionCreator<IffDeleteAction> = (name: string) => ({
  name,
  type: DELETE,
})

export type IffAction = IffSnapshotAction | IffAddAction | IffDeleteAction
