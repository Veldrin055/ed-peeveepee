import {connect} from 'react-redux';

import CmdrStats from '../components/CmdrStats';
import {RootState} from '../reducers';

const mapStateToProps = (state: RootState) => ({
  cmdr: state.cmdr
});

export default connect(mapStateToProps)(CmdrStats);
