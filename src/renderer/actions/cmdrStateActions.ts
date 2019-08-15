import {Action, ActionCreator} from 'redux'
import {CombatRank, DeathEventMsg, KillEvent, Location} from '../../common/types'

export const KILL = 'KILL'
export const DEATH = 'DEATH'
export const LOCATION_CHANGE = 'LOCATION_CHANGE'
export const LOAD_GAME = 'LOAD_GAME'
export const RANK = 'RANK'

export interface KillAction extends Action {
  type: 'KILL'
  payload: KillEvent
}

export interface DeathAction extends Action {
  type: 'DEATH'
  payload: DeathEventMsg
}

export interface LocationChangeAction extends Action {
  type: 'LOCATION_CHANGE'
  payload: Location
}

export interface LoadGameAction extends Action {
  type: 'LOAD_GAME'
  payload: string
}

export interface RankAction extends Action {
  type: 'RANK'
  payload: CombatRank
}

export const kill: ActionCreator<KillAction> = (payload: KillEvent) => ({
  type: KILL,
  payload,
})

export const death: ActionCreator<DeathAction> = (payload: DeathEventMsg) => ({
  type: DEATH,
  payload,
})

export const locationChange: ActionCreator<LocationChangeAction> = (payload: Location) => ({
  type: LOCATION_CHANGE,
  payload,
})

export const loadGame: ActionCreator<LoadGameAction> = (payload: string) => ({
  type: LOAD_GAME,
  payload,
})

export const rank: ActionCreator<RankAction> = (payload: CombatRank) => ({
  type: RANK,
  payload,
})


export type CmdrStateAction = KillAction | DeathAction | LocationChangeAction | LoadGameAction | RankAction
