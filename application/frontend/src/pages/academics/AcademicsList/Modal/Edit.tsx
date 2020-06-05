import * as React from 'react';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';

import { ModalEditFormSm } from '../../../../components/Modal/';
import { Form, withForm, withFormModal } from '../../../../components/Form/';

import { AcademicForm } from './Form';


interface AcademicEditModalProps {
	academic: any;
	updateAcademic: (academic: any) => any;
	handleClose: () => any;
}


const AcademicEditModalForm = withFormModal<AcademicEditModalProps>(
	ModalEditFormSm,
	props => `${props.academic.firstName} ${props.academic.lastName}`,
	{	
		defaultValues(props) {
			return {
				...props.academic,
			};
		},

		beforeSubmit(values, props) {
			return {
				...values,
			};
		},

		onAsyncSubmit(values) {
			return new Promise(res => res({ success: true, item: "HELLO" }));
		},

		onSuccess(props, data) {
			props.updateAcademic(data.item);
			props.handleClose();
		},
	}
)(AcademicForm);

export const AcademicEditModal = connect(
	undefined,
	{
		updateAcademic: academic => dispatch => {
			return academic;
		}
	}
)(AcademicEditModalForm);
