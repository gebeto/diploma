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

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';

import { VariantDialog } from './VariantModal';

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
			// marginRight: '1em',
		},
		paddingBottom0: {
			paddingBottom: 0,
		},
		cardTitle: {
			[theme.breakpoints.down('xs')]: {
				fontSize: '1.2em',
				fontWeight: 600,
			},
		},
	}),
);


export const MessageItemVariant = (props) => {
	const classes = useStyles();
	const [open, setOpen] = React.useState(false);

	const handleOpenModal = React.useCallback(() => {
		setOpen(true);
	}, []);

	const handleCloseModal = React.useCallback(() => {
		setOpen(false);
	}, []);

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
						<Button size="small" color="primary" onClick={handleOpenModal}>Обрати варіант</Button>
					</CardActions>
				</Card>
			</Typography>
			{open && <VariantDialog
				id="ringtone-menu"
				open={open}
				onClose={handleCloseModal}
				title={props.message.data.title}
				variantsId={props.message.data.id}
			/>}
		</React.Fragment>
	);
}
