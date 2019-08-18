import { Reducer } from 'redux'
import { IFFRecord } from '../../main/iffStore'
import { ADD, DELETE, IFF_SNAPSHOT, IffAction } from '../actions/iffActions'

export interface IffState {
  readonly iff: IFFRecord[]
}

const defaultState: IffState = {
  iff: [],
}

export const iffReducer: Reducer<IffState, IffAction> = (state = defaultState, action: IffAction) => {
  switch (action.type) {
    case IFF_SNAPSHOT:
      return {
        ...state,
        iff: [...action.payload],
      }
    case ADD:
      return {
        ...state,
        iff: [...state.iff.filter(e => e.name.toLowerCase() !== action.payload.name.toLowerCase()), action.payload],
      }
    case DELETE:
      return {
        ...state,
        iff: [...state.iff.filter(e => e.name.toLowerCase() !== action.name.toLowerCase())],
      }
    default:
      return state
  }
}
