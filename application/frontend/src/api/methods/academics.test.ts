import { API, ApiClient } from '../utils/ApiClient';

import {
	academicsGet,
	academicsAdd,
	academicsUpdate,
} from './academics';

beforeAll(() => {
	API.PREFIX = "http://localhost:8000/api"
});

test("academicsGet should be authorized", async () => {
	expect(academicsGet({})).rejects;
});

test("academicsAdd should be authorized", async () => {
	expect(academicsAdd({})).rejects;
});

test("academicsUpdate should be authorized", async () => {
	expect(academicsUpdate({})).rejects;
});
