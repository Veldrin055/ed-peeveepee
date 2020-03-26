import { connect } from 'react-redux'

import Application from '../components/Application'
import { RootState } from '../reducers'

const mapStateToProps = ({ cmdr }: RootState) => ({
  ready: cmdr.location.starSystem !== 'Unknown',
})

export default connect(mapStateToProps)(Application)
