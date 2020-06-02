import * as React from 'react';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import ListSubheader from '@material-ui/core/ListSubheader';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar';
import Hidden from '@material-ui/core/Hidden';
import Grid from '@material-ui/core/Grid';
import PersonAddIcon from '@material-ui/icons/PersonAdd';

import CallIcon from '@material-ui/icons/Call';
import EmailIcon from '@material-ui/icons/Email';
import ChatIcon from '@material-ui/icons/Chat';


import { format } from 'date-fns';

import { AcademicEditModal } from './AcademicEdit/';
import { AcademicAddModal } from './AcademicAdd/';
// import { ButtonModal } from 'studpost/component/ButtonModal';
import { ButtonModal } from '../../../components/ButtonModal';
import { useModalArray } from '../../../components/Modal/';


export const AcademicAddButtonModal = (props) => {
	const [ isModalOpened, handleModalOpen, handleModalClose ] = useModalArray();

	return (
		<React.Fragment>
			<IconButton color="primary" component="span" onClick={handleModalOpen as any}>
				<PersonAddIcon />
			</IconButton>
			<AcademicAddModal isOpened={isModalOpened} handleClose={handleModalClose} />
		</React.Fragment>
	);
}



const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			width: '100%',
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


export interface IAcademic {
	id: number;
	firstName: string;
	lastName: string;
	phone: string;
	email: string;
}


export interface AcademicProps {
	academic: IAcademic;
}


export const Academic = (props: AcademicProps) => {
	const [ isOpened, handleOpen, handleClose ] = useModalArray();

	return (
		<React.Fragment>
			<AcademicEditModal academic={props.academic} isOpened={isOpened} handleClose={handleClose} />
			<ListItem alignItems="flex-start" button onClick={handleOpen as any}>
				<ListItemAvatar>
					<Avatar>SN</Avatar>
				</ListItemAvatar>
				<ListItemText
					primary={`${props.academic.firstName} ${props.academic.lastName}`}
					secondary={
						<React.Fragment>
							<Typography component="span" variant="body2" color="textPrimary">{props.academic.email}</Typography>
							<br />
							<span>{props.academic.phone}</span>
						</React.Fragment>
					}
				/>
				<Hidden xsDown implementation="css">
					<ListItemSecondaryAction>
						<IconButton href={`tel:${props.academic.phone}`} edge="end" aria-label="call">
							<CallIcon />
						</IconButton>
						<IconButton edge="end" aria-label="chat">
							<ChatIcon />
						</IconButton>
						<IconButton href={`mailto:${props.academic.email}`} edge="end" aria-label="email">
							<EmailIcon />
						</IconButton>
					</ListItemSecondaryAction>
				</Hidden>
			</ListItem>
		</React.Fragment>
	);
}


export interface AcademicsProps {
	academics: IAcademic[];
}

export const Academics = (props: AcademicsProps) => {
	const classes = useStyles();

	return (
		<List
			className={classes.root}
			subheader={
				<ListSubheader className={classes.subheader} component="div">
					<Grid container justify="space-between" alignContent="center">
						<span>Викладачі</span>
						<AcademicAddButtonModal />
						{/*<IconButton><PersonAddIcon /></IconButton>*/}
					</Grid>
				</ListSubheader>
			}
		>
			{props.academics.map(academic => (
				<Academic
					key={academic.id}
					academic={academic}
				/>
			))}
		</List>
	);
};
