import { createSlice } from '@reduxjs/toolkit'

// Change these to your own questions!
const questions = [
  { id: 1, questionText: 'A very famous space epic starts with the opening line: ”A long time ago in a galaxy far, far away….” What is the name of the creator of this epic space opera?', options: ['Luke Skywalker', 'George Lucas', 'George Costanza', 'George Washington'], correctAnswerIndex: 1 },
  { id: 2, questionText: 'The Grant Impact Theory suggests that as a young planet, Earth was hit by another planet called Theia, resulting in what?', options: ['The formation of the Earth’s atmosphere', 'The presence of superheavy elements such as lithium and magnesium', 'The formation of the moon', 'The origins of life on Earth'], correctAnswerIndex: 2 },
  { id: 3, questionText: 'What is the average surface temperature of the sun, in Celsius?', options: ['500 °C', '5,500 °C', '10,500 °C', '20,500 °C'], correctAnswerIndex: 1 },
  { id: 4, questionText: 'Halley’s Comet returns to Earth’s vicinity approximately every…', options: ['50 years', '75 years', '100 years', '200 years'], correctAnswerIndex: 1 },
  { id: 5, questionText: 'Which one of the following names is NOT the name of a galaxy?', options: ['Virgo Cluster', 'Whirlpool', 'Cartwheel', 'Nebulae Serenade'], correctAnswerIndex: 3 },
  { id: 6, questionText: 'What is the name of the constellation that represents a hunter in Greek mythology and is one of the most recognizable constellations in the night sky?', options: ['Orion', 'Cassiopeia', 'Canis Major', 'Ursa Major'], correctAnswerIndex: 0 },
  { id: 7, questionText: 'The Hubble Telescope was launched in 1990.  As of April 2020, it had been in service for 30 years. How long is it estimated to continue to be operational? ', options: ['until 2000', 'until 2025', 'between 2030-2040', 'between 2070-2090'], correctAnswerIndex: 2 },
  { id: 8, questionText: 'The James Webb Space Telescope (JWST) was launched Christmas Day 2021. It is quite a bit larger than the Hubble Telescope.  The JWST is the size of:', options: ['A large dog', 'An elephant', 'A bus', 'A tennis court'], correctAnswerIndex: 3 }
]

const initialState = {
  questions,
  answers: [],
  currentQuestionIndex: 0,
  quizOver: false
}

export const quiz = createSlice({
  name: 'quiz',
  initialState,
  reducers: {

    /**
     * Use this action when a user selects an answer to the question.
     * The answer will be stored in the `quiz.answers` state with the
     * following values:
     *
     *    questionId  - The id of the question being answered.
     *    answerIndex - The index of the selected answer from the question's options.
     *    question    - A copy of the entire question object, to make it easier to show
     *                  details about the question in your UI.
     *    answer      - The answer string.
     *    isCorrect   - true/false if the answer was the one which the question says is correct.
     *
     * When dispatching this action, you should pass an object as the payload with `questionId`
     * and `answerIndex` keys. See the readme for more details.
     */
    submitAnswer: (state, action) => {
      const { questionId, answerIndex } = action.payload
      const question = state.questions.find((q) => q.id === questionId)

      if (!question) {
        throw new Error('Could not find question! Check to make sure you are passing the question id correctly.')
      }

      if (question.options[answerIndex] === undefined) {
        throw new Error(`You passed answerIndex ${answerIndex}, but it is not in the possible answers array!`)
      }

      state.answers.push({
        questionId,
        answerIndex,
        question,
        answer: question.options[answerIndex],
        isCorrect: question.correctAnswerIndex === answerIndex
      })
    },

    /**
     * Use this action to progress the quiz to the next question. If there's
     * no more questions (the user was on the final question), set `quizOver`
     * to `true`.
     *
     * This action does not require a payload.
     */
    goToNextQuestion: (state) => {
      if (state.currentQuestionIndex + 1 === state.questions.length) {
        state.quizOver = true
      } else {
        state.currentQuestionIndex += 1
      }
    },

    /**
     * Use this action to reset the state to the initial state the page had
     * when it was loaded. Who doesn't like re-doing a quiz when you know the
     * answers?!
     *
     * This action does not require a payload.
     */
    restart: () => {
      return initialState
    }

  }
})
