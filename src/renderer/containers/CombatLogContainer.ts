import { connect } from 'react-redux';

import CombatLog from '../components/CombatLog';
import { RootState } from '../reducers';

const mapStateToProps = ({ combatLog }: RootState) => ({
  combatLog: combatLog.eventLog
});

export default connect(mapStateToProps)(CombatLog);
