import { combineReducers } from "redux";
import quizzesReducer from '../store/quizzes'

export default combineReducers({
	quizzes: quizzesReducer,
})