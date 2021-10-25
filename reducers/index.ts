import { combineReducers } from "redux";
import quizzesReducer from '../store/quizzes'
import resultsReducer from '../store/results'

export default combineReducers({
	quizzes: quizzesReducer,
	results: resultsReducer,
})