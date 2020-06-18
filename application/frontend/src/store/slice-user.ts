import { createSlice } from '@reduxjs/toolkit';
import { ApiClient } from '../api/utils/ApiClient';


const initialState = {
	id: undefined,
	first_name: '',
	last_name: '',
	avatar: '',
};

export const userSlice = createSlice({
	name: 'user',
	initialState: initialState,
	reducers: {
		login: (state, action) => ({ ...state, ...action.payload }),
		logout: (state) => (initialState),
	}
});
