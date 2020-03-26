import { hot } from 'react-hot-loader/root'
import * as React from 'react'
import { ThemeProvider } from '@material-ui/styles'
import NavBar from '../NavBar'
import theme from '../theme'
import Cmdr from '../../containers/CmdrContainer'
import IFF from '../../containers/IffContainer'
import Beacon from '../../containers/BeaconContainer'
import Loading from './Loading'
import { Typography } from '@material-ui/core'
import Update from './Update'

interface PageProps {
  children?: React.ReactNode
}

interface ApplicationProps {
  ready: boolean
}

const Page = (props: PageProps) => (
  <Typography component="div" style={{ padding: 8 * 3 }}>
    {props.children}
  </Typography>
)

const Application = ({ ready = false }: ApplicationProps) => {
  const [value, setValue] = React.useState(0)

  function handleChange(event: React.ChangeEvent<{}>, newValue: number) {
    setValue(newValue)
  }

  return (
    <ThemeProvider theme={theme}>
      <div style={{ maxHeight: '100vh' }}>
        {ready ? (
          <div>
            <Update />
            <NavBar value={value} handleChange={handleChange} />
            {value === 0 && (
              <Page>
                <Cmdr />
              </Page>
            )}
            {value === 1 && (
              <Page>
                <IFF />
              </Page>
            )}
            {value === 2 && (
              <Page>
                <Beacon />
              </Page>
            )}
            {value === 3 && (
              <Page>
                <p>Games</p>
              </Page>
            )}
          </div>
        ) : (
          <Loading />
        )}
      </div>
    </ThemeProvider>
  )
}

export default hot(Application)
