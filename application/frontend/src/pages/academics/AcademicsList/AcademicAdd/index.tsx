import * as React from 'react';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';

import { ModalAddFormSm } from '../../../../components/Modal/';
import {
	InputField, BooleanField, TextareaField,
	Form, withForm, withFormModal,
} from '../../../../components/Form/';



export const AcademicAddForm = (props) => {
	return (
		<Form onSubmit={props.onSubmit} disabled={props.isSubmitting} errorMessage={props.errorMessage}>
			<Grid container spacing={2}>

				<Grid item xs={12}>
					<InputField
						values={props.values}
						errors={props.errors}
						onChange={props.handleFieldChange}
						name="firstName"
						title="Ім'я"
					/>
				</Grid>
				<Grid item xs={12}>
					<InputField
						values={props.values}
						errors={props.errors}
						onChange={props.handleFieldChange}
						name="middleName"
						title="По батькові"
					/>
				</Grid>
				<Grid item xs={12}>
					<InputField
						values={props.values}
						errors={props.errors}
						onChange={props.handleFieldChange}
						name="lastName"
						title="Прізвище"
					/>
				</Grid>
				<Grid item xs={12} sm={6}>
					<InputField
						values={props.values}
						errors={props.errors}
						onChange={props.handleFieldChange}
						type="email"
						name="email"
						title="Email"
					/>
				</Grid>
				<Grid item xs={12} sm={6}>
					<InputField
						values={props.values}
						errors={props.errors}
						onChange={props.handleFieldChange}
						type="tel"
						name="phone"
						title="Номер телефону"
					/>
				</Grid>

			</Grid>
		</Form>
	);
}


interface AcademicAddModalProps {
	VendorInfoBlock?: JSX.ElementClass;
	StopBlock?: JSX.ElementClass;
	academic: any;
	addAcademic: (academic: any) => any;
	handleClose: () => any;
}


const AcademicAddFormNew = (props) => (
	<AcademicAddForm
		{...props}
	/>
);


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
			return new Promise(res => res({success: true}));
		},

		onSuccess(props, data) {
			props.addAcademic(data.item);
			props.handleClose();
		},
	}
)(AcademicAddFormNew);

export const AcademicAddModal = connect(
	undefined,
	{
		addAcademic: academic => dispatch => {
			console.log("ADD", academic);
			return academic;
		}
	}
)(AcademicAddModalForm);
