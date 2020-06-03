import * as React from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card';
import CircularProgress from '@material-ui/core/CircularProgress';

import { ScheduleDay } from '../schedule/ScheduleList/Day';
import { formatDate } from '../schedule/ScheduleList/helpers';
// import { createDay } from '../schedule/ScheduleList/helpers';

import { scheduleGetNextDay } from '../../api/';
import { makeApiRequest } from '../../api/utils';

// const day = createDay("05/24/2020");

const useApiRequest = makeApiRequest(async () => {
	const result = await scheduleGetNextDay({});
	const item = result.item;
	return { ...item, date: new Date(item.date) };
});

const ScheduleNextDay = () => {
	const req = useApiRequest();

	if (req.state.isFetching) {
		return <CircularProgress />;
	}

	return <ScheduleDay title={`Найближчі заняття: ${formatDate(req.state.response.date)}`} schedule={req.state.response} />;
}

const Dashboard = (props) => {
	return (
		<React.Fragment>
			<Typography variant="h4" gutterBottom>
				Доброго дня!
			</Typography>
			<Grid container spacing={2}>
				<Grid item xs={12} lg={6}>
					<ScheduleNextDay />
				</Grid>
			</Grid>
		</React.Fragment>
	);
};

Dashboard.reducer = (state: any, action: any) => {
	console.log('Dashboard reducer');
	return state;
};

export default Dashboard;
