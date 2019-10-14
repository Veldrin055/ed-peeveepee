import { Middleware } from 'redux'
import { LOCATION_CHANGE, LocationChangeAction } from '../actions/cmdrStateActions'
import { BEACON_TOGGLE, beaconAdd, beaconRemove, BeaconToggleAction } from '../actions/beaconActions'
import server from '../server'

export const beaconMiddleware: Middleware = store => {
  const handleBeaconAdd = (msg: any) => store.dispatch(beaconAdd(msg))
  const handleBeaconRemove = (msg: any) => store.dispatch(beaconRemove(msg))

  server.on('beacon', handleBeaconAdd)
  server.on('beacon_remove', handleBeaconRemove)

  return next => action => {
    if (action.type === LOCATION_CHANGE) {
      const { payload } = action as LocationChangeAction
      const msg = {
        cmdr: store.getState().cmdr.name,
        location: { ...payload },
      }

      server.send({ msg, type: 'beacon' })
    } else if (action.type === BEACON_TOGGLE) {
      const { payload } = action as BeaconToggleAction
      if (payload) {
        server.on('beacon', msg => store.dispatch(beaconAdd(msg)))
        server.on('beacon_remove', msg => store.dispatch(beaconRemove(msg)))
      } else {
        server.removeListener('beacon', handleBeaconAdd)
        server.removeListener('beacon', handleBeaconRemove)
      }
    }

    return next(action)
  }
}
