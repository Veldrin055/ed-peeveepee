import { ipcRenderer } from 'electron'
import { death, kill, loadGame, locationChange, rank } from '../actions/cmdrStateActions'
import { Store } from 'redux'
import { DeathEventMsg, KillEvent, LoadGameEvent, RankEvent } from '../../common/types'
import { IFFRecord } from '../../main/iff/iffStore'
import { iffSnapshot } from '../actions/iffActions'
import { setSettings } from '../actions/settingsActions'
import { SettingsState } from '../reducers/settingsReducer'

export default ({ dispatch }: Store) => {
  ipcRenderer.on('loadGame', (event: any, { name }: LoadGameEvent) => dispatch(loadGame(name)))

  ipcRenderer.on('rank', (event: any, { combatRank }: RankEvent) => dispatch(rank(combatRank)))

  ipcRenderer.on('location', (event: any, msg: Location) => dispatch(locationChange(msg)))

  ipcRenderer.on('kill', (event: any, msg: KillEvent) => dispatch(kill(msg)))

  ipcRenderer.on('death', (event: any, msg: DeathEventMsg) => dispatch(death(msg)))

  ipcRenderer.on('iffSnapshot', (event: any, msg: IFFRecord[]) => dispatch(iffSnapshot(msg)))

  ipcRenderer.on('settingsSnapshot', (event: any, msg: SettingsState) => dispatch(setSettings(msg)))
}
