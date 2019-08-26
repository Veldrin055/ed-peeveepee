import * as React from 'react'
import { WithStyles } from '@material-ui/styles'
import { SettingsState } from '../../reducers/settingsReducer'
import { createStyles, Theme, withStyles } from '@material-ui/core'
import MuiDialogTitle from '@material-ui/core/DialogTitle/DialogTitle'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import MuiDialogContent from '@material-ui/core/DialogContent/DialogContent'
import Grid from '@material-ui/core/Grid'
import DialogActions from '@material-ui/core/DialogActions'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import Slider from '@material-ui/core/Slider'
import { VolumeDown, VolumeUp, Close } from '@material-ui/icons'

export interface SettingsDialogProps extends WithStyles<typeof styles> {
  open: boolean
  settings: SettingsState
  setSettings: (settings: SettingsState) => void
  handleClose: () => void
}

interface SettingsDialogTitleProps extends WithStyles<typeof styles> {
  children: React.ReactNode
  onClose: () => void
}

const styles = (theme: Theme) =>
  createStyles({
    root: {
      margin: 0,
      padding: theme.spacing(3),
    },
    closeButton: {
      position: 'absolute',
      right: theme.spacing(1),
      top: theme.spacing(1),
      color: theme.palette.grey[500],
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
      marginRight: theme.spacing(3),
    },
    textField: {
      marginTop: 5,
    },
  })

const DialogTitle = withStyles(styles)((props: SettingsDialogTitleProps) => {
  const { children, onClose, classes } = props
  return (
    <MuiDialogTitle disableTypography className={classes.root}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="Close" className={classes.closeButton} onClick={onClose}>
          <Close />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  )
})

const DialogContent = withStyles(theme => ({
  root: {
    padding: theme.spacing(3),
  },
}))(MuiDialogContent)

const SettingsDialog = withStyles(styles)(
  ({ open, settings, setSettings, handleClose, classes }: SettingsDialogProps) => {
    const defaultState: SettingsState = {
      volume: 50,
    }
    const [settingsState, setSettingsState] = React.useState<SettingsState>(defaultState)

    React.useEffect(() => setSettingsState(settings), [settings])

    const handleChange = (event: any, newValue: number | number[]) => {
      setSettingsState({ volume: newValue as number })
    }

    const handleSave = () => {
      setSettings({ ...settingsState })
      handleClose()
    }

    return (
      <Dialog onClose={handleClose} open={open} maxWidth="md">
        <DialogTitle onClose={handleClose}>Settings</DialogTitle>
        <DialogContent dividers>
          <form className={classes.root} autoComplete="off">
            <Grid container spacing={4}>
              <Grid item>
                <VolumeDown />
              </Grid>
              <Grid item xs>
                <Slider value={settingsState.volume} onChange={handleChange} aria-labelledby="continuous-slider" />
              </Grid>
              <Grid item>
                <VolumeUp />
              </Grid>
            </Grid>
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary" variant="contained">
            Cancel
          </Button>
          <Button onClick={handleSave} color="primary" variant="contained">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    )
  }
)

export default SettingsDialog
