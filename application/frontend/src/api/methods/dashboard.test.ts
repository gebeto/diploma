import { API, ApiClient } from '../utils/ApiClient';

import {
	scheduleGet,
} from './dashboard';

beforeAll(() => {
	API.PREFIX = "http://localhost:8000/api"
});

test("scheduleGet should be authorized", async () => {
	expect(scheduleGet({})).rejects;
});
