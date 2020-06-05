import * as React from 'react';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';

import { ModalAddFormSm } from '../../../../components/Modal/';
import { Form, withForm, withFormModal } from '../../../../components/Form/';

import { AcademicForm } from './Form';


interface AcademicAddModalProps {
	academic: any;
	addAcademic: (academic: any) => any;
	handleClose: () => any;
}


const AcademicAddModalForm = withFormModal<AcademicAddModalProps>(
	ModalAddFormSm,
	"Додавання викладача",
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
			return new Promise(res => res({ success: true }));
		},

		onSuccess(props, data) {
			props.addAcademic(data.item);
			props.handleClose();
		},
	}
)(AcademicForm);

export const AcademicAddModal = connect(
	undefined,
	{
		addAcademic: academic => dispatch => {
			return academic;
		}
	}
)(AcademicAddModalForm);
