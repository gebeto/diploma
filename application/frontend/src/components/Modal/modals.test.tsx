import * as React from 'react';
import { render } from '@testing-library/react';
import { ModalReadonly } from './Modals/Readonly';
import { ModalEditForm } from './Modals/EditForm';
import { ModalAddForm } from './Modals/AddForm';

test("Readonly Modal is rendering without errors", () => {
	const modal = render(
			<ModalReadonly isOpened={true}>
				Hello world!
			</ModalReadonly>
	);
	expect(modal.getByText("Hello world!")).toBeInTheDocument();
});

test("EditForm Modal is rendering without errors", () => {
	const modal = render(
			<ModalEditForm isOpened={true}>
				Hello world!
			</ModalEditForm>
	);
	expect(modal.getByText("Hello world!")).toBeInTheDocument();
});

test("AddForm Modal is rendering without errors", () => {
	const modal = render(
			<ModalAddForm isOpened={true}>
				Hello world!
			</ModalAddForm>
	);
	expect(modal.getByText("Hello world!")).toBeInTheDocument();
});
