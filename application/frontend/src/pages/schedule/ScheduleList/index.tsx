import * as React from 'react';
import { connect } from 'react-redux';

import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';

import { ScheduleDay } from './Day';

import { scheduleSlice } from '../slice';

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
	fullWidth: {
		width: "100%",
	}
});


export const ScheduleListRaw = (props: any) => {
	const classes = useStyles();

	return (
		<Grid container spacing={2} alignItems="center" direction="column">
			{props.isLoading && <Grid item xs={12}><CircularProgress /></Grid>}
			{props.schedule.map(day => (
				<Grid className={classes.fullWidth} key={day.id} item xs={12} md={10} lg={6} xl={5}>
					<ScheduleDay schedule={day} handleEditLesson={props.handleEditLesson} />
				</Grid>
			))}
		</Grid>
	);
}

const mapStateToPropsFabric = () => {
	const scheduleSelector = scheduleSlice.selectors.makeGetScheduleSelector();
	return (state: any, ownProps: any) => {
		const schedule = scheduleSelector(state, ownProps);
		return {
			isLoading: state.schedule.isFetching,
			schedule,
		}
	};
}

export const ScheduleList = connect(
	mapStateToPropsFabric,
)(ScheduleListRaw);