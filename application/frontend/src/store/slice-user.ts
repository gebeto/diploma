import { createSlice } from '@reduxjs/toolkit';


export const userSlice = createSlice({
	name: 'user',
	initialState: {
		id: 1,
		firstName: 'Ярослав',
		middleName: 'Володимирович',
		lastName: 'Ничкало',
		avatar: '',
		phone: '',
		email: '',
	},
	reducers: {
		userReceived: (state, action) => ({ ...state, ...action.payload }),
	}
})