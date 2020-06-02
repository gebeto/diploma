import * as React from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card';

import { ScheduleDay } from '../schedule/ScheduleList/Day';
// import { createDay } from '../schedule/ScheduleList/helpers';

// const day = createDay("05/24/2020");

const Dashboard = (props) => {
	return (
		<React.Fragment>
			<Typography variant="h4" gutterBottom>
				Доброго дня!
			</Typography>
			<Grid container spacing={2}>
				<Grid item xs={12} lg={6}>
					{/*<ScheduleDay title="Найближчі заняття: 12.04.2020" schedule={day} />*/}
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
