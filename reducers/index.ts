import { combineReducers } from "redux";
import quizzesReducer from '../store/quizzes'
import resultsReducer from '../store/results'
import userReducer from '../store/user'

export default combineReducers({
	quizzes: quizzesReducer,
	results: resultsReducer,
	user: userReducer,
})