import * as ics from 'ics';

import { subjects } from './subjects';
import { subjectTypes } from './subjectTypes';
import { pavilions } from './pavilions';
import { academics } from '../academics/academics';

import { getSchedule } from './lessons';

const timetable = {
	'1': [8, 30],
	'2': [10, 20],
	'3': [12, 10],
	'4': [14, 15],
	'5': [16, 0],
	'6': [17, 40],
	'7': [19, 20],
	'8': [21, 0],
};

const locations = {
	"303 XXIX н.к.": { lat: 49.8343707, lon: 24.0066812 }
};


const academicName = (academic) => {
	if (!academic) return '';
	return `${academic.lastName} ${academic.firstName} ${academic.middleName}`
}


export function formatLesson(lesson: any) {
	const date = [lesson.date.getFullYear(), lesson.date.getMonth() + 1, lesson.date.getDate()];
	const start = [...date, ...timetable[lesson.order]];
	return {
		start: start,
		duration: { hours: 1, minutes: 35 },
		title: subjects.find(s => s.id === lesson.subject).title,
		location: `${pavilions[lesson.pavilion].title} - ${subjectTypes[lesson.type].title} - ${academicName(academics.find(ac => ac.id === lesson.academic))}`,
		uid: `${subjects.find(s => s.id === lesson.subject).title}-${date.join('-')}-${academicName(academics.find(ac => ac.id === lesson.academic))}-${lesson.order}@nulp.ua`,
		geo: pavilions.find(p => p.id === lesson.pavilion).location,
		categories: ['nulp', 'нулп'],
		status: 'CONFIRMED',
		organizer: { name: 'NULP', email: 'coffice@lpnu.ua' },
	};
}

export function createSchedule(title, schedule) {
	const events = [];
	for (let lesson of schedule) {
		const fLesson = formatLesson(lesson);
		events.push(fLesson);
	}
	const { error, value } = ics.createEvents(events);
	console.log('ERR', error);
	return value.replace('VERSION:2.0', `VERSION:2.0\nX-WR-CALNAME:${title}\nX-APPLE-CALENDAR-COLOR:#E6C800\nUID:nulp-calendar-${title}`);
}

// exports.formatLesson = formatLesson;
// exports.createDay = createDay;
// exports.createSchedule = createSchedule;