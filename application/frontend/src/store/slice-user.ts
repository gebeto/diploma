import { createSlice } from '@reduxjs/toolkit';


export const userSlice = createSlice({
	name: 'user',
	initialState: {
		firstName: 'Ярослав',
		middleName: 'Володимирович',
		lastName: 'Ничкало',
		token: 'TOKEN',
	},
	reducers: {
		tokenReceived: (state, payload) => ({ ...state, token: payload }),
		tokenRemoved: (state, payload) => ({ ...state, token: null }),
	}
})