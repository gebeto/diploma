import * as React from 'react';
import { connect } from 'react-redux';

import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';

import { ScheduleDay } from './Day';

import { scheduleSlice } from '../slice';


export const ScheduleListRaw = (props) => (
	<Grid container spacing={2} alignItems="center" direction="column">
		{props.isLoading && <CircularProgress />}
		{props.schedule.map(day => (
			<Grid key={day.id} item xs={12} md={10} lg={6} xl={5}>
				<ScheduleDay schedule={day} />
			</Grid>
		))}
	</Grid>
);

const mapStateToPropsFabric = () => {
	const scheduleSelector = scheduleSlice.selectors.makeGetScheduleSelector();
	return (state, ownProps) => ({
		isLoading: state.schedule.isFetching,
		schedule: scheduleSelector(state, ownProps),
	});
}

export const ScheduleList = connect(
	mapStateToPropsFabric,
)(ScheduleListRaw);