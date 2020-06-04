import * as React from 'react';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListSubheader from '@material-ui/core/ListSubheader';
import ListItemIcon from '@material-ui/core/ListItemIcon';

import Checkbox from '@material-ui/core/Checkbox';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Dialog from '@material-ui/core/Dialog';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';

import { ModalReadonlyXs } from '../../../components/Modal/';

const options = [
	'None',
	'Atria',
	'Callisto',
	'Dione',
	'Ganymede',
	'Hangouts Call',
	'Luna',
	'Oberon',
	'Phobos',
	'Pyxis',
	'Sedna',
	'Titania',
	'Triton',
	'Umbriel',
];

export interface VariantDialogProps {
	id: string;
	value: string;
	title: string;
	open: boolean;
	onClose: (value?: string) => void;
}


function VariantDialog(props: VariantDialogProps) {
	const { onClose, value: valueProp, open, ...other } = props;
	const [value, setValue] = React.useState(valueProp);
	const radioGroupRef = React.useRef<HTMLElement>(null);

	React.useEffect(() => {
		if (!open) {
			setValue(valueProp);
		}
	}, [valueProp, open]);

	const handleEntering = React.useCallback(() => {
		if (radioGroupRef.current != null) {
			radioGroupRef.current.focus();
		}
	}, [radioGroupRef]);

	const handleCancel = React.useCallback(() => {
		onClose();
	}, [value]);

	const handleOk = React.useCallback(() => {
		onClose(value);
	}, [value]);

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const value = (event.target as HTMLInputElement).value;
		setValue(value);
		console.log(value);
	};

	return (
		<ModalReadonlyXs
			dividers
			title={props.title}
			isOpened={open}
			handleClose={handleCancel}
		>
			<RadioGroup
				ref={radioGroupRef}
				aria-label="ringtone"
				name="ringtone"
				value={value}
				onChange={handleChange}
			>
				{options.map((option) => (
					<FormControlLabel value={option} key={option} control={<Radio />} label={option} />
				))}
			</RadioGroup>
		</ModalReadonlyXs>
	);

	return (
		<Dialog
			disableBackdropClick
			disableEscapeKeyDown
			maxWidth="xs"
			onEntering={handleEntering}
			aria-labelledby="confirmation-dialog-title"
			open={open}
			fullWidth
			{...other}
		>
			<DialogTitle id="confirmation-dialog-title">{props.title}</DialogTitle>
			<DialogContent dividers>
				<RadioGroup
					ref={radioGroupRef}
					aria-label="ringtone"
					name="ringtone"
					value={value}
					onChange={handleChange}
				>
					{options.map((option) => (
						<FormControlLabel value={option} key={option} control={<Radio />} label={option} />
					))}
				</RadioGroup>
			</DialogContent>
			<DialogActions>
				<Button autoFocus onClick={handleCancel} color="primary">
					Закрити
				</Button>
			</DialogActions>
		</Dialog>
	);
}

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			width: '100%',
			maxWidth: 360,
			backgroundColor: theme.palette.background.paper,
		},
		card: {
			maxWidth: '400px',
			marginTop: '0.3em',
			marginRight: '1em',
		},
		paddingBottom0: {
			paddingBottom: 0,
		},
		cardTitle: {
			[theme.breakpoints.down('xs')]: {
				fontSize: '1.1em',
				fontWeight: 600,
			},
		},
	}),
);


export const MessageItemVariant = (props) => {
	const classes = useStyles();
	const [open, setOpen] = React.useState(false);
	const [value, setValue] = React.useState('Dione');

	const handleClickListItem = () => {
		setOpen(true);
	};

	const handleClose = (newValue?: string) => {
		setOpen(false);

		if (newValue) {
			setValue(newValue);
		}
	};

	return (
		<React.Fragment>
			<Typography variant="body2" component="div">
				<Card className={classes.card}>
					<CardContent className={classes.paddingBottom0}>
						<Typography gutterBottom variant="h6" component="h6" className={classes.cardTitle}>
							{props.message.data.title}
						</Typography>
						<Typography gutterBottom variant="body2" color="textSecondary" component="p">
							Будь ласка оберіть варіант
						</Typography>
					</CardContent>
					<CardActions>
						<Button size="small" color="primary" onClick={handleClickListItem}>Обрати варіант</Button>
					</CardActions>
				</Card>
			</Typography>
			<VariantDialog
				id="ringtone-menu"
				open={open}
				onClose={handleClose}
				value={value}
				title={props.message.data.title}
			/>
		</React.Fragment>
	);
}
