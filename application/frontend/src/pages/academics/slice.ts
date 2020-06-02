import { batch } from 'react-redux';
import { createCRUDSlice } from '../../store/createCRUDSlice';
import { academicsGet } from '../../api/';

export const academicsSlice = createCRUDSlice('academics');

export const loadAcademics = () => (dispatch) => {
	dispatch(academicsSlice.actions.fetchingPending());
	academicsGet({}).then(res => {
		batch(() => {
			dispatch(academicsSlice.actions.loaded(res.items));
			dispatch(academicsSlice.actions.fetchingSuccess());
		})
	}).catch(err => {
		console.error(err);
		dispatch(academicsSlice.actions.fetchingError());
	});
}