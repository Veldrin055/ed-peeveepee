import { Middleware } from 'redux'
import { LOCATION_CHANGE, LocationChangeAction } from '../actions/cmdrStateActions'
import { beaconAdd, beaconRemove } from '../actions/beaconActions'
import Server from '../server'

const server = new Server()

export const beaconMiddleware: Middleware = store => {
  server.onmessage('beacon', msg => store.dispatch(beaconAdd(msg)))
  server.onmessage('beacon_remove', msg => store.dispatch(beaconRemove(msg)))

  return next => action => {
    if (action.type === LOCATION_CHANGE) {
      const { payload } = action as LocationChangeAction
      const msg = {
        cmdr: store.getState().cmdr.name,
        location: {
          systemName: payload.starSystem,
          ...payload.position,
        },
      }

      server.send({ msg, type: 'beacon' })
    }
    return next(action)
  }
}
