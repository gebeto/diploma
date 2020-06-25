import * as React from 'react';
import { connect } from 'react-redux';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import DateRangeIcon from '@material-ui/icons/DateRange';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';

import { ScheduleList } from './ScheduleList';
import { LessonEditModal } from './EditModal';

import { scheduleSlice, loadSchedule } from './slice';


const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		title: {
			// marginBottom: '0.4em',
			marginBottom: '0',
			lineHeight: 1,

			[theme.breakpoints.down('xs')]: {
				fontSize: '3.4em',
			}
		},
		mgb1: {
			marginBottom: '14px',
		}
	}),
);


export const ScheduleRaw = (props) => {
	const classes = useStyles();

	React.useEffect(() => {
		props.loadSchedule();

		return () => {
			props.reset();
		}
	}, []);

	const [ lesson, setLesson ] = React.useState(null);

	const handleEditLessonOpen = (lesson) => {
		setLesson(lesson);
	}

	const handleEditLessonClose = () => {
		setLesson(null);
	}

	return (
		<React.Fragment>
			<Grid container justify="space-between" alignItems="center" className={classes.mgb1}>
				<Grid item xs>
					<Typography variant="h4" className={classes.title}>
						Розклад Занять
					</Typography>
				</Grid>
				<Grid item xs container justify="flex-end">
					<IconButton href={`webcal://${window.location.host}/api/schedule/schedule.ics`} target="_blank">
						<DateRangeIcon color="primary" />
					</IconButton>
				</Grid>
			</Grid>
			<ScheduleList schedule={props.schedule} handleEditLesson={handleEditLessonOpen} />
			{lesson && <LessonEditModal lesson={lesson} handleClose={handleEditLessonClose} isOpened={!!lesson} />}
		</React.Fragment>
	);
};


export const Schedule = connect(
	undefined,
	{ loadSchedule, reset: scheduleSlice.actions.reset }
)(ScheduleRaw);


export default Schedule;
