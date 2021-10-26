import {CaseReducer, createSlice, PayloadAction} from '@reduxjs/toolkit'
import { ResultsState } from '../types'

const resetResultsReducer: CaseReducer<ResultsState, PayloadAction<ResultsState>> = (state, action) => action.payload
const addToResultsReducer: CaseReducer<ResultsState, PayloadAction<ResultsState>> = (state, action) => state + action.payload

const initialState: ResultsState = 0

const resultsSlice = createSlice({
	name: 'results',
	initialState,
	reducers: {
		resetResults: resetResultsReducer,
		addToResults: addToResultsReducer,
	}
})


export const {resetResults, addToResults} = resultsSlice.actions
export default resultsSlice.reducer