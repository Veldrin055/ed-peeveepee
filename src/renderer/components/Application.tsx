import { hot } from 'react-hot-loader/root';
import * as React from 'react';
import { ThemeProvider } from '@material-ui/styles';
import NavBar from './NavBar';
import theme from './theme';
import Cmdr from '../containers/CmdrContainer';

const Application = () => (
  <ThemeProvider theme={theme}>
    <div style={{ maxHeight: '100vh' }}>
      <NavBar />
      <Cmdr />
    </div>
  </ThemeProvider>
);

export default hot(Application);
