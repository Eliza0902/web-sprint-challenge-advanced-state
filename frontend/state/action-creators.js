// ❗ You don't need to add extra action creators to achieve MVP
import { MOVE_CLOCKWISE,
  MOVE_COUNTERCLOCKWISE,
SET_QUIZ_INTO_STATE,
SET_SELECTED_ANSWER,
SET_INFO_MESSAGE,
 INPUT_CHANGE,
 RESET_FORM,} from './action-types'
 import axios from 'axios'

export function moveClockwise() {
  return {type: MOVE_CLOCKWISE}
 }

export function moveCounterClockwise() {
  return{type: MOVE_COUNTERCLOCKWISE}
 }

export function selectAnswer(answer) {
  return {type: SET_SELECTED_ANSWER, payload: answer}
 }

export function setMessage(value) {
return {type: SET_INFO_MESSAGE, payload : value}
 };

export function setQuiz(quiz) { 
  return {type: SET_QUIZ_INTO_STATE, payload : quiz  }
}

export function inputChange({id, value}) {
  return{ type: INPUT_CHANGE, payload : {id, value}}
 }

export function resetForm() {
  return{type: RESET_FORM, }
 }

// ❗ Async action creators
export function fetchQuiz() {
  return function (dispatch) {
    // First, dispatch an action to reset the quiz state (so the "Loading next quiz..." message can display)
    // On successful GET:
    // - Dispatch an action to send the obtained quiz to its state
    
   axios.get(`http://localhost:9000/api/quiz/next`)
    .then(res =>{
      console.log(res),
      dispatch(setQuiz(res.data))
      
    })
      .catch(err => console.log(err))
  }
}
export function postAnswer(question , answer) {
  return function (dispatch) {
    // On successful POST:
    // - Dispatch an action to reset the selected answer state
    // - Dispatch an action to set the server message to state
    // - Dispatch the fetching of the next quiz
  axios.post('http://localhost:9000/api/quiz/answer', {quiz_id : question, answer_id : answer})
  .then(res => {
    console.log(res.data.message)
    dispatch(setMessage(res.data.message))
    dispatch(selectAnswer())
    
    
  })
  .catch(err => {
    setMessage(err.data)
  })
  
}
}
export function postQuiz(question, newTrue, newFalse) {
  return function (dispatch) {
    // On successful POST:
    // - Dispatch the correct message to the the appropriate state
    // - Dispatch the resetting of the form
    axios.post(`http://localhost:9000/api/quiz/new`, {"question_text": question, "true_answer_text": newTrue, "false_answer_text": newFalse})
    .then(res => {
      console.log(res)
      dispatch(setMessage(`Congrats: "${question}" is a great question!`))
      dispatch(resetForm())
    })
    .catch(err => {
      (setMessage(err.data))
    })
  }
}
// ❗ On promise rejections, use log statements or breakpoints, and put an appropriate error message in state
