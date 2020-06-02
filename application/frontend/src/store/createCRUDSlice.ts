import { createSlice, createAction, PayloadAction } from '@reduxjs/toolkit';
import { createSelector, Selector, OutputParametricSelector } from 'reselect';


type RecordType = {
	id: number;
	[key: string]: any;
};


export const mapIdsToObj = (ids: number[], obj: RecordType) => ids.map(id => obj[id]);
export const getById = (obj: RecordType, id: number) => obj[id];
export const getId = (state, props) => props.id as number;

type DefaultGetter = (state: any, props: any) => any;
type DefaultSelector = OutputParametricSelector<any, any, any, any>;

interface DefaultSelectors {
	getObj: DefaultGetter;
	getIds: DefaultGetter;
	itemsSelector: DefaultSelector;
	itemSelector: DefaultSelector;
}

const emptyAdditionalSelectors = (selectors: DefaultSelectors) => {
	return {} as any;
};


function createCRUDSlice<AdditionalSelectors>(
	sliceName,
	additionalSelectorsGenerator: (selectors: DefaultSelectors) => AdditionalSelectors = emptyAdditionalSelectors,
) {
	type InitialStateType = {
		byId: Record<number, RecordType>;
		ids: Array<number>;
		isFetching: boolean;
		isFetchingError: boolean;
	}

	const initialState: InitialStateType = {
		byId: {},
		ids: [],
		isFetching: false,
		isFetchingError: false,
	};

	const slice = createSlice({
		name: sliceName,
		initialState: initialState,
		reducers: {
			loaded: (state, { payload }) => {
				const ids = payload.map(item => item.id);
				const byId = payload.reduce((obj, item) => ({
					...obj,
					[item.id]: item,
				}), {});

				return {
					...state,
					byId: byId,
					ids: ids,
				};
			},
			concatenated: (state, { payload }) => {
				const ids = payload.map(item => item.id);
				const byId = payload.reduce((obj, item) => ({
					...obj,
					[item.id]: item,
				}), {});

				return {
					...state,
					byId: {...state.byId, ...byId},
					ids: [...state.ids, ...ids],
				};
			},
			added: (state, { payload }) => {
				return {
					...state,
					ids: [payload.id, ...state.ids],
					byId: {
						...state.byId,
						[payload.id]: payload,
					}
				};
			},
			removed: (state, { payload }) => {
				const index = state.ids.findIndex(item => item === payload.id);
				state.ids.splice(index, 1);
				delete state.byId[payload.id];
				return state;
			},
			updated: (state, { payload }) => {
				return {
					...state,
					byId: {
						...state.byId,
						[payload.id]: {
							...state.byId[payload.id],
							...payload,
						}
					}
				};
			},
			reset: (state) => {
				return initialState;
			},
			fetchingPending: (state) => {
				return {
					...state,
					isFetching: true,
				};
			},
			fetchingSuccess: (state) => {
				return {
					...state,
					isFetching: false,
				};
			},
			fetchingError: (state) => {
				return {
					...state,
					isFetching: false,
					isFetchingError: true,
				};
			},
		},
	});

	const getObj = (state, props) => state[sliceName].byId;
	const getIds = (state, props) => state[sliceName].ids;
	const itemsSelector = createSelector([getIds, getObj], mapIdsToObj);
	const itemSelector = createSelector([getObj], getById);

	const defaultSelectors: DefaultSelectors = { getObj, getIds, itemsSelector, itemSelector };
	const additionalSelectors = additionalSelectorsGenerator(defaultSelectors);

	const newSlice = {
		...slice,
		selectors: { ...defaultSelectors, ...additionalSelectors }
	};

	return newSlice;
}


export { createCRUDSlice };
