import * as React from 'react';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {CmdrState} from "../../../common/types"
import {Typography} from "@material-ui/core"

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
    },
    table: {
      minWidth: 650
    },
    tableHead: {
      padding: theme.spacing(1)
    }
  })
);

const kdr = ({totalKills, totalDeaths}: CmdrState) => {
  if (totalDeaths == 0) {
    return 'Undefeated'
  }
  return Math.round(totalKills / totalDeaths).toFixed(2);
}

const Cmdr: React.FunctionComponent<Props> = ({ cmdr }) => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Grid container={true} component="div">
        <Paper className={classes.paper}>
          <Typography variant="body1">CMDR {cmdr.name}</Typography>
          <Typography variant="body1">Rank {cmdr.rank.toString()}</Typography>
          <Typography variant="body1">Location {cmdr.location.starSystem} / {cmdr.location.body}</Typography>
          <Typography variant="body1">KDR {kdr(cmdr)}</Typography>
          <Typography variant="body1">Total Kills {cmdr.totalKills}</Typography>
          <Typography variant="body1">Total Deaths {cmdr.totalDeaths}</Typography>
        </Paper>
        <Paper className={classes.paper}>
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                {[
                  'Event',
                  'CMDR',
                  'Rank',
                  'Date',
                  'System',
                ].map(header => (
                  <TableCell key={header} className={classes.tableHead}>
                    {header}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {cmdr.eventLog.map(event => (
                <TableRow key={event.timestamp.getTime()}>
                  <TableCell>{event.event.toString()}</TableCell>
                  <TableCell>{event.name}</TableCell>
                  <TableCell>{event.combatRank.toString()}</TableCell>
                  <TableCell>{event.timestamp}</TableCell>
                  <TableCell>{event.location.starSystem}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      </Grid>
    </div>
  );
};

export default Cmdr;
