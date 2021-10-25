import {CaseReducer, createSlice, PayloadAction} from '@reduxjs/toolkit'
import { UserState } from '../types'

const setUserReducer: CaseReducer<UserState, PayloadAction<UserState>> = (state, action) => action.payload

const initialState: UserState = {}

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setUser: setUserReducer,
	}
})


export const {setUser} = userSlice.actions
export default userSlice.reducer