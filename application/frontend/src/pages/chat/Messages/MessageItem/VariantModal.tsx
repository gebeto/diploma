import * as React from 'react';
import { connect } from 'react-redux';

import Grid from '@material-ui/core/Grid';
import Checkbox from '@material-ui/core/Checkbox';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import Avatar from '@material-ui/core/Avatar';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import CircularProgress from '@material-ui/core/CircularProgress';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';

import { useSocket } from "use-socketio";

import { ModalReadonlyXs } from '../../../../components/Modal/';
import { chatGetVariants, chatVariantMark } from '../../../../api/';
import { makeBasicApiRequest, makeApiRequest } from '../../../../api/utils';


const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		absoluteCenter: {
			position: 'absolute',
			left: '50%',
			top: '50%',
			marginLeft: -12,
			marginTop: -12,
		},
		smallAvatar: {
			// width: theme.spacing(2),
			// height: theme.spacing(2),
			width: '24px',
			height: '24px',
			// marginRight: theme.spacing(1),
			// marginLeft: theme.spacing(1),
		},
		padding9px: {
			padding: "9px",
		}
	}),
);

export interface VariantDialogProps {
	id: string;
	title: string;
	variantsId: number;
	user: any;
	open: boolean;
	onClose: () => void;
}

const useVariantsApiRequest = makeApiRequest(async (variantsId: number) => {
	const response = await chatGetVariants({ variantsId });
	return response.item;
});

const useVariantsSelectingApiRequest = makeBasicApiRequest(async (variantsId: number, variantId: number) => {
	const response = await chatVariantMark({ variantsId, variantId });
	return response.item;
});

export const VariantDialogRaw = (props: VariantDialogProps) => {
	const classes = useStyles();
	const [ value, setValue ] = React.useState(null);
	const radioGroupRef = React.useRef<HTMLElement>(null);

 	const variants = useVariantsApiRequest(props.variantsId);
 	const variantsSelecting = useVariantsSelectingApiRequest();

	const handleChange = React.useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
		const value = Number((event.target as HTMLInputElement).value);
		setValue(Number(value));
		variantsSelecting.fetch(variants.state.response.id, value).then(res => {
			variants.setResponse(res);
			setValue(null);
		});
	}, [props.variantsId, variants.state]);

	const variantsIO = useSocket(`variants ${props.variantsId}`, newVariants => {
		variants.setResponse(newVariants);
	});

	return (
		<ModalReadonlyXs
			dividers
			title={props.title}
			isOpened={props.open}
			handleClose={props.onClose}
		>
			<RadioGroup
				ref={radioGroupRef}
				aria-label="ringtone"
				name="ringtone"
				value={value}
				onChange={handleChange}
			>
				{variants.state.isFetching ? <Grid container justify="center"><CircularProgress /></Grid> : variants.state.response.variants.map((option) => (
					<FormControlLabel
						key={option.id}
						value={option.id}
						label={option.title}
						control={
							option.selectedBy ?
							<IconButton disabled={variantsSelecting.state.isFetching} className={classes.padding9px}>
								<Tooltip title={`${option.selectedBy.firstName} ${option.selectedBy.lastName}`} placement="right">
									<Avatar className={classes.smallAvatar} src={option.selectedBy.avatar} />
								</Tooltip>
							</IconButton>
							:
							<Radio disabled={variantsSelecting.state.isFetching} />
						}
					/>
				))}
				{variantsSelecting.state.isFetching && <CircularProgress className={classes.absoluteCenter} />}
			</RadioGroup>
		</ModalReadonlyXs>
	);
}


export const VariantDialog = connect(
	(state) => ({
		user: state.user,
	})
)(VariantDialogRaw);
