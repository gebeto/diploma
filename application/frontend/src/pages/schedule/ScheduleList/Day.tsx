import * as React from 'react';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import ListSubheader from '@material-ui/core/ListSubheader';

import { IScheduleDay } from '../../../api/';
import { ScheduleLesson } from './Lesson';
import { formatDate } from './helpers';


const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			width: '100%',
			// maxWidth: '36ch',
			// marginBottom: '1em',
			backgroundColor: theme.palette.background.paper,
		},
		inline: {
			display: 'inline',
		},
		subheader: {
			fontSize: '24px',
		}
	}),
);



export interface ScheduleDayProps {
	schedule: IScheduleDay;
	title?: string;
}


const today = new Date();

export const ScheduleDay = (props: ScheduleDayProps) => {
	const classes = useStyles();

	return (
		<List
			className={classes.root}
			subheader={
				<ListSubheader className={classes.subheader} component="div">
					<Typography variant="inherit" color={props.schedule.date >= today ? "primary" : "secondary"}>
						{props.title || formatDate(props.schedule.date)}
					</Typography>
				</ListSubheader>
			}
		>
			{props.schedule.lessons.map(lesson => (
				<ScheduleLesson
					key={lesson.id}
					lesson={lesson}
				/>
			))}
		</List>
	);
};
