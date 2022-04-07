import React from 'react'
import { connect } from 'react-redux'
import * as actionCreators from '../state/action-creators'

export function Form(props) {
const {
  inputChange,
  postQuiz,
  resetForm
} = props
console.log(props.form)
  const onChange = evt => {
const {id, value} = evt.target
inputChange({id, value})
  }
  const initialFormState = {
    newQuestion: '',
    newTrueAnswer: '',
    newFalseAnswer: '',
  }
  const onSubmit = evt => {
    evt.preventDefault()
    postQuiz(props.form.newQuestion, props.form.newTrueAnswer, props.form.newFalseAnswer)
    
  }
const isDisabled= () => {
if(props.form.newQuestion.trim().length >= 1 && props.form.newTrueAnswer.trim().length >= 1 && props.form.newFalseAnswer.trim().length >= 1){return false}
else{return true}
}
  return (
    <form id="form" onSubmit={onSubmit}>
      <h2>Create New Quiz</h2>
      <input maxLength={50} onChange={onChange} value = {props.form.newQuestion} id="newQuestion" placeholder="Enter question" />
      <input maxLength={50} onChange={onChange} value = {props.form.newTrueAnswer} id="newTrueAnswer" placeholder="Enter true answer" />
      <input maxLength={50} onChange={onChange} value = {props.form.newFalseAnswer} id="newFalseAnswer" placeholder="Enter false answer" />
      <button disabled = {isDisabled()} id="submitNewQuizBtn">Submit new quiz</button>
    </form>
  )
}
const mapState =(state) => {
  return {form : state.form}
  }
  
  export default connect(mapState, actionCreators)(Form)

