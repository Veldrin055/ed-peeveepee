import { Action, ActionCreator } from 'redux'
import { CombatRank, DeathEventMsg, KillEvent, Location } from '../../common/types'

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
  payload,
  type: KILL,
})

export const death: ActionCreator<DeathAction> = (payload: DeathEventMsg) => ({
  payload,
  type: DEATH,
})

export const locationChange: ActionCreator<LocationChangeAction> = (payload: Location) => ({
  payload,
  type: LOCATION_CHANGE,
})

export const loadGame: ActionCreator<LoadGameAction> = (payload: string) => ({
  payload,
  type: LOAD_GAME,
})

export const rank: ActionCreator<RankAction> = (payload: CombatRank) => ({
  payload,
  type: RANK,
})

export type CmdrStateAction = KillAction | DeathAction | LocationChangeAction | LoadGameAction | RankAction
