import { Middleware } from 'redux'
import { LOCATION_CHANGE, LocationChangeAction } from '../actions/cmdrStateActions'
import { beaconAdd, beaconRemove } from '../actions/beaconActions'

const ws = new WebSocket('ws://ed-pvp-server.herokuapp.com')

export const beaconMiddleware: Middleware = store => {
  ws.onmessage = ({ data }) => {
    const msg = JSON.parse(data)
    if (msg.type === 'beacon') {
      store.dispatch(beaconAdd(msg.msg))
    }
    if (msg.type === 'beacon_remove') {
      store.dispatch(beaconRemove(msg.msg))
    }
  }

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

      ws.send(JSON.stringify({ msg, type: 'beacon' }))
    }
    return next(action)
  }
}
