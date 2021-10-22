import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import { QuizState } from '../types'

const quizzesSlice = createSlice({
	name: 'quizzes',
	initialState: null,
	reducers: {
		setQuizzes: (state: QuizState[] | null, action: PayloadAction<QuizState[]>) => {
			console.log('In reducer:')
			console.log(action.payload)
			return action.payload
		}
	}
})


export const {setQuizzes} = quizzesSlice.actions
export default quizzesSlice.reducer