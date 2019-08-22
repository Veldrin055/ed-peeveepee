import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { AppContainer } from 'react-hot-loader'
import 'typeface-sintony'
import './assets/EUROCAPS.ttf'

import Application from './components/Application'
import store from './store'
import journalActionDispatcher from './journalActionDispatcher'

// Create main element
document.body.style.margin = '0'
document.body.style.overflowX = 'hidden'
document.body.style.height = '100vh'
document.body.style.maxHeight = '100vh'
const mainElement = document.createElement('div')
document.body.appendChild(mainElement)

// Set up journal event listener
journalActionDispatcher(store)

// Render components
const render = (Component: () => JSX.Element) => {
  ReactDOM.render(
    <AppContainer>
      <Provider store={store}>
        <Component />
      </Provider>
    </AppContainer>,
    mainElement
  )
}

render(Application)
