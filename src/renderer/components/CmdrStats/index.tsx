import * as React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
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
      flexGrow: 1
    },
    paper: {
      width: '100%',
      marginTop: theme.spacing(3),
      overflowX: 'initial',
      margin: 12
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
      <Grid container={true} component="div">
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
        <CombatLog />
      </Grid>
    </div>
  );
};

export default Cmdr;
