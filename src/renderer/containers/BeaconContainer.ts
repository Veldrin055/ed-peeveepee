import { RootState } from '../reducers'
import Beacon from '../components/Beacon'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'
import { beaconToggle } from '../actions/beaconActions'

const mapStateToProps = ({ beacon, cmdr, iff }: RootState) => ({
  beaconEnabled: beacon.enabled,
  beacons: beacon.beacons,
  iff: iff.iff,
  location: cmdr.location.position,
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  toggle: (enabled: boolean) => dispatch(beaconToggle(enabled)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Beacon)
