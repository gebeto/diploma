import { getSchedule } from './index';

test("getSchedule returns array of days", async () => {
	const schedule = await getSchedule();
	expect(schedule.length).toBe(4);
})