import * as React from 'react';


interface UseApiRequestState {
	response: any;
	isFetchingError: boolean;
	isFetching: boolean;
}

const initialState: UseApiRequestState = {
	response: undefined,
	isFetchingError: false,
	isFetching: true,
};

const IS_FETCHING = 'IS_FETCHING';
const SET_RESPONSE = 'SET_RESPONSE';
const UPDATE_RESPONSE = 'UPDATE_RESPONSE';
const FETCHING_PENDING = 'FETCHING_PENDING';
const FETCHING_SUCCESS = 'FETCHING_SUCCESS';
const FETCHING_ERROR = 'FETCHING_ERROR';

interface DispatchWithAction extends React.DispatchWithoutAction {
	type: string;
	payload: any;
}

function reducer(state: any, { type, payload }: DispatchWithAction) {
	switch (type) {
		case IS_FETCHING:
			return {
				...state,
				isFetching: payload,
			};
		case SET_RESPONSE:
			return {
				...state,
				response: payload
			};
		case FETCHING_PENDING:
			return {
				...state,
				isFetchingError: false,
				isFetching: true,
				response: undefined,
			};
		case FETCHING_SUCCESS:
			return {
				...state,
				isFetchingError: false,
				isFetching: false,
				response: payload,
			};
		case FETCHING_ERROR:
			return {
				...state,
				isFetching: false,
				isFetchingError: true,
			};
	}
	return state;
}

export function useApiRequest(requester: any) {
	const [ state, dispatch ] = React.useReducer<React.Reducer<UseApiRequestState, any>>(reducer, initialState);

	const setFetching = React.useCallback((isFetching) => {
		dispatch({type: IS_FETCHING, payload: isFetching});
	}, []);

	const setResponse = React.useCallback((response) => {
		dispatch({type: SET_RESPONSE, payload: response});
	}, []);

	const fetchingSuccess = React.useCallback((response) => {
		dispatch({type: FETCHING_SUCCESS, payload: response});
	}, []);

	const fetchingPending = React.useCallback(() => {
		dispatch({type: FETCHING_PENDING});
	}, []);

	const fetchingError = React.useCallback((e) => {
		dispatch({type: FETCHING_ERROR});
	}, []);

	React.useEffect(() => {
		fetchingPending();
		requester()
			.then(fetchingSuccess)
			.catch(fetchingError);
	}, [ requester ]);

	return {
		state: state,
		setResponse: setResponse,
		setFetching: setFetching,
	}
}


export const makeBasicApiRequest = (requester: any, isFetching = false) => {
	const initState = {
		...initialState,
		isFetching: isFetching,
	};
	return () => {
		const [ state, dispatch ] = React.useReducer<React.Reducer<UseApiRequestState, any>>(reducer, initState);

		const setFetching = React.useCallback((isFetching) => {
			dispatch({type: IS_FETCHING, payload: isFetching});
		}, []);

		const setResponse = React.useCallback((response) => {
			dispatch({type: SET_RESPONSE, payload: response});
		}, []);

		const fetchingSuccess = React.useCallback((response) => {
			dispatch({type: FETCHING_SUCCESS, payload: response});
			return response;
		}, []);

		const fetchingPending = React.useCallback(() => {
			dispatch({type: FETCHING_PENDING});
		}, []);

		const fetchingError = React.useCallback((e) => {
			dispatch({type: FETCHING_ERROR});
			return e;
		}, []);

		const fetch = React.useCallback((...params) => {
			fetchingPending();
			return requester(...params)
				.then(fetchingSuccess)
				.catch(fetchingError);
		}, []);

		return {
			state: state,
			setFetching: setFetching,
			setResponse: setResponse,
			fetch: fetch,
		}
	}
}


export const makeApiRequest = (requester: any) => {
	const useBasicApiReq = makeBasicApiRequest(requester, true);

	return (...params: any) => {
		const state = useBasicApiReq();

		React.useEffect(() => {
			state.fetch(...params);
		}, params);

		const refetch = React.useCallback(() => {
			state.fetch(...params);
		}, params);

		return {
			state: state.state,
			setFetching: state.setFetching,
			setResponse: state.setResponse,
			refetch: refetch,
		}
	}
}
