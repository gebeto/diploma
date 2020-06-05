import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';

import { Navigation, ListItemNavLink } from './Navigation';

test("Navigation is rendering without errors", () => {
	const navigation = render(
		<MemoryRouter>
			<Navigation user={{ firstName: "Yaroslav", lastName: "aNychkalo", avatar: "avatar" } as any}>
				Hello world!
			</Navigation>
		</MemoryRouter>
	);
	expect(navigation.getByText("Yaroslav aNychkalo")).toBeInTheDocument();
});

test("ListItemNavLink is rendering without errors", () => {
	const navigation = render(
		<MemoryRouter>
			<ListItemNavLink to="/test" Icon="span" />
		</MemoryRouter>
	);
});
