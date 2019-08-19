import { IFFLabel, IFFRecord } from '../../../main/iffStore'
import { WithStyles } from '@material-ui/styles'
import * as React from 'react'
import { createStyles, Theme, withStyles } from '@material-ui/core'
import MuiDialogContent from '@material-ui/core/DialogContent/DialogContent'
import MuiDialogTitle from '@material-ui/core/DialogTitle/DialogTitle'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/core/SvgIcon/SvgIcon'
import Dialog from '@material-ui/core/Dialog'
import DialogContentText from '@material-ui/core/DialogContentText'
import InputLabel from '@material-ui/core/InputLabel'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'
import TextField from '@material-ui/core/TextField'
import DialogActions from '@material-ui/core/DialogActions'
import Button from '@material-ui/core/Button'
import FormControl from '@material-ui/core/FormControl'

export interface EditDialogProps extends WithStyles<typeof styles> {
  open: boolean
  handleClose: () => void
  save: (originalName: string, record: IFFRecord) => void
  record?: IFFRecord
}

export interface EditDialogTitleProps extends WithStyles<typeof styles> {
  children: React.ReactNode
  onClose: () => void
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
    closeButton: {
      position: 'absolute',
      right: theme.spacing(1),
      top: theme.spacing(1),
      color: theme.palette.grey[500],
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
      marginRight: theme.spacing(3),
    },
    textField: {
      margin: theme.spacing(1),
      minWidth: 120,
      marginRight: theme.spacing(3),
      marginTop: theme.spacing(1),
    },
  })

const DialogTitle = withStyles(styles)((props: EditDialogTitleProps) => {
  const { children, onClose, classes } = props
  return (
    <MuiDialogTitle disableTypography className={classes.root}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="Close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  )
})

const DialogContent = withStyles(theme => ({
  root: {
    padding: theme.spacing(3),
  },
}))(MuiDialogContent)

const EditDialog = withStyles(styles)(({ open, handleClose, save, record, classes }: EditDialogProps) => {
  const originalName = record ? record.name : ''
  const defaultState: IFFRecord = {
    name: record ? record.name : '',
    label: record ? record.label : IFFLabel.enemy,
    notes: record ? record.notes : '',
  }
  const [values, setValues] = React.useState(defaultState)

  React.useEffect(() => {
    setValues(record ? record : defaultState)
  }, [record])

  const handleChange = (e: React.ChangeEvent<{ name?: string; value: unknown }>) => {
    const { name, value } = e.target
    setValues(oldValues => ({
      ...oldValues,
      [name as string]: value,
    }))
  }

  const handleSave = () => {
    const { name, label, notes } = values
    save(originalName, { name, label, notes })
    handleClose()
  }
  return (
    <Dialog onClose={handleClose} open={open} maxWidth="md">
      <DialogTitle onClose={handleClose}>{record ? 'Edit' : 'New'}</DialogTitle>
      <DialogContent dividers>
        <DialogContentText>
          Enter the target commander's name, omitting the CMDR prefix. Names are checked case-insensitive.
        </DialogContentText>
        <form className={classes.root} autoComplete="off">
          <FormControl className={classes.formControl}>
            <InputLabel htmlFor="label">Label</InputLabel>
            <Select id="label" name="label" value={values.label} onChange={handleChange}>
              <MenuItem value={IFFLabel.ally}>Ally</MenuItem>
              <MenuItem value={IFFLabel.neutral}>Neutral</MenuItem>
              <MenuItem value={IFFLabel.enemy}>Enemy</MenuItem>
            </Select>
          </FormControl>
          <TextField
            autoFocus
            margin="dense"
            name="name"
            label="CMDR Name"
            type="text"
            value={values.name}
            onChange={handleChange}
            className={classes.textField}
          />
          <TextField
            autoFocus
            margin="dense"
            name="notes"
            label="Notes (optional)"
            type="text"
            fullWidth
            value={values.notes}
            onChange={handleChange}
          />
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSave} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  )
})

export default EditDialog
