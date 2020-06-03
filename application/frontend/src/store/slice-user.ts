import { createSlice } from '@reduxjs/toolkit';


export const userSlice = createSlice({
	name: 'user',
	initialState: {
		id: 1,
		firstName: 'Ярослав',
		middleName: 'Володимирович',
		lastName: 'Ничкало',
		token: 'TOKEN',
	},
	reducers: {
		tokenReceived: (state, payload: any) => ({ ...state, token: payload }),
		tokenRemoved: (state, payload: any) => ({ ...state, token: null }),
	}
})