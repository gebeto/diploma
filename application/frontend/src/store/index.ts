import { createStore } from 'redux';

const reducer = (state, action) => {
	console.log("Hello state 2");
	return state;
}

export const store = createStore(reducer)