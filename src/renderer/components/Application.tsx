import {hot} from 'react-hot-loader/root';
import * as React from 'react';
import {ThemeProvider} from '@material-ui/styles'
import NavBar from './NavBar'
import theme from './theme'
import SystemHistory from '../containers/CmdrContainer'

const Application = () => (
    <ThemeProvider theme={theme}>
      <div>
        <NavBar />
        <SystemHistory />
      </div>
    </ThemeProvider>
);

export default hot(Application);
