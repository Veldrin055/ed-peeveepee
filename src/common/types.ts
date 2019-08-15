export enum CombatRank {
  Harmless = 'Harmless',
  MostlyHarmless = 'Mostly Harmless',
  Novice = 'Novice',
  Competent = 'Competent',
  Expert = 'Expert',
  Master = 'Master',
  Dangerous = 'Dangerous',
  Deadly = 'Deadly',
  Elite = 'Elite',
}

export const CombatRanks: CombatRank[] = [
  CombatRank.Harmless,
  CombatRank.MostlyHarmless,
  CombatRank.Novice,
  CombatRank.Competent,
  CombatRank.Expert,
  CombatRank.Master,
  CombatRank.Dangerous,
  CombatRank.Deadly,
  CombatRank.Elite,
]

export interface CmdrState {
  totalKills: number
  totalDeaths: number
  eventLog: PvPEvent[]
  name: string
  location: Location
  rank: CombatRank
}

export interface Coordinates {
  x: number
  y: number
  z: number
}

export interface Location {
  starSystem: string
  body: string,
  position: Coordinates
}

export interface LoadGameEvent {
  name: string
}

export interface RankEvent {
  combatRank: CombatRank
}

export enum PvpEventType {
  Kill,
  Death,
}

export interface PvPEvent {
  event: PvpEventType
  name: string
  timestamp: Date
  combatRank: CombatRank
  location: Location
}

export interface KillEvent extends PvPEvent {
  event: PvpEventType.Kill,
}

export interface DeathEvent extends PvPEvent {
  event: PvpEventType.Death,
}

export interface DeathEventMsg {
  event: PvpEventType.Death
  timestamp: Date
  location: Location
  killers: Killer[]
}

export interface Killer {
  readonly name: string
  readonly combatRank: CombatRank
}
