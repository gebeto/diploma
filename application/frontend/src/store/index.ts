import { composeWithDevTools } from 'redux-devtools-extension';
import { configureStore } from '@reduxjs/toolkit';

import { ApiClient } from '../api/utils/ApiClient';

import { userSlice } from './slice-user';

import { studentsSlice } from '../pages/students/slice';
import { chatSlice } from '../pages/chat/slice';
import { academicsSlice } from '../pages/academics/slice';

import { scheduleSlice } from '../pages/schedule/slice';
import { subjectSlice } from '../pages/schedule/slice';
import { academicSlice } from '../pages/schedule/slice';
import { pavilionSlice } from '../pages/schedule/slice';
import { subjectTypeSlice } from '../pages/schedule/slice';


export const store = configureStore({
	reducer: {
		[userSlice.name]: userSlice.reducer,
		[studentsSlice.name]: studentsSlice.reducer,
		[chatSlice.name]: chatSlice.reducer,
		[academicsSlice.name]: academicsSlice.reducer,

		[scheduleSlice.name]: scheduleSlice.reducer,
		[subjectSlice.name]: subjectSlice.reducer,
		[academicSlice.name]: academicSlice.reducer,
		[pavilionSlice.name]: pavilionSlice.reducer,
		[subjectTypeSlice.name]: subjectTypeSlice.reducer,
	},
});


(window as any).__STORE = store;


ApiClient.onAuthorized((client) => {
   store.dispatch(userSlice.actions.login(client.getUser()));
});

ApiClient.onUnauthorized((client) => {
   store.dispatch(userSlice.actions.logout());
});


(window as any).updateSchedule = (schedule) => {
	store.dispatch(scheduleSlice.actions.updated(schedule));
};
(window as any).getSchedule = () => {
	return scheduleSlice.selectors.itemsSelector(store.getState(), {});
};

