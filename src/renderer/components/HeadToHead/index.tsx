import * as React from 'react';
import { createStyles, Theme, withStyles, WithStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
// import MuiDialogActions from '@material-ui/core/DialogActions'; todo remove if not needed
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import { PvPEvent, PvpEventType } from '../../../common/types';
import CombatLog from '../CombatLog';

const styles = (theme: Theme) =>
  createStyles({
    root: {
      margin: 0,
      padding: theme.spacing(2)
    },
    closeButton: {
      position: 'absolute',
      right: theme.spacing(1),
      top: theme.spacing(1),
      color: theme.palette.grey[500]
    }
  });

export interface HeadToHeadTitleProps extends WithStyles<typeof styles> {
  children: React.ReactNode;
  onClose: () => void;
}

export interface HeadToHeadProps {
  combatLog: PvPEvent[];
}

export interface HeadToHeadState extends HeadToHeadValues {
  readonly open: boolean;
}

export interface HeadToHeadValues {
  readonly name: string;
  readonly events: PvPEvent[];
}

const kdr = (totalKills: number, totalDeaths: number) => {
  if (totalDeaths === 0) {
    return 'Undefeated';
  }
  return Math.round(totalKills / totalDeaths).toFixed(2);
};

const DialogTitle = withStyles(styles)((props: HeadToHeadTitleProps) => {
  const { children, onClose, classes } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="Close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme: Theme) => ({
  root: {
    padding: theme.spacing(2)
  }
}))(MuiDialogContent);

export default class HeadToHead extends React.Component<HeadToHeadProps, HeadToHeadState> {
  state: HeadToHeadState = {
    open: false,
    name: '',
    events: []
  };

  handleClickOpen = (newState: HeadToHeadValues) => this.setState({ ...newState }, () => this.setState({ open: true }));

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { name, events } = this.state;
    const totalKills = events.filter(event => event.event === PvpEventType.Kill).length;
    const totalDeaths = events.filter(event => event.event === PvpEventType.Death).length;
    return (
      <div>
        <Dialog onClose={this.handleClose} aria-labelledby="customized-dialog-title" open={this.state.open}>
          <DialogTitle onClose={this.handleClose}>Head to Head: CMDR {name}</DialogTitle>
          <DialogContent dividers>
            <Typography variant="body1">Kills: {totalKills}</Typography>
            <Typography variant="body1">Deaths: {totalDeaths}</Typography>
            <Typography variant="body1">KDR: {kdr(totalKills, totalDeaths)}</Typography>
            <CombatLog combatLog={events} />
          </DialogContent>
        </Dialog>
        <CombatLog combatLog={this.props.combatLog} openDialog={this.handleClickOpen} />
      </div>
    );
  }
}
