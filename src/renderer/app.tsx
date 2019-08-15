import * as React from 'react'
import * as ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import {AppContainer} from 'react-hot-loader'

import Application from './components/Application'
import store from './store'
import middleware from './middleware'

// Create main element
document.body.style.margin = '0'
document.body.style.overflowX = 'hidden'
const mainElement = document.createElement('div')
document.body.appendChild(mainElement)
middleware(store)

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
