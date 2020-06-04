import * as React from 'react';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import TextField from '@material-ui/core/TextField';
import InputBase from '@material-ui/core/InputBase';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Paper from '@material-ui/core/Paper';

import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';

import { ModalAddFormSm, useModalArray } from '../../../components/Modal/';

interface IVariant {
	title: string;
}

interface IAddVariantState {
	title: string;
	variants: IVariant[];
}

const initialState = {
	title: 'Лабораторна робота №1',
	variants: [
		{ title: "Варіант 1" },
		{ title: "Варіант 2" },
	],
}

const CHANGE_TITLE = "CHANGE_TITLE";
const CHANGE_VARIANT = "CHANGE_VARIANT";
const ADD_VARIANT = "ADD_VARIANT";
const REMOVE_VARIANT = "REMOVE_VARIANT";

const reducer = (state, action) => {
	switch (action.type) {
		case CHANGE_TITLE:
			return { ...state, title: action.payload };
		case CHANGE_VARIANT:
			return {
				...state,
				variants: state.variants.map((item, index) => index === action.payload.index ? { ...item, title: action.payload.value } : item),
			};
		case ADD_VARIANT:
			return {
				...state,
				variants: [
					...state.variants,
					{ title: `Варіант ${state.variants.length + 1}` }
				]
			};
		case REMOVE_VARIANT:
			return {
				...state,
				variants: state.variants.filter((item, index) => index === action.payload ? false : true)
			};
	}
	return state;
}

const variantIndexRegEx = /variant\[(\d+)\]/;

const IndexedInput = (props) => {
	const handleChange = React.useCallback((e) => {
		props.onChange(props.index, e.target.value);
	}, [props.index]);

	return (
		<InputBase
			value={props.value}
			onChange={handleChange}
		/>
	);
}

const IndexedIconButton = (props) => {
	const handleClick = React.useCallback((e) => {
		props.onClick(props.index);
	}, [props.index]);

	return (
		<IconButton onClick={handleClick}>
			{props.children}
		</IconButton>
	);
}

export const AddVariants = (props) => {
	const [ state, dispatch ] = React.useReducer<React.Reducer<IAddVariantState, any>>(reducer, initialState);

	const onSubmit = React.useCallback(() => {
		props.onSubmit(state);
	}, [state]);

	const handleTitleChange = React.useCallback((e) => {
		dispatch({ type: CHANGE_TITLE, payload: e.target.value });
	}, [])

	const handleVariantChange = React.useCallback((index, value) => {
		dispatch({ type: CHANGE_VARIANT, payload: { index, value } });
	}, []);

	const handleVariantRemove = React.useCallback((index) => {
		dispatch({ type: REMOVE_VARIANT, payload: index });
	}, []);

	const handleVariantAdd = React.useCallback((e) => {
		dispatch({ type: ADD_VARIANT });
	}, []);

	return (
		<ModalAddFormSm isOpened={props.isOpened} handleClose={props.handleClose} onSubmit={onSubmit}>
			<Grid container spacing={2}>
				<Grid item xs={12}>
					<TextField
						name="title"
						fullWidth
						label="Назва"
						variant="outlined"
						value={state.title}
						onChange={handleTitleChange}
					/>
				</Grid>
				<Grid item xs={12}>
					<Paper variant="outlined">
						<List>
							{state.variants.map((variant, index) =>
								<ListItem key={index} button>
									<IndexedInput value={variant.title} index={index} onChange={handleVariantChange} />
									<ListItemSecondaryAction>
										<IndexedIconButton index={index} onClick={handleVariantRemove}>
											<DeleteIcon />
										</IndexedIconButton>
									</ListItemSecondaryAction>
								</ListItem>
							)}
							<ListItem button onClick={handleVariantAdd}>
								<IconButton size="small">
									<AddIcon fontSize="small" />
								</IconButton>
							</ListItem>
						</List>
					</Paper>
				</Grid>
			</Grid>
		</ModalAddFormSm>
	);
}

