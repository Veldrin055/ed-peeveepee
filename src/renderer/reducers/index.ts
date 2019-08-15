import {combineReducers} from 'redux'

import {counterReducer, CounterState} from './counterReducer'
import {cmdrStateReducer} from "./cmdrStateReducer"
import {CmdrState} from "../../common/types"

export interface RootState {
  counter: CounterState
  cmdr: CmdrState
}

export const rootReducer = combineReducers<RootState | undefined>({
  counter: counterReducer,
  cmdr: cmdrStateReducer,
})
