import { Middleware } from 'redux'
import { Location } from '../../common/types'
import { LOCATION_CHANGE, LocationChangeAction } from '../actions/cmdrStateActions'
import { BEACON_TOGGLE, beaconAdd, beaconRemove, BeaconToggleAction } from '../actions/beaconActions'
import server from '../server'

export const beaconMiddleware: Middleware = store => {
  server.on('beacon', msg => store.dispatch(beaconAdd(msg)))
  server.on('beacon_remove', msg => store.dispatch(beaconRemove(msg)))

  const sendLocationUpdate = (location: Location) => {
    const msg = {
      location,
      cmdr: store.getState().cmdr.name,
    }

    server.send({ msg, type: 'beacon' })
  }

  return next => action => {
    if (action.type === LOCATION_CHANGE) {
      if (store.getState().beacon.enabled) {
        const { payload } = action as LocationChangeAction
        sendLocationUpdate({ ...payload })
      }
    } else if (action.type === BEACON_TOGGLE) {
      const { payload } = action as BeaconToggleAction
      if (payload) {
        sendLocationUpdate(store.getState().cmdr.location)
      }
    }

    return next(action)
  }
}
