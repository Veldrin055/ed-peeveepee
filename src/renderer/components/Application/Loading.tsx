import * as React from 'react'
import { Typography, CircularProgress, Grid } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles({
  root: {
    height: '100vh',
    width: '100vw',
  },
  text: {
    color: 'white',
  },
})

const RandomLoadingMessage = () => {
  const classes = useStyles()
  const loadingMessages = [
    'Pre-spooling Mobius drive...',
    'Downloading the latest meta...',
    'Cracking industrial firmware...',
    'Salting synthesized ammo...',
    'Witnessing you...',
    'Preparing inevitable shit-post...',
    'Calibrating full dakka...',
    'Targeting docking computer...',
  ]

  return (
    <Typography className={classes.text} variant="h6">
      {loadingMessages[Math.floor(Math.random() * loadingMessages.length)]}
    </Typography>
  )
}

export default () => {
  const classes = useStyles()
  return (
    <Grid container className={classes.root} direction="column" justify="center" alignItems="center">
      <CircularProgress />
      <RandomLoadingMessage />
    </Grid>
  )
}
