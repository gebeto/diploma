import * as React from 'react';

import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';

import { AddVariants } from './AddVariants';
import { useModalArray } from '../../../components/Modal/';

import { chatAddMessageVariants } from '../../../api/';


export const MoreChatMenu = (props) => {
	const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
	const [ isAddVariantOpened, handleAddVariantOpenModal, handleAddVariantCloseModal ] = useModalArray();

	const handleClick = React.useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(e.currentTarget);
	}, []);

	const handleClose = React.useCallback(() => {
		setAnchorEl(null);
	}, []);


	const handleAddVariantOpen = React.useCallback(() => {
		handleClose();
		(handleAddVariantOpenModal as any)();
	}, []);

	const handleAddVariantSubmit = React.useCallback((values) => {
		console.log(values);
		props.onMessageSend(
			chatAddMessageVariants({
				chatId: props.chatId,
				// userId: props.user.id,
				title: values.title,
				variants: values.variants
			})
		);
		(handleAddVariantCloseModal as any)();
	}, [props.onMessageSend]);

	return (
		<React.Fragment>
			<IconButton aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
				<MoreHorizIcon />
			</IconButton>
			<Menu
				id="simple-menu"
				anchorEl={anchorEl}
				keepMounted
				open={Boolean(anchorEl)}
				onClose={handleClose}
			>
				<MenuItem onClick={handleAddVariantOpen as any}>Додати вибір варіантів</MenuItem>
			</Menu>
			
			<AddVariants
				isOpened={isAddVariantOpened}
				handleClose={handleAddVariantCloseModal}
				onSubmit={handleAddVariantSubmit}
				onMessageSend={props.onMessageSend}
			/>
		</React.Fragment>
	);
}