import * as React from 'react';
import { connect } from 'react-redux';

import Typography from '@material-ui/core/Typography';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';

import { ScheduleList } from './ScheduleList';

import { loadSchedule } from './slice';


const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		title: {
			marginBottom: '0.4em',

			[theme.breakpoints.down('xs')]: {
				fontSize: '3.4em',
			}
		},
	}),
);


const ScheduleRaw = (props) => {
	const classes = useStyles();

	React.useEffect(() => {
		props.loadSchedule();
	}, []);

	return (
		<React.Fragment>
			<Typography variant="h2" className={classes.title}>
				Розклад Занять
			</Typography>
			<ScheduleList schedule={props.schedule} />
		</React.Fragment>
	);
};


const Schedule = connect(
	undefined,
	{ loadSchedule }
)(ScheduleRaw);


export default Schedule;
