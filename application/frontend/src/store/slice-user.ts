import { createSlice } from '@reduxjs/toolkit';

const getUser = () => {
	const us = localStorage.getItem("user");
	if (us) {
		return JSON.parse(us);
	}
	return null;
}

const saveUser = (user) => {
	localStorage.setItem("user", JSON.stringify(user));
	return user;
}

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
		...getUser(),
	},
	reducers: {
		userReceived: (state, action) => saveUser({ ...state, ...action.payload }),
	}
})