
import {connect} from '../../redux.jsx'

const userState = appState=>{return {user:appState.user}}
const userDispatch = dispatch=>{return {updateUser:(attrs)=>dispatch({type:'updateState',payload:attrs})}}

export const userConnect = connect(userState,userDispatch)