// ❗ You don't need to add extra reducers to achieve MVP
import { combineReducers } from 'redux'
import { MOVE_CLOCKWISE,
  MOVE_COUNTERCLOCKWISE,
SET_QUIZ_INTO_STATE,
SET_SELECTED_ANSWER,
SET_INFO_MESSAGE,
 INPUT_CHANGE,
 RESET_FORM,} from './action-types'

export const initialWheelState = 0
export function wheel(state = initialWheelState, action) {
  
  if (action.type === MOVE_COUNTERCLOCKWISE && state > 0){state = state-1 }
  else if(action.type === MOVE_CLOCKWISE && state <5){state = state+1}
  else if(action.type === MOVE_COUNTERCLOCKWISE && state === 0){state = 5}
  else if (action.type === MOVE_CLOCKWISE && state === 5){state = 0}
  // if else
return state
}

export const initialQuizState = null
export function quiz(state = initialQuizState, action) {
 switch(action.type){
   case SET_QUIZ_INTO_STATE:
     return action.payload
     default: return state
 }
 return state
}

export const initialSelectedAnswerState = null
export function selectedAnswer(state = initialSelectedAnswerState, action) {
  switch (action.type){
    case SET_SELECTED_ANSWER : 
    return action.payload
    default : return state
  }
}

export const initialMessageState = {'message' : ''}
export function infoMessage(state = initialMessageState, action) {
switch (action.type){
  case SET_INFO_MESSAGE :
    return {...state, message : action.payload}
    default : return state
}
}

export const initialFormState = {
  newQuestion: '',
  newTrueAnswer: '',
  newFalseAnswer: '',
}
export function form(state = initialFormState, action) {
  switch(action.type) {
    case INPUT_CHANGE:
      return {...state, [action.payload.id]: action.payload.value};
    case RESET_FORM:
      return initialFormState
      
      default : return state
  }
  
}

export default combineReducers({ wheel, quiz, selectedAnswer, infoMessage, form })
