import { connect } from 'react-redux'
import { RootState } from '../reducers'
import { Dispatch } from 'redux'
import { setSettings } from '../actions/settingsActions'

import Settings from '../components/NavBar/Settings'
import { SettingsState } from '../reducers/settingsReducer'

const mapStateToProps = ({ settings }: RootState) => ({ settings })
const mapDispatchToProps = (dispatch: Dispatch) => ({
  setSettings: (payload: SettingsState) => dispatch(setSettings(payload)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Settings)
