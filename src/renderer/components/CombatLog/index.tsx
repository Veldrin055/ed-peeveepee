import * as React from 'react'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import { PvPEvent } from '../../../common/types'
import { HeadToHeadValues } from '../HeadToHead'
import { Typography } from '@material-ui/core'

export interface Props {
  combatLog: PvPEvent[]
  openDialog?: (headToHead: HeadToHeadValues) => void
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    '@global': {
      '*::-webkit-scrollbar': {
        width: '0.8em',
      },
      '*::-webkit-scrollbar-track': {
        '-webkit-box-shadow': 'inset 0 0 6px rgba(0,0,0,0.00)',
      },
      '*::-webkit-scrollbar-thumb': {
        backgroundColor: 'rgba(0,0,0,.3)',
        outline: '1px solid slategrey',
        borderRadius: 6,
      },
    },
    paper: {
      width: '100%',
      marginTop: theme.spacing(3),
      overflowX: 'hidden',
      height: '100%',
      maxHeight: '59vh',
      alignItems: 'centre',
    },
    table: {
      minWidth: 650,
      maxHeight: '100%',
    },
    tableHead: {
      padding: theme.spacing(2),
      paddingLeft: theme.spacing(3),
    },
    tableBody: {
      overflowY: 'auto',
    },
    tableClicky: {
      cursor: 'pointer',
      '&:hover': {
        color: theme.palette.primary.dark,
        transition: '0.3s',
      },
    },
  })
)

const CombatLog: React.FunctionComponent<Props> = ({ combatLog, openDialog }) => {
  const classes = useStyles()
  return (
    <Paper className={classes.paper}>
      {combatLog && combatLog.length ? (
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
                  className={classes.tableClicky}
                  onClick={() =>
                    openDialog &&
                    openDialog({ name: event.name, events: combatLog.filter(ev => ev.name === event.name) })
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
      ) : (
        <Typography variant="body1">No PvP events in your journal. Go blow somebody up!</Typography>
      )}
    </Paper>
  )
}

export default CombatLog
