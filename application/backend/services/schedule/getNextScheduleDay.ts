import { createDay } from './getSchedule';

export const getNextScheduleDay = async () => {
	return createDay(1, (new Date()).toISOString());
}