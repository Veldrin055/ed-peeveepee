import * as React from 'react'
import { ipcRenderer } from 'electron'

interface UpdateState {
  updateReady: boolean
  updateDownloaded: boolean
}

export default () => {
  const [updateState, setUpdateState] = React.useState<UpdateState>({ updateReady: false, updateDownloaded: false })

  ipcRenderer.on('update-ready', () => setUpdateState({ ...updateState, updateReady: true }))
  ipcRenderer.on('update-downloaded', () => setUpdateState({ ...updateState, updateDownloaded: true }))

  return <div>todo</div>
}
