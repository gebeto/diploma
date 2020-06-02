import { composeWithDevTools } from 'redux-devtools-extension';
import { configureStore } from '@reduxjs/toolkit';

import { userSlice } from './slice-user';

import { studentsSlice } from '../pages/students/slice';
import { scheduleSlice } from '../pages/schedule/slice';
import { chatSlice } from '../pages/chat/slice';
import { academicsSlice } from '../pages/academics/slice';


export const store = configureStore({
	reducer: {
		user: userSlice.reducer,
		students: studentsSlice.reducer,
		schedule: scheduleSlice.reducer,
		chat: chatSlice.reducer,
		academics: academicsSlice.reducer,
	},
});
