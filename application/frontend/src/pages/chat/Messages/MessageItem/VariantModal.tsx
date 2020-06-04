import * as React from 'react';
import { connect } from 'react-redux';

import Grid from '@material-ui/core/Grid';
import Checkbox from '@material-ui/core/Checkbox';
import RadioGroup from '@material-ui/core/RadioGroup';
import Radio from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import CircularProgress from '@material-ui/core/CircularProgress';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';

import { ModalReadonlyXs } from '../../../../components/Modal/';
import { chatGetVariants } from '../../../../api/';
import { makeApiRequest } from '../../../../api/utils';


const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		absoluteCenter: {
			position: 'absolute',
			left: '50%',
			top: '50%',
			marginLeft: -12,
			marginTop: -12,
		},
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

export const VariantDialogRaw = (props: VariantDialogProps) => {
	const classes = useStyles();
	const [ value, setValue ] = React.useState(null);
	const radioGroupRef = React.useRef<HTMLElement>(null);

	const [ selecting, setSelecting ] = React.useState(false);
 	const variants = useVariantsApiRequest(props.variantsId);

	const handleCancel = React.useCallback(() => {
		props.onClose();
	}, [value]);

	const handleChange = React.useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
		const value = Number((event.target as HTMLInputElement).value);
		setValue(Number(value));
		setSelecting(true);
		setTimeout(() => {
			setSelecting(false);
		}, 2000);
	}, [props.variantsId]);

	return (
		<ModalReadonlyXs
			dividers
			title={props.title}
			isOpened={props.open}
			handleClose={handleCancel}
		>
			<RadioGroup
				ref={radioGroupRef}
				aria-label="ringtone"
				name="ringtone"
				value={value}
				onChange={handleChange}
			>
				{variants.state.isFetching ? <Grid container justify="center"><CircularProgress /></Grid> : variants.state.response.variants.map((option) => (
					<FormControlLabel key={option.id} value={option.id} control={<Radio disabled={!!option.selectedBy || selecting} />} label={option.title} />
				))}
				{selecting && <CircularProgress className={classes.absoluteCenter} />}
			</RadioGroup>
		</ModalReadonlyXs>
	);
}


export const VariantDialog = connect(
	(state) => ({
		user: state.user,
	})
)(VariantDialogRaw);
