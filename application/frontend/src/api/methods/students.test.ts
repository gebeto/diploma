import { API, ApiClient } from '../utils/ApiClient';

import {
	studentsGet,
} from './students';

beforeAll(() => {
	API.PREFIX = "http://localhost:8000/api"
});

test("studentsGet should be authorized", async () => {
	expect(studentsGet({} as any)).rejects;
});
