import * as React from 'react';
import { connect } from 'react-redux';

import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';

import { Students } from './Students';

import { studentsSlice } from '../slice';


export const StudentsListRaw = (props) => (
	<Grid container spacing={2} justify="center">
		<Grid item xs={12} md={10} lg={7} xl={7}>
		<Students
			isLoading={props.isLoading}
			students={props.students}
		/>
		</Grid>
	</Grid>
);

export const StudentsList = connect(
	(state, ownProps) => ({
		students: studentsSlice.selectors.itemsSelector(state, ownProps),
		isLoading: state.students.isFetching,
	})
)(StudentsListRaw);