import { API, ApiClient } from '../utils/ApiClient';

import {
	scheduleGet,
	scheduleGetNextDay
} from './schedule';

beforeAll(() => {
	API.PREFIX = "http://localhost:8000/api"
});

test("scheduleGet should be authorized", async () => {
	expect(scheduleGet({} as any)).rejects;
});

test("scheduleGetNextDay should be authorized", async () => {
	expect(scheduleGetNextDay({} as any)).rejects;
});
