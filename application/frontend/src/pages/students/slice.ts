import { batch } from 'react-redux';
import { createCRUDSlice } from '../../store/createCRUDSlice';
import { studentsGet } from '../../api/';

export const studentsSlice = createCRUDSlice('students');

export const loadStudents = () => (dispatch) => {
	dispatch(studentsSlice.actions.fetchingPending());
	studentsGet({}).then(res => {
		batch(() => {
			dispatch(studentsSlice.actions.loaded(res.items));
			dispatch(studentsSlice.actions.fetchingSuccess());
		})
	}).catch(err => {
		console.error(err);
		dispatch(studentsSlice.actions.fetchingError());
	});
}