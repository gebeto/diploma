import { batch } from 'react-redux';
import { createCRUDSlice } from '../../store/createCRUDSlice';
import { scheduleGet } from '../../api/';

import { createSelector } from 'reselect';

export const scheduleSlice = createCRUDSlice(
	'schedule',
	function extendSelectors(defaultSelectors) {
		return {
			makeGetScheduleSelector: () => createSelector(
				[ defaultSelectors.itemsSelector ],
				(items) => items.map(item => ({
					...item,
					date: new Date(item.date),
				}))
			),
			
		}
	}
);


export const loadSchedule = () => (dispatch) => {
	dispatch(scheduleSlice.actions.fetchingPending());
	scheduleGet({}).then(res => {
		batch(() => {
			dispatch(scheduleSlice.actions.loaded(res.items));
			dispatch(scheduleSlice.actions.fetchingSuccess());
		})
	}).catch(err => {
		console.error(err);
		dispatch(scheduleSlice.actions.fetchingError());
	});
}