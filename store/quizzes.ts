import {CaseReducer, createSlice, PayloadAction} from '@reduxjs/toolkit'
import { QuizState } from '../types'

const setQuizzesReducer: CaseReducer<QuizState[], PayloadAction<QuizState[]>> = (state, action) => action.payload
const addToQuizzesReducer: CaseReducer<QuizState[], PayloadAction<QuizState>> = (state, action) => {
	console.log('add to quizzes: ', action.payload)
	return [...state, action.payload]
}

const initialState: QuizState[] | null = []

const quizzesSlice = createSlice({
	name: 'quizzes',
	initialState,
	reducers: {
		setQuizzes: setQuizzesReducer,
		addToQuizzes: addToQuizzesReducer,
	}
})


export const {setQuizzes, addToQuizzes} = quizzesSlice.actions
export default quizzesSlice.reducer