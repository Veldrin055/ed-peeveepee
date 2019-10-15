import * as React from 'react'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import { CmdrState } from '../../../common/types'
import { Typography, Chip } from '@material-ui/core'
import CombatLog from '../../containers/CombatLogContainer'
import { locationDisplay } from '../../util'

export interface Props {
  cmdr: CmdrState
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      height: '100%',
      maxHeight: '100%',
    },
    container: {
      height: '100%',
      padding: theme.spacing(3),
      maxHeight: '100%',
      width: '100%',
      alignItems: 'center',
    },
    paper: {
      marginTop: theme.spacing(16),
      padding: theme.spacing(4),
    },
    typography: {
      marginLeft: theme.spacing(6),
      color: 'white',
      float: 'left',
      fontFamily: 'Share Tech Mono',
    },
    panel: {
      width: '100%',
      // padding: '1rem',
      position: 'relative',
      background: 'linear-gradient(to right, purple, orange)',
      padding: 3,
      borderRadius: 6,
    },
    spacer: {
      height: 40,
      width: '100%',
    },
  })
)

const kdr = ({ totalKills, totalDeaths }: CmdrState) => {
  if (totalDeaths === 0) {
    return 'Undefeated'
  }
  return Math.round(totalKills / totalDeaths).toFixed(2)
}

const Cmdr: React.FunctionComponent<Props> = ({ cmdr }) => {
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <Grid container={true} component="div" className={classes.container} direction="column">
        <Grid className={classes.panel}>
          <Typography variant="h6" className={classes.typography}>
            CMDR
          </Typography>
          <Paper className={classes.paper}>
            <Grid container={true}>
              <Grid item xs={4}>
                <Typography variant="body1">CMDR {cmdr.name}</Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography variant="body1">{cmdr.rank}</Typography>
              </Grid>
              <Grid item xs={4}>
                <Chip
                  label={cmdr.gameMode}
                  variant="outlined"
                  color={cmdr.gameMode === 'Open' ? 'primary' : 'secondary'}
                />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="body1">{locationDisplay(cmdr.location)}</Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography variant="body1">KDR {kdr(cmdr)}</Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography variant="body1">Total Kills {cmdr.totalKills}</Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography variant="body1">Total Deaths {cmdr.totalDeaths}</Typography>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
        <Grid className={classes.spacer} component="div" />
        <Grid className={classes.panel} component="div">
          <Typography variant="h6" className={classes.typography}>
            Combat Log
          </Typography>
          <CombatLog />
        </Grid>
      </Grid>
    </div>
  )
}

export default Cmdr
