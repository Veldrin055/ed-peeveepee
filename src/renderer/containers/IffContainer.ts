import { connect } from 'react-redux'

import IFF from '../components/IFF'
import { RootState } from '../reducers'
import { Dispatch } from 'redux'
import { iffAdd, iffDelete } from '../actions/iffActions'
import { IFFRecord } from '../../main/iffStore'

const mapStateToProps = ({ iff }: RootState) => ({ iff: iff.iff })
const mapDispatchToProps = (dispatch: Dispatch) => ({
  add: (payload: IFFRecord) => dispatch(iffAdd(payload)),
  del: (name: string) => dispatch(iffDelete(name)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(IFF)
