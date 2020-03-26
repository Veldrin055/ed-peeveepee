import { connect } from 'react-redux';

import CmdrStats from '../components/CmdrStats';
import { RootState } from '../reducers';

const mapStateToProps = ({ cmdr }: RootState) => ({
  cmdr
});

export default connect(mapStateToProps)(CmdrStats);
