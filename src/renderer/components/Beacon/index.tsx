import * as React from 'react'
import { createStyles, Divider, Paper, Theme, withStyles } from '@material-ui/core'
import ListItem from '@material-ui/core/ListItem'
import List from '@material-ui/core/List'
import { BeaconMessage, Coordinates } from '../../../common/types'
import ListItemText from '@material-ui/core/ListItemText'
import { locationDisplay } from '../../util'
import { IFFLabel, IFFRecord } from '../../../main/iff/iffStore'
import Favorite from '@material-ui/core/SvgIcon/SvgIcon'
import Target from '../../assets/Target'
import Neutral from '../../assets/Neutral'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import { WithStyles } from '@material-ui/styles'

interface BeaconProps {
  beacons: BeaconMessage[]
  location: Coordinates
  iff: IFFRecord[]
}

interface BeaconListItemProps extends WithStyles<typeof styles> {
  beaconMsg: BeaconMessage
  distance: number
  iff?: IFFRecord
}

const styles = (theme: Theme) =>
  createStyles({
    root: {
      margin: 0,
      padding: theme.spacing(3),
    },
    favourite: {
      color: '#029e4c',
    },
    enemy: {
      color: '#ff0000',
    },
    neutral: {
      color: '#00b3f7',
    },
    text: {
      color: 'white',
    },
    hover: {
      position: 'relative',

      '&:hover &__no-hover': {
        opacity: 0,
      },
      '&:hover &__hover': {
        opacity: 1,
      },
      '&__hover': {
        position: 'absolute',
        top: 0,
        opacity: 0,
      },
      '&__no-hover': {
        opacity: 1,
      },
    },
  })

const distance = (loc1: Coordinates, loc2: Coordinates) =>
  Math.sqrt(Math.pow(loc2.x - loc1.x, 2) + Math.pow(loc2.y - loc1.y, 2) + Math.pow(loc2.z - loc1.z, 2))

const BeaconListItem = withStyles(styles)(({ beaconMsg, distance, iff, classes }: BeaconListItemProps) => (
  <ListItem>
    {iff && (
      <ListItemIcon>
        {(iff.label === IFFLabel.ally && <Favorite className={classes.favourite} />) ||
          (iff.label === IFFLabel.enemy && <Target className={classes.enemy} />) || (
            <Neutral className={classes.neutral} />
          )}
      </ListItemIcon>
    )}
    <ListItemText primary={beaconMsg.cmdr} secondary={locationDisplay(beaconMsg.location)} />
    <ListItemText primary={`${distance.toFixed(2)} LY`} />
  </ListItem>
))

const Beacon = ({ beacons, location, iff }: BeaconProps) => (
  <Paper>
    {beacons && beacons.length ? (
      <List>
        {beacons
          .map(beaconMsg => ({ beaconMsg, distance: distance(location, beaconMsg.location.position) }))
          .sort((e1, e2) => e1.distance - e2.distance)
          .map(({ beaconMsg, distance }, index) => (
            <React.Fragment key={beaconMsg.cmdr}>
              <BeaconListItem {...{ beaconMsg, distance, iff: iff.find(record => record.name === beaconMsg.cmdr) }} />
              {index < beacons.length - 1 && <Divider variant="inset" component="li" />}
            </React.Fragment>
          ))}
      </List>
    ) : (
      <p>No CMDRs found broadcasting</p>
    )}
  </Paper>
)

export default Beacon
