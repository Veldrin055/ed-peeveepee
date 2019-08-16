import * as React from 'react';
import { remote } from 'electron';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import CloseIcon from '@material-ui/icons/Close';
import MinimizeIcon from '@material-ui/icons/Minimize';
import MaximizeIcon from '@material-ui/icons/Maximize';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      '-webkit-app-region': 'drag'
    },
    menuButton: {
      marginRight: theme.spacing(2),
      '-webkit-app-region': 'no-drag'
    },
    button: {
      '-webkit-app-region': 'no-drag'
    },
    title: {
      // flexGrow: 1,
    },
    sectionDesktop: {
      '-webkit-app-region': 'no-drag',
      display: 'flex'
    }
  })
);

const close = () => {
  const window = remote.BrowserWindow.getFocusedWindow();
  if (window) {
    window.close();
  }
};

const minimize = () => {
  const window = remote.BrowserWindow.getFocusedWindow();
  if (window) {
    window.minimize();
  }
};

const maximize = () => {
  const window = remote.BrowserWindow.getFocusedWindow();
  if (window) {
    window.maximize();
  }
};

export default function NavBar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="Open drawer">
            <MenuIcon />
          </IconButton>
          <Typography className={classes.title} variant="h6" noWrap>
            PvP
          </Typography>
          <Button color="inherit" className={classes.button}>
            Main
          </Button>
          <Button color="inherit" className={classes.button}>
            BGS
          </Button>
          <Button color="inherit" className={classes.button}>
            Hero
          </Button>
          <Button color="inherit" className={classes.button}>
            Trade
          </Button>
          <Button color="inherit" className={classes.button}>
            PvP
          </Button>
          <div className={classes.root} />
          <div className={classes.sectionDesktop}>
            <IconButton color="inherit" onClick={minimize}>
              <MinimizeIcon />
            </IconButton>
            <IconButton color="inherit" onClick={maximize}>
              <MaximizeIcon />
            </IconButton>
            <IconButton edge="end" aria-label="Close" aria-haspopup="true" onClick={close} color="inherit">
              <CloseIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
    </div>
  );
}
