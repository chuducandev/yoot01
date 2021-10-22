import {CaseReducer, createSlice, PayloadAction} from '@reduxjs/toolkit'
import { QuizState } from '../types'

const setQuizzesReducer: CaseReducer<QuizState[], PayloadAction<QuizState[]>> = (state, action) => action.payload

const initialState: QuizState[] | null = []

const quizzesSlice = createSlice({
	name: 'quizzes',
	initialState,
	reducers: {
		setQuizzes: setQuizzesReducer
	}
})


export const {setQuizzes} = quizzesSlice.actions
export default quizzesSlice.reducer