import * as React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { PvPEvent } from '../../../common/types';
import { Typography } from '@material-ui/core';
import { HeadToHeadValues } from '../HeadToHead';

export interface Props {
  combatLog: PvPEvent[];
  openDialog?: (headToHead: HeadToHeadValues) => void;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      width: '100%',
      marginTop: theme.spacing(3),
      overflowX: 'hidden',
      height: '100%',
      maxHeight: 480,
      // overflowY: 'auto',
      margin: 12,
      flexGrow: 1
    },
    table: {
      minWidth: 650,
      maxHeight: '100%'
      // overflowY: 'auto'
    },
    tableHead: {
      padding: theme.spacing(2),
      paddingLeft: theme.spacing(3)
    },
    tableBody: {
      overflowY: 'auto'
    }
  })
);

const CombatLog: React.FunctionComponent<Props> = ({ combatLog, openDialog }) => {
  const classes = useStyles();
  return (
    <Paper className={classes.paper}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            {['Event', 'CMDR', 'Rank', 'Date', 'System'].map(header => (
              <TableCell key={header} className={classes.tableHead}>
                {header}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody className={classes.tableBody}>
          {combatLog.map(event => (
            <TableRow key={event.timestamp.toString()}>
              <TableCell>{event.event}</TableCell>
              <TableCell
                onClick={() =>
                  openDialog && openDialog({ name: event.name, events: combatLog.filter(ev => ev.name === event.name) })
                }
              >
                {event.name}
              </TableCell>
              <TableCell>{event.combatRank}</TableCell>
              <TableCell>{event.timestamp}</TableCell>
              <TableCell>{event.location.starSystem}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
};

export default CombatLog;
