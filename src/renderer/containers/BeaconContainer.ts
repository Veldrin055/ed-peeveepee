import { RootState } from '../reducers'
import Beacon from '../components/Beacon'
import { connect } from 'react-redux'

const mapStateToProps = ({ beacons, cmdr, iff }: RootState) => ({
  beacons,
  iff: iff.iff,
  location: cmdr.location.position,
})

export default connect(mapStateToProps)(Beacon)
