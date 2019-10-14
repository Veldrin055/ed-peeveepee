import * as React from 'react'
import { createStyles, Divider, Paper, Theme, withStyles } from '@material-ui/core'
import ListItem from '@material-ui/core/ListItem'
import List from '@material-ui/core/List'
import { BeaconMessage, Coordinates } from '../../../common/types'
import ListItemText from '@material-ui/core/ListItemText'
import { locationDisplay } from '../../util'
import { IFFLabel, IFFRecord } from '../../../main/iff/iffStore'
import Favorite from '@material-ui/icons/Favorite'
import CloseIcon from '@material-ui/icons/Close'
import Target from '../../assets/Target'
import Neutral from '../../assets/Neutral'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import { WithStyles } from '@material-ui/styles'
import Snackbar from '@material-ui/core/Snackbar'
import IconButton from '@material-ui/core/IconButton'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Switch from '@material-ui/core/Switch'

interface BeaconProps {
  beaconEnabled: boolean
  toggle: (enabled: boolean) => void
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
      cursor: 'pointer',
      '&:hover': {
        color: theme.palette.primary.dark,
        transition: '0.3s',
      },
    },
    close: {
      padding: theme.spacing(0.5),
    },
  })

const distance = (loc1: Coordinates, loc2: Coordinates) =>
  Math.sqrt(Math.pow(loc2.x - loc1.x, 2) + Math.pow(loc2.y - loc1.y, 2) + Math.pow(loc2.z - loc1.z, 2))

const BeaconListItem = withStyles(styles)(({ beaconMsg, distance, iff, classes }: BeaconListItemProps) => {
  const [open, setOpen] = React.useState(false)

  const handleClick = () => {
    setOpen(true)
    return navigator.clipboard.writeText(beaconMsg.location.starSystem)
  }

  const handleClose = () => setOpen(false)

  return (
    <ListItem>
      {iff && (
        <ListItemIcon>
          {(iff.label === IFFLabel.ally && <Favorite className={classes.favourite} />) ||
            (iff.label === IFFLabel.enemy && <Target className={classes.enemy} />) || (
              <Neutral className={classes.neutral} />
            )}
        </ListItemIcon>
      )}
      <ListItemText
        primary={beaconMsg.cmdr}
        secondary={locationDisplay(beaconMsg.location)}
        className={classes.hover}
        onClick={handleClick}
      />
      <ListItemText primary={`${distance.toFixed(2)} LY`} />
      <Snackbar
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        ContentProps={{
          'aria-describedby': 'message-id',
        }}
        message={<span id="message-id">Note archived</span>}
        action={[
          <IconButton key="close" aria-label="close" color="inherit" className={classes.close} onClick={handleClose}>
            <CloseIcon />
          </IconButton>,
        ]}
      />
    </ListItem>
  )
})

const Beacon = ({ beaconEnabled, toggle, beacons, location, iff }: BeaconProps) => {
  const handleBeaconToggle = () => toggle(!beaconEnabled)

  return (
    <div>
      <FormControlLabel
        control={<Switch checked={beaconEnabled} onChange={handleBeaconToggle} value="beaconEnabled" />}
        label="Beacon"
      />
      <Paper>
        {beacons && beacons.length ? (
          <List>
            {beacons
              .map(beaconMsg => ({ beaconMsg, distance: distance(location, beaconMsg.location.position) }))
              .sort((e1, e2) => e1.distance - e2.distance)
              .map(({ beaconMsg, distance }, index) => (
                <React.Fragment key={beaconMsg.cmdr}>
                  <BeaconListItem
                    {...{ beaconMsg, distance, iff: iff.find(record => record.name === beaconMsg.cmdr) }}
                  />
                  {index < beacons.length - 1 && <Divider variant="inset" component="li" />}
                </React.Fragment>
              ))}
          </List>
        ) : beaconEnabled ? (
          <p>No CMDRs found broadcasting</p>
        ) : (
          <p>Turn on the beacon to find new friends</p>
        )}
      </Paper>
    </div>
  )
}

export default Beacon
