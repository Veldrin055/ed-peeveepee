import { hot } from 'react-hot-loader/root';
import * as React from 'react';
import { ThemeProvider } from '@material-ui/styles';
import NavBar from './NavBar';
import theme from './theme';
import Cmdr from '../containers/CmdrContainer';
import { Typography } from '@material-ui/core';

interface PageProps {
  children?: React.ReactNode;
}

const Page = (props: PageProps) => (
  <Typography component="div" style={{ padding: 8 * 3 }}>
    {props.children}
  </Typography>
);

const Application = () => {
  const [value, setValue] = React.useState(0);

  function handleChange(event: React.ChangeEvent<{}>, newValue: number) {
    setValue(newValue);
  }

  return (
    <ThemeProvider theme={theme}>
      <div style={{ maxHeight: '100vh' }}>
        <NavBar {...{ value, handleChange }} />
        {value === 0 && (
          <Page>
            <Cmdr />
          </Page>
        )}
        {value === 1 && (
          <Page>
            <p>IFF</p>
          </Page>
        )}
        {value === 2 && (
          <Page>
            <p>Beacon</p>
          </Page>
        )}
        {value === 3 && (
          <Page>
            <p>Games</p>
          </Page>
        )}
      </div>
    </ThemeProvider>
  );
};

export default hot(Application);
