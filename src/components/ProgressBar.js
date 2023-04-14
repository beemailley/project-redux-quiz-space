import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'

export const ProgressBar = () => {
  const amountOfQuestions = useSelector((state) => state.quiz.questions.length);
  const question = useSelector((state) => state.quiz.questions[state.quiz.currentQuestionIndex])
  const answers = useSelector((state) => state.quiz.answers)

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="progress-bar">
      <progress value={answers.length} max={amountOfQuestions} />
      <p>{question.id} / {amountOfQuestions}</p>
    </div>
  )
}