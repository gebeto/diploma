import * as React from 'react';
import { connect } from 'react-redux';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';

import {
	ISubject,
	IAcademic,
	IPavilion,
	ISubjectType,
	IScheduleLesson,
} from '../../../api/';


export interface ScheduleLessonProps {
	lesson: IScheduleLesson;
	subject: ISubject;
	academic: IAcademic;
	pavilion: IPavilion;
	subjectType: ISubjectType;
	handleEditLesson?: any;
}

const orderTimes = {
	1: "8:30 − 10:05",
	2: "10:20 − 11:55",
	3: "12:10 − 13:45",
	4: "14:15 − 15:50",
	5: "16:00 − 17:35",
	6: "17:40 − 19:15",
	7: "19:20 − 20:55",
	8: "21:00 − 22:35",
};

export const ScheduleLessonRaw = (props: ScheduleLessonProps) => {
	const handleClick = () => {
		props.handleEditLesson(props.lesson);
	}

	return (
		<ListItem alignItems="flex-start" button onClick={handleClick}>
			<ListItemAvatar>
				<Avatar>{props.lesson.order}</Avatar>
			</ListItemAvatar>
			<ListItemText
				primary={props.subject.title}
				secondary={
					<React.Fragment>
						<Typography component="span" variant="body2" color="textPrimary">{props.academic.lastName} {props.academic.firstName[0]}.{props.academic.middleName[0]}.</Typography>
						{' '} {orderTimes[props.lesson.order]}
						<br />
						{props.subjectType.title} | {props.pavilion.title} н.к. | {props.lesson.classroom}
					</React.Fragment>
				}
			/>
		</ListItem>
	);
}


export const ScheduleLesson = connect(
	(state, ownProps) => ({
		subject: state.subject.byId[ownProps.lesson.subject],
		academic: state.academic.byId[ownProps.lesson.academic],
		pavilion: state.pavilion.byId[ownProps.lesson.pavilion],
		subjectType: state.subjectType.byId[ownProps.lesson.type],
	})
)(ScheduleLessonRaw);
