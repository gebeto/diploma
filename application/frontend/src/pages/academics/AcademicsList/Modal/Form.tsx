import * as React from 'react';
import { connect } from 'react-redux';

import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';

import { ModalEditFormSm } from '../../../../components/Modal/';
import {
	InputField, BooleanField, TextareaField,
	Form, withForm, withFormModal,
} from '../../../../components/Form/';
import { PhoneAdornment } from './addons';


export const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		small: {
			width: theme.spacing(3),
			height: theme.spacing(3),
		},
		large: {
			width: theme.spacing(12),
			height: theme.spacing(12),
		},
	}),
);


export const AcademicForm = (props) => {
	const classes = useStyles();

	return (
		<Form onSubmit={props.onSubmit} disabled={props.isSubmitting} errorMessage={props.errorMessage}>
			<Grid container spacing={2}>

				<Grid item container xs={12} justify="center">
					{props.academic && props.academic.avatar ?
						<Avatar className={classes.large} src={props.academic.avatar} />
						:
						<Avatar className={classes.large}>Фото</Avatar>
					}
				</Grid>

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
						type="phone"
						name="phone"
						title="Номер телефону"
						InputProps={PhoneAdornment}
					/>
				</Grid>

			</Grid>
		</Form>
	);
}
