import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IUser } from '../../types/types.ts'

interface UserState {
	user: IUser | null,
	isAuth: boolean
}

const initialState: UserState = {
	user: null,
	isAuth: false
}

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		login: (state, action: PayloadAction<IUser>) => {
			state.user = action.payload
			state.isAuth = true
		},
		logout: (state) => {
			state.user = null
			state.isAuth = false
		}
	}
})

export const { login, logout } = userSlice.actions
export default userSlice.reducer
export type { UserState }