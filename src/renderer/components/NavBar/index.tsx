import * as React from 'react'
import { remote } from 'electron'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import CloseIcon from '@material-ui/icons/Close'
import MinimizeIcon from '@material-ui/icons/Minimize'
import MaximizeIcon from '@material-ui/icons/CropSquare'
import { Tab, Tabs } from '@material-ui/core'

export interface NavBarProps {
  value: number
  handleChange: (event: React.ChangeEvent<{}>, newValue: number) => void
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      '-webkit-app-region': 'drag',
    },
    menuButton: {
      marginRight: theme.spacing(2),
      '-webkit-app-region': 'no-drag',
    },
    tab: {
      '-webkit-app-region': 'no-drag',
    },
    title: {
      fontFamily: 'Share Tech Mono',
    },
    sectionDesktop: {
      '-webkit-app-region': 'no-drag',
      display: 'flex',
    },
    controlButtons: {
      '-webkit-app-region': 'no-drag',
      marginRight: theme.spacing(3),
    },
    controlButton: {
      '-webkit-app-region': 'no-drag',
      padding: theme.spacing(3),
    },
  })
)

const close = () => {
  const window = remote.BrowserWindow.getFocusedWindow()
  if (window) {
    window.close()
  }
}

const minimize = () => {
  const window = remote.BrowserWindow.getFocusedWindow()
  if (window) {
    window.minimize()
  }
}

const maximize = () => {
  const window = remote.BrowserWindow.getFocusedWindow()
  if (window) {
    window.maximize()
  }
}

export default ({ value, handleChange }: NavBarProps) => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="Open drawer">
            <MenuIcon />
          </IconButton>
          <Typography className={classes.title} variant="h6" noWrap>
            ED: PvP
          </Typography>
          <Tabs value={value} onChange={handleChange} className={classes.tab}>
            <Tab label="Stats" />
            <Tab label="IFF" />
            <Tab label="Beacon" />
            <Tab label="Games" />
          </Tabs>
          <div className={classes.root} />
          <div className={classes.controlButtons}>
            <IconButton className={classes.controlButton} color="inherit" onClick={minimize}>
              <MinimizeIcon />
            </IconButton>
            <IconButton className={classes.controlButton} color="inherit" onClick={maximize}>
              <MaximizeIcon />
            </IconButton>
            <IconButton
              className={classes.controlButton}
              edge="end"
              aria-label="Close"
              aria-haspopup="true"
              onClick={close}
              color="inherit"
            >
              <CloseIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  )
}
