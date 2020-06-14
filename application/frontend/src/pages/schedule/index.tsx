import * as React from 'react';
import { connect } from 'react-redux';

import Typography from '@material-ui/core/Typography';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';

import { ScheduleList } from './ScheduleList';
import { LessonEditModal } from './EditModal';

import { scheduleSlice, loadSchedule } from './slice';


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
			<Typography variant="h2" className={classes.title}>
				Розклад Занять
			</Typography>
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
