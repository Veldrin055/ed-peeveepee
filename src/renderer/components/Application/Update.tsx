import * as React from 'react'
import { ipcRenderer } from 'electron'
import Snackbar, { SnackbarOrigin } from '@material-ui/core/Snackbar'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'

interface UpdateState {
  updateReady: boolean
  updateDownloaded: boolean
}

const anchorOrigin: SnackbarOrigin = { vertical: 'top', horizontal: 'left' }

export default () => {
  const [updateState, setUpdateState] = React.useState<UpdateState>({ updateReady: false, updateDownloaded: false })

  ipcRenderer.on('update-ready', () => setUpdateState({ ...updateState, updateReady: true }))
  ipcRenderer.on('update-downloaded', () => setUpdateState({ updateReady: false, updateDownloaded: true }))

  const clearUpdateReady = () => setUpdateState({ ...updateState, updateReady: false })

  const clearUpdateDownloaded = () => setUpdateState({ ...updateState, updateDownloaded: false })

  const updateAndRestart = () => ipcRenderer.send('restart-app')

  return (
    <div>
      <Snackbar
        anchorOrigin={anchorOrigin}
        open={updateState.updateReady}
        autoHideDuration={5000}
        onClose={clearUpdateReady}
        message="Update downloading..."
        action={
          <IconButton onClick={clearUpdateReady}>
            <CloseIcon />
          </IconButton>
        }
      />
      <Snackbar
        anchorOrigin={anchorOrigin}
        open={updateState.updateReady}
        autoHideDuration={null}
        onClose={clearUpdateDownloaded}
        message="Update ready!"
        action={[
          <Button key="restart" onClick={updateAndRestart} color="secondary">
            Update & Restart
          </Button>,
          <IconButton key="close" onClick={clearUpdateDownloaded}>
            <CloseIcon />
          </IconButton>,
        ]}
      />
    </div>
  )
}
