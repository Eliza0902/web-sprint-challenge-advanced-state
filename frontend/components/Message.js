import React, {useEffect, useReducer} from 'react'
import { connect } from 'react-redux'
import * as actionCreators from '../state/action-creators'

function Message(props) {
  const {setMessage} = props
  useEffect(()=>{
setMessage
  }, [])
  console.log(props.message.message)
  return <div id="message">{props.message.message}</div>
}

const mapState =(state) => {
  return {message : state.infoMessage}
  }
  
  export default connect(mapState, actionCreators)(Message)
