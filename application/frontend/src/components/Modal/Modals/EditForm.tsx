import * as React from 'react';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import { handleDoubleClickPrevent } from './utils';


const createModalEditForm = (maxWidth) => {
	const ModalEditForm = (props) => (
		<Dialog
			fullWidth
			// scroll="body"
			open={props.isOpened}
			onDoubleClick={handleDoubleClickPrevent}
			onExited={props.handleExited}
			onClose={props.handleClose}
			maxWidth={maxWidth}
			disableEscapeKeyDown={props.isLoading}
			disableBackdropClick={props.isLoading}
		>
			<DialogTitle>{props.title}</DialogTitle>
			<DialogContent dividers>
				{props.children}
			</DialogContent>
			<DialogActions>
				<Button onClick={props.handleClose} disabled={props.isLoading} color="secondary">
					Скасувати
				</Button>
				<Button onClick={props.onSubmit} disabled={props.isLoading} color="primary">
					Зберегти
				</Button>
			</DialogActions>
		</Dialog>
	);
	return ModalEditForm;
};


export const ModalEditForm = createModalEditForm("sm");
export const ModalEditFormSm = createModalEditForm("sm");
export const ModalEditFormMd = createModalEditForm("md");
export const ModalEditFormLg = createModalEditForm("lg");
