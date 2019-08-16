import * as React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { CmdrState } from '../../../common/types';
import { Typography } from '@material-ui/core';
import CombatLog from '../../containers/CombatLogContainer';

export interface Props {
  cmdr: CmdrState;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      height: '100%',
      maxHeight: '100%'
    },
    container: {
      height: '100%',
      padding: theme.spacing(3),
      maxHeight: '100%'
    },
    paper: {
      width: '100%',
      marginTop: theme.spacing(3),
      padding: theme.spacing(4),
      overflowX: 'initial',
      margin: 12
    },
    typography: {
      marginTop: theme.spacing(6),
      marginLeft: theme.spacing(6),
      color: 'white'
    }
  })
);

const kdr = ({ totalKills, totalDeaths }: CmdrState) => {
  if (totalDeaths === 0) {
    return 'Undefeated';
  }
  return Math.round(totalKills / totalDeaths).toFixed(2);
};

const Cmdr: React.FunctionComponent<Props> = ({ cmdr }) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Grid container={true} component="div" className={classes.container}>
        <Paper className={classes.paper}>
          <Typography variant="body1">CMDR {cmdr.name}</Typography>
          <Typography variant="body1">Rank {cmdr.rank}</Typography>
          <Typography variant="body1">
            Location {cmdr.location.starSystem} / {cmdr.location.body}
          </Typography>
          <Typography variant="body1">KDR {kdr(cmdr)}</Typography>
          <Typography variant="body1">Total Kills {cmdr.totalKills}</Typography>
          <Typography variant="body1">Total Deaths {cmdr.totalDeaths}</Typography>
        </Paper>

        <Typography variant="h6" className={classes.typography}>
          Combat Log
        </Typography>
        <CombatLog />
      </Grid>
    </div>
  );
};

export default Cmdr;
