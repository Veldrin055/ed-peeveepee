import * as React from 'react'
import { IFFLabel, IFFRecord } from '../../../main/iff/iffStore'
import { createStyles, Divider, List, Theme, withStyles } from '@material-ui/core'
import Target from '../../assets/Target'
import Neutral from '../../assets/Neutral'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import Favorite from '@material-ui/icons/Favorite'
import ListItemText from '@material-ui/core/ListItemText'
import Button from '@material-ui/core/Button'
import Edit from '@material-ui/icons/Edit'
import Delete from '@material-ui/icons/Delete'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import { WithStyles } from '@material-ui/styles'
import EditDialog from './EditDialog'
import Paper from '@material-ui/core/Paper'

interface IFFProps extends WithStyles<typeof styles> {
  iff: IFFRecord[]
  add: (record: IFFRecord) => void
  del: (name: string) => void
}

interface IFFListItemProps extends WithStyles<typeof styles> {
  iff: IFFRecord
  del: (name: string) => void
  edit: (record: IFFRecord) => void
}

interface EditDialogState {
  open: boolean
  record?: IFFRecord
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
    addButton: {
      color: theme.palette.primary.dark,
    },
    text: {
      paddingLeft: theme.spacing(12),
      color: 'white',
    },
    paper: {
      width: '100%',
      marginTop: theme.spacing(12),
      overflowX: 'hidden',
      height: '100%',
      maxHeight: '59vh',
      alignItems: 'centre',
    },
  })

const IffListItem = withStyles(styles)(({ iff, del, edit, classes }: IFFListItemProps) => {
  const handleEdit = () => edit(iff)

  const handleDel = () => del(iff.name)

  return (
    <ListItem component="div">
      <ListItemIcon>
        {(iff.label === IFFLabel.ally && <Favorite className={classes.favourite} />) ||
          (iff.label === IFFLabel.enemy && <Target className={classes.enemy} />) || (
            <Neutral className={classes.neutral} />
          )}
      </ListItemIcon>
      <ListItemText primary={iff.name} secondary={iff.notes} />
      <ListItemSecondaryAction className="hover__hover">
        <IconButton onClick={handleEdit} color="primary">
          <Edit />
        </IconButton>
        <IconButton onClick={handleDel} color="secondary">
          <Delete />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  )
})

const Iff = withStyles(styles)(({ iff, add, del, classes }: IFFProps) => {
  const [dialogData, setDialogData] = React.useState<EditDialogState>({
    open: false,
    record: undefined,
  })

  const handleClose = () => setDialogData({ open: false, record: undefined })

  const handleOpen = (record?: IFFRecord) => setDialogData({ record, open: true })

  const openNew = () => handleOpen(undefined)

  const save = (originalName: string, record: IFFRecord) => {
    if (originalName && originalName !== record.name) {
      del(originalName)
    }
    add(record)
  }

  return (
    <div>
      <EditDialog open={dialogData.open} record={dialogData.record} handleClose={handleClose} save={save} />
      <Button variant="contained" color="primary" onClick={openNew}>
        Add
      </Button>
      <Paper className={classes.paper}>
        {(!iff || !iff.length) && (
          <Typography variant="body2" className={classes.text}>
            {`Add the names of CMDRs that you want to be immediately notified about when you interact with them (scan, interdict).
    
          This can be useful to prevent accidentally targeting an ally, or if someone from your Kill On Sight list drops by!
          Omit the 'CMDR' prefix when adding a new name. Names are checked case-insensitive.`}
          </Typography>
        )}
        <List>
          {iff.map((record, index) => (
            <React.Fragment key={record.name}>
              <IffListItem iff={record} del={del} edit={handleOpen} />
              {index < iff.length - 1 && <Divider variant="inset" component="li" />}
            </React.Fragment>
          ))}
        </List>
      </Paper>
    </div>
  )
})

export default Iff
