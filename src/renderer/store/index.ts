import { applyMiddleware, createStore, Store } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'

import { rootReducer, RootState } from '../reducers'
import { addIff } from '../middleware/iffMiddleware'

const configureStore = (initialState?: RootState): Store<RootState | undefined> => {
  const middlewares: any[] = [addIff]
  const enhancer = composeWithDevTools(applyMiddleware(...middlewares))
  return createStore(rootReducer, initialState, enhancer)
}

const store = configureStore()

if (typeof module.hot !== 'undefined') {
  module.hot.accept('../reducers', () => store.replaceReducer(require('../reducers').rootReducer))
}

export default store
