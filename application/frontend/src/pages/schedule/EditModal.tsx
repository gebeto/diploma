import * as React from 'react';
import { connect } from 'react-redux';

import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import MenuItem from '@material-ui/core/MenuItem';
import Avatar from '@material-ui/core/Avatar';

import { ModalEditFormSm } from '../../components/Modal/';
import {
	InputField, BooleanField, TextareaField, SelectField,
	Form, withForm, withFormModal,
} from '../../components/Form/';

import { lessonUpdate } from '../../api/';
import { updateLesson, subjectTypeSlice } from './slice';


export const useStyles = makeStyles((theme: Theme) =>
	createStyles({

	}),
);


const TypeSelect = connect(
	state => ({
		subjectTypes: subjectTypeSlice.selectors.itemsSelector(state, {}),
	})
)((props) => {
	return (
		<SelectField
			values={props.values}
			errors={props.errors}
			onChange={props.handleFieldChange}
			name={props.name}
			title={props.title}
		>
			{props.subjectTypes.map(st =>
				<MenuItem key={st.id} value={st.id}>{st.title}</MenuItem>
			)}
		</SelectField>
	);
})


export const LessonForm = (props) => {
	const classes = useStyles();

	return (
		<Form onSubmit={props.onSubmit} disabled={props.isSubmitting} errorMessage={props.errorMessage}>
			<Grid container spacing={2}>

				<Grid item xs={12}>
					<InputField
						values={props.values}
						errors={props.errors}
						onChange={props.handleFieldChange}
						type="text"
						name="date"
						title="Дата"
					/>
				</Grid>
				<Grid item xs={12}>
					<InputField
						values={props.values}
						errors={props.errors}
						onChange={props.handleFieldChange}
						type="number"
						name="order"
						title="Номер пари"
					/>
				</Grid>
				<Grid item xs={12}>
					<InputField
						values={props.values}
						errors={props.errors}
						onChange={props.handleFieldChange}
						type="number"
						name="classroom"
						title="Кабінет"
					/>
				</Grid>
				<Grid item xs={12}>
					<TypeSelect
						values={props.values}
						errors={props.errors}
						handleFieldChange={props.handleFieldChange}
						name="type"
						title="Тип"
					/>
				</Grid>

			</Grid>
		</Form>
	);
}


interface LessonEditModalProps {
	lesson: any;
	updateLesson: (lesson: any) => any;
	handleClose: () => any;
}


const LessonEditModalForm = withFormModal<LessonEditModalProps>(
	ModalEditFormSm,
	props => props.lesson ? `${props.lesson.date} ${props.lesson.order}` : 'Предмет',
	{	
		defaultValues(props) {
			return {
				...props.lesson,
			};
		},

		beforeSubmit(values, props) {
			return {
				...values,
			};
		},

		onAsyncSubmit(values, props) {
			return lessonUpdate(values);
			// return Promise.resolve({
			// 	success: true,
			// 	item: {
			// 		...props.lesson,
			// 		order: Number(values.order),
			// 		classroom: values.classroom,
			// 		date: values.date,
			// 	}
			// });
		},

		onSuccess(props, data) {
			props.updateLesson(data.item);
			props.handleClose();
		},
	}
)(LessonForm);

export const LessonEditModal = connect(
	undefined,
	{ updateLesson }
)(LessonEditModalForm);
