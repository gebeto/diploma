import * as React from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Alert from '@material-ui/lab/Alert';

import { ScheduleNextDay } from './ScheduleNextDay'


export const Dashboard = (props) => {
	return (
		<React.Fragment>
			<Typography variant="h4" gutterBottom>
				Доброго дня!
			</Typography>
			<Grid container spacing={2}>
				<Grid item xs={12}>
					<Alert severity="error">Захист дипломної роботи відбудеться онлайн 26.06.2020 о 09:00!</Alert>
				</Grid>
				<Grid item xs={12}>
					<Alert severity="info">Будь ласка оберіть варіант контрольної роботи з предмету!</Alert>
				</Grid>
				<Grid item xs={12} lg={6}>
					<ScheduleNextDay />
				</Grid>
			</Grid>
		</React.Fragment>
	);
};


export default Dashboard;
