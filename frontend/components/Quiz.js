import React, {useEffect, useReducer} from 'react'
import { connect } from 'react-redux'
import * as actionCreators from '../state/action-creators'


 function Quiz(props) {
const {
 selectedAnswer,
 fetchQuiz,
 postAnswer,
 selectAnswer,
 infoMessage,
 setMessage 
} = props
 console.log(props.message)  
 useEffect(() =>{
 fetchQuiz()}, []
 )  
//  const setAnswer = {[props.quiz.quiz_id] : props.quiz.quiz_id, [props.selectedAnswer.answer_id]:props.selectedAnswer.answer_id}
 const onSubmit = (evt) => {
evt.preventDefault()
postAnswer(props.quiz.quiz_id, props.selectedAnswer.answer_id)
fetchQuiz()
 }

   const isDisabled = () => {
    if(selectedAnswer){return false} else{return true}
   }
  return (
    <div id="wrapper">
      {
        // quiz already in state? Let's use that, otherwise render "Loading next quiz..."
         props.quiz ? (
          <>
            <h2>{props.quiz.question}</h2>

            <div id="quizAnswers">
              <div className={`${selectedAnswer?.answer_id === props.quiz.answers[0].answer_id? 'selected': ''}`}>
                {props.quiz.answers[0].text}
                <button onClick = {() => selectAnswer(props.quiz.answers[0])}>
                {`${selectedAnswer?.answer_id === props.quiz.answers[0].answer_id? 'SELECTED': 'select'}`}
                </button>
              </div>

              <div className={`${selectedAnswer?.answer_id === props.quiz.answers[1].answer_id? 'selected': ''}`}>
              {props.quiz.answers[1].text}
                <button onClick = {() => selectAnswer(props.quiz.answers[1])}>
                {`${selectedAnswer?.answer_id === props.quiz.answers[1].answer_id? 'SELECTED': 'select'}`}
                </button>
              </div>
            </div>

            <button disabled ={isDisabled()} onClick={onSubmit} id="submitAnswerBtn">Submit answer</button>
          </>
        ) : 'Loading next quiz...'
      }
    </div>
  )
}
const mapState =(state) => {
return {quiz: state.quiz, selectedAnswer: state.selectedAnswer}
}

export default connect(mapState, actionCreators)(Quiz)