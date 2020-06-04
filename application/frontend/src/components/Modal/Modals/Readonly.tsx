import * as React from 'react';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import { handleDoubleClickPrevent } from './utils';


const createModalReadonly = (maxWidth) => {
	const ModalReadonly = (props) => (
		<Dialog
			fullWidth
			// scroll="body"
			open={props.isOpened}
			onDoubleClick={handleDoubleClickPrevent}
			onExited={props.handleExited}
			onClose={props.handleClose}
			maxWidth={maxWidth}
		>
			<DialogTitle>{props.title}</DialogTitle>
			<DialogContent dividers={props.dividers}>
				{props.children}
			</DialogContent>
			<DialogActions>
				<Button onClick={props.handleClose} color="secondary">
					Закрити
				</Button>
			</DialogActions>
		</Dialog>
	);
	return ModalReadonly;
}


export const ModalReadonly = createModalReadonly("sm");
export const ModalReadonlyXs = createModalReadonly("xs");
export const ModalReadonlySm = createModalReadonly("sm");
export const ModalReadonlyMd = createModalReadonly("md");
export const ModalReadonlyLg = createModalReadonly("lg");
