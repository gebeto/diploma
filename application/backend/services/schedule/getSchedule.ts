import { academics } from '../academics/academics';
import { subjects } from './subjects';
import { pavilions } from './pavilions';
import { SubjectType } from './types';

export const createDay = (id, date = "08/24/2019") => ({
	id: id,
	date: new Date(date),
	subjects: [
		{
			id: 1,
			order: 1,
			subject: subjects[1],
			academic: academics[0],
			pavilion: pavilions[5],
			type: SubjectType.lecture,
			classroom: "303",
		},
		{
			id: 2,
			order: 2,
			subject: subjects[1],
			academic: academics[0],
			pavilion: pavilions[5],
			type: SubjectType.practice,
			classroom: "303",
		},
		{
			id: 3,
			order: 3,
			subject: subjects[2],
			academic: academics[1],
			pavilion: pavilions[5],
			type: SubjectType.lecture,
			classroom: "303",
		},
		{
			id: 4,
			order: 4,
			subject: subjects[2],
			academic: academics[1],
			pavilion: pavilions[5],
			type: SubjectType.practice,
			classroom: "303",
		},
	]
});

export const createDays = (count) => {
	let id = 1;
	return (new Array(count).fill(1)).map((item, index) => createDay(++id, `08/1${index}/2020`));
}

export const getSchedule = async () => {
	return createDays(4);
}