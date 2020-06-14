import { academics } from '../academics/academics';
import { subjects } from './subjects';
import { pavilions } from './pavilions';
import { subjectTypes } from './subjectTypes';

export { academics, subjects, pavilions, subjectTypes };

let id = 0;
export const createLesson = (order, date, subject, academic, pavilion, subjectType, classroom) => {
	return {
		id: ++id,
		order: order,
		date: date,
		subject: subject.id,
		academic: academic.id,
		pavilion: pavilion.id,
		type: subjectType.id,
		classroom: classroom,
	};
}

export const createDay = (date = "08/24/2019") => {
	const d = new Date(date);
	return [
		createLesson(1, d, subjects[1], academics[0], pavilions[5], subjectTypes[0], "303"),
		createLesson(2, d, subjects[1], academics[0], pavilions[5], subjectTypes[1], "303"),
		createLesson(3, d, subjects[2], academics[1], pavilions[5], subjectTypes[0], "303"),
		createLesson(4, d, subjects[2], academics[1], pavilions[5], subjectTypes[1], "303"),
	];
};

export const createDays = (count) => {
	let id = 1;
	const result = [];
	(new Array(count).fill(1))
		.forEach((item, index) => {
			result.push(...createDay(`08/1${index}/2020`))
		});
	return result;
}

const schedule = createDays(4);

export const getSchedule = async () => {
	return schedule;
}

export const getNextScheduleDay = async () => {
	return schedule[-1];
}

