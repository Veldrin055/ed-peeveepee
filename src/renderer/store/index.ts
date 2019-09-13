import { applyMiddleware, createStore, Store } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'

import { rootReducer, RootState } from '../reducers'
import { addIff } from '../middleware/iffMiddleware'
import { settingsMiddlware } from '../middleware/settingsMiddleware'
import { beaconMiddleware } from '../middleware/beaconMiddleware'

const configureStore = (initialState?: RootState): Store<RootState | undefined> => {
  const enhancer = composeWithDevTools(applyMiddleware(...[addIff, settingsMiddlware, beaconMiddleware]))
  return createStore(rootReducer, initialState, enhancer)
}

const store = configureStore()

if (typeof module.hot !== 'undefined') {
  module.hot.accept('../reducers', () => store.replaceReducer(require('../reducers').rootReducer))
}

export default store
