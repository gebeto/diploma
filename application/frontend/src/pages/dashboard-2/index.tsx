import * as React from 'react';
import { connect } from 'react-redux';

import Grid from '@material-ui/core/Grid';
import Alert from '@material-ui/lab/Alert';
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
			<Typography variant="h4" gutterBottom>
				Доброго дня!
			</Typography>
			<Grid container spacing={2}>
				<Grid item xs={12}>
					<Alert severity="error">Захист дипломної роботи відбудеться онлайн 26.06.2020 о 09:00!</Alert>
				</Grid>
				{/*<Grid item xs={12}>
					<Alert severity="info">Будь ласка оберіть варіант контрольної роботи з предмету!</Alert>
				</Grid>*/}
				<Grid item xs={12} lg={6}>
					<ScheduleList schedule={props.schedule} handleEditLesson={handleEditLessonOpen} />
				</Grid>
			</Grid>
			{lesson && <LessonEditModal lesson={lesson} handleClose={handleEditLessonClose} isOpened={!!lesson} />}
		</React.Fragment>
	);
};


export const Schedule = connect(
	undefined,
	{ loadSchedule, reset: scheduleSlice.actions.reset }
)(ScheduleRaw);


export default Schedule;
