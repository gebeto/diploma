import * as React from 'react';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';

import { IScheduleSubject } from '../../../api/';


export interface ScheduleSubjectProps {
	subject: IScheduleSubject;
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

export const ScheduleSubject = (props: ScheduleSubjectProps) => {
	return (
		<ListItem alignItems="flex-start" button>
			<ListItemAvatar>
				<Avatar>{props.subject.order}</Avatar>
			</ListItemAvatar>
			<ListItemText
				primary={props.subject.title}
				secondary={
					<React.Fragment>
						<Typography component="span" variant="body2" color="textPrimary">{props.subject.academic}</Typography>
						{' '} {orderTimes[props.subject.order]}
						<br />
						{props.subject.type} | {props.subject.pavilion} н.к. | {props.subject.classroom}
					</React.Fragment>
				}
			/>
		</ListItem>
	);
}
