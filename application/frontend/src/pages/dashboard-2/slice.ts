import { batch } from 'react-redux';
import { createCRUDSlice } from '../../store/createCRUDSlice';
import { scheduleGet } from '../../api/';

import { createSelector } from 'reselect';

const createGrouper = (key, arrKey, missing = (i) => {}) => {
	return (curr, item) => {
		if (!curr[item[key]]) {
			curr[item[key]] = missing(item);
		}
		curr[item[key]][arrKey].push(item);
		return curr;
	};
}

const lessonsGrouper = createGrouper("date", "lessons", i => ({ id: i.date, date: i.date, lessons: [] }));

export const scheduleSlice = createCRUDSlice(
	'schedule',
	function extendSelectors(defaultSelectors) {
		return {
			makeGetScheduleSelector: () => createSelector(
				[ defaultSelectors.itemsSelector ],
				(items) => {
					const grouped = items.reduce(lessonsGrouper, {});
					return Object.keys(grouped)
						.map(i => grouped[i]).map(item => ({
							...item,
							date: new Date(item.date),
							lessons: item.lessons.map(i => ({...i, date: new Date(i.date)})).sort((a, b) => a.order - b.order),
						}))
						.sort((a, b) => a.date - b.date);
				}
			),
			
		}
	}
);

export const subjectSlice = createCRUDSlice('subject');
export const academicSlice = createCRUDSlice('academic');
export const pavilionSlice = createCRUDSlice('pavilion');
export const subjectTypeSlice = createCRUDSlice('subjectType');

export const loadSchedule = () => (dispatch) => {
	dispatch(scheduleSlice.actions.fetchingPending());
	scheduleGet({}).then(res => {
		batch(() => {
			dispatch(subjectSlice.actions.loaded(res.subjects));
			dispatch(academicSlice.actions.loaded(res.academics));
			dispatch(pavilionSlice.actions.loaded(res.pavilions));
			dispatch(subjectTypeSlice.actions.loaded(res.subjectTypes));

			const sched = res.schedule.filter(s => {
				const ss = new Date(s.date);
				if (ss.getDate() < (new Date()).getDate()) {
					return false;
				}
				return true;
			})
			dispatch(scheduleSlice.actions.loaded(sched));
			dispatch(scheduleSlice.actions.fetchingSuccess());
		})
	}).catch(err => {
		console.error(err);
		dispatch(scheduleSlice.actions.fetchingError());
	});
}

export const updateLesson = (lesson) => (dispatch) => {
	dispatch(
		scheduleSlice.actions.updated({
			id: lesson.id,
			date: lesson.date,
			order: lesson.order,
			classroom: lesson.classroom,
			type: lesson.type,
		})
	);
};