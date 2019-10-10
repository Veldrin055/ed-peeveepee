import * as React from 'react'
import { createStyles, Divider, Theme } from '@material-ui/core'
import ListItem from '@material-ui/core/ListItem'
import List from '@material-ui/core/List'
import { BeaconMessage, Coordinates } from '../../../common/types'
import ListItemText from '@material-ui/core/ListItemText'

// todo consider adding IFF as well, for highlighting
interface BeaconProps {
  beacons: BeaconMessage[]
  location: Coordinates
}

const styles = (theme: Theme) =>
  createStyles({
    root: {
      margin: 0,
      padding: theme.spacing(3),
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

const Beacon = ({ beacons, location }: BeaconProps) => (
  <div>
    <List>
      {beacons
        .sort((e1, e2) => distance(location, e1.location.position) - distance(location, e2.location.position))
        .map((beaconMsg, index) => (
          <React.Fragment key={beaconMsg.cmdr}>
            <ListItem>
              <ListItemText
                primary={beaconMsg.cmdr}
                secondary={`${beaconMsg.location.starSystem} / ${beaconMsg.location.body}`}
              />
              <ListItemText primary={`${distance(location, beaconMsg.location.position).toFixed(2)} LY`} />
            </ListItem>
            {index < beacons.length - 1 && <Divider variant="inset" component="li" />}
          </React.Fragment>
        ))}
    </List>
  </div>
)

export default Beacon
