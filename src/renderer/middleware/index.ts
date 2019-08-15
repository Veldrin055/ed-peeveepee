import {ipcRenderer} from 'electron'
import {death, kill, loadGame, locationChange, rank} from "../actions/cmdrStateActions"
import {Store} from "redux"
import {DeathEventMsg, KillEvent, LoadGameEvent, RankEvent} from "../../common/types"

export default (store: Store) => {

  ipcRenderer.on('loadGame', (event: any, { name }: LoadGameEvent) => store.dispatch(loadGame(name)))

  ipcRenderer.on('rank', (event: any, { combatRank }: RankEvent) => store.dispatch(rank(combatRank)))

  ipcRenderer.on('location', (event: any, msg: Location) => store.dispatch(locationChange(msg)))

  ipcRenderer.on('kill', (event: any, msg: KillEvent) => store.dispatch(kill(msg)))

  ipcRenderer.on('death', (event: any, msg: DeathEventMsg) => store.dispatch(death(msg)))

}