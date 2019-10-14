import { Journal } from 'edjr'
import { BrowserWindow } from 'electron'
import { CombatRank, CombatRanks, Killer, KillEvent, Location, PvpEventType } from '../common/types'

interface JournalEvent {
  readonly timestamp: Date
  readonly event: string
}

interface LocationEvent extends JournalEvent {
  readonly StarSystem: string
  readonly Body: string
  readonly StarPos: number[]
}

interface PvPKillEvent extends JournalEvent {
  readonly Victim: string
  readonly CombatRank: number
}

interface DiedEvent extends JournalEvent {
  readonly KillerName?: string
  readonly KillerRank: CombatRank
  readonly Killers?: WingKiller[]
}

interface WingKiller {
  readonly Name: string
  readonly Rank: number
}

let currentLocation: Location

export default ({ webContents }: BrowserWindow) => {
  const journal = new Journal()

  const locationUpdate = (starSystemEvent: LocationEvent, historical: boolean) => {
    const location: Location = {
      starSystem: starSystemEvent.StarSystem,
      body: starSystemEvent.Body,
      position: {
        x: starSystemEvent.StarPos[0],
        y: starSystemEvent.StarPos[1],
        z: starSystemEvent.StarPos[2],
      },
    }
    currentLocation = location
    if (!historical) {
      webContents.send('location', location)
    }
  }

  // location update
  journal.on('Location', (e: LocationEvent, historical) => locationUpdate(e, historical))
  journal.on('FSDJump', (e: LocationEvent, historical) => locationUpdate(e, historical))
  journal.on('SupercruiseExit', ({ StarSystem, Body, timestamp, event }: LocationEvent, historical) => {
    const StarPos = [currentLocation.position.x, currentLocation.position.y, currentLocation.position.z]
    locationUpdate({ event, StarSystem, Body, StarPos, timestamp }, historical)
  })

  // load game
  journal.on('LoadGame', ({ Commander, GameMode }) =>
    webContents.send('loadGame', { name: Commander, gameMode: GameMode })
  )
  journal.on('NewCommander', ({ Name }) => webContents.send('loadGame', { name: Name }))

  // ranks
  journal.on('Rank', ({ Combat }) => webContents.send('rank', { combatRank: CombatRanks[Combat] }))
  journal.on('Promotion', ({ Combat }) => webContents.send('rank', { combatRank: CombatRanks[Combat] }))

  // pvp kill
  journal.on('PVPKill', (e: PvPKillEvent, historical) => {
    const msg: KillEvent = {
      ...e,
      historical,
      event: PvpEventType.Kill,
      location: currentLocation,
      name: e.Victim,
      combatRank: CombatRanks[e.CombatRank],
    }
    webContents.send('kill', msg)
  })

  // pvp death
  journal.on('Died', (e: DiedEvent, historical) => {
    let killers: Killer[] = []
    if (e.KillerName && e.KillerName.startsWith('Cmdr')) {
      killers = [
        {
          name: e.KillerName.slice(5),
          combatRank: e.KillerRank,
        },
      ]
    } else if (e.Killers) {
      killers = e.Killers.map(killer => ({
        name: killer.Name,
        combatRank: CombatRanks[killer.Rank],
      }))
    }
    if (killers.length) {
      webContents.send('death', {
        killers,
        historical,
        event: PvpEventType.Death,
        location: currentLocation,
        timestamp: e.timestamp,
      })
    }
  })

  // Scan journal once UI is ready
  webContents.on('dom-ready', () =>
    journal.scan({ fromBeginning: true }, () => webContents.send('location', currentLocation))
  )

  return journal
}
