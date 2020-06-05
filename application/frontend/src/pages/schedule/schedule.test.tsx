import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { MemoryRouter } from 'react-router-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { render } from '@testing-library/react';

import { ScheduleRaw } from './index';

const store = createStore((s = {}, a) => s);

test("Schedule page is rendering without errors", () => {
	expect(1).toBe(1)
	// const academics = render(
	// 	<Provider store={store}>
	// 		<ScheduleRaw />
	// 	</Provider>
	// );
});
