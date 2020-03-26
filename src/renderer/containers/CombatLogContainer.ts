import { connect } from 'react-redux';

import HeadToHead from '../components/HeadToHead';
import { RootState } from '../reducers';

const mapStateToProps = ({ combatLog }: RootState) => ({
  combatLog: combatLog.eventLog
});

export default connect(mapStateToProps)(HeadToHead);
