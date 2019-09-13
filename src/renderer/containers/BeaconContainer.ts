import { RootState } from '../reducers'
import Beacon from '../components/Beacon'
import { connect } from 'react-redux'

const mapStateToProps = ({ beacons, cmdr }: RootState) => ({ beacons, location: cmdr.location.position })

export default connect(mapStateToProps)(Beacon)
