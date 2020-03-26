import * as React from 'react'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import makeStyles from '@material-ui/styles/makeStyles'
import createStyles from '@material-ui/styles/createStyles'
import { Theme } from '@material-ui/core/styles'

interface PanelProps {
  label: string
  children: React.ReactNode
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      height: '100%',
      maxHeight: '100%',
    },
    container: {
      height: '100%',
      padding: theme.spacing(3),
      maxHeight: '100%',
      width: '100%',
      alignItems: 'center',
    },
    paper: {
      padding: theme.spacing(4),
    },
    typography: {
      marginLeft: theme.spacing(6),
      color: 'white',
      float: 'left',
      fontFamily: 'Share Tech Mono',
      flexShrink: 1,
      backgroundColor: '#0a8bd6',
    },
    panel: {
      width: '100%',
      position: 'relative',
      // background: '#0a8bd6',
      background: 'linear-gradient(to right, #0a8bd6, #00b3f7)',
      boxShadow: `0 0 1px #fff, 0 0 2px #fff, 0 0 3px #fff, 0 0 4px #228DFF, 0 0 7px #228DFF, 0 0 8px #228DFF, 0 0 10px #228DFF, 0 0 15px #228DFF;`,
      padding: 1,
      borderWidth: 1,
      borderRadius: 2,
    },
    leftTriangle: {
      width: 0,
      height: 0,
      borderBottom: '100px solid red',
      borderLeft: '100px solid transparent',
    },
    rightTriangle: {
      width: 0,
      height: 0,
      borderBottom: '100px solid red',
    },
  })
)

const Panel = ({ label, children }: PanelProps) => {
  const classes = useStyles()
  return (
    <Grid container direction="column">
      <Grid item>
        <Typography variant="h6" className={classes.typography}>
          {label}
        </Typography>
      </Grid>
      <Grid item className={classes.panel}>
        <Paper className={classes.paper}>{children}</Paper>
      </Grid>
    </Grid>
  )
}

export default Panel
