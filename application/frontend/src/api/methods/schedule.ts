import { API_POST, API_POST_FAKE, ResponseAll } from "../utils";


export interface IScheduleSubject {
	id: number;
	title: string;
	order: number;
	academic: string;
	type: string;
	pavilion: string;
	classroom: string;
}

export interface IScheduleDay {
	id: number;
	date: Date;
	subjects: IScheduleSubject[];
}


let id = 0;

export const createDay = (date = "08/24/2019") => ({
	id: ++id,
	// date: new Date(date),
	date: date,
	subjects: [
		{
			id: 1,
			order: 1,
			title: "Архітектура і проектування програмного забезпечення",
			academic: "Фоменко А.В.",
			pavilion: "XXIX",
			type: "лекція",
			classroom: "303",
		},
		{
			id: 2,
			order: 2,
			title: "Архітектура і проектування програмного забезпечення",
			academic: "Фоменко А.В.",
			pavilion: "XXIX",
			type: "лекція",
			classroom: "303",
		},
		{
			id: 3,
			order: 3,
			title: "Менеджмент проектів з розробки програмного забезпечення",
			academic: "Федорчук Є.Н.",
			pavilion: "XXIX",
			type: "лекція",
			classroom: "303",
		},
		{
			id: 4,
			order: 4,
			title: "Менеджмент проектів з розробки програмного забезпечення",
			academic: "Федорчук Є.Н.",
			pavilion: "XXIX",
			type: "лекція",
			classroom: "303",
		},
	]
});

export interface Schedule {
	id: number;
}

export const scheduleGet = (data: {}) => API_POST_FAKE<Schedule>(`/voip-trunk/all/by-user`, data)
.then(() => ({
	items: [
		createDay("08/24/2019"),
		createDay("08/25/2019"),
		createDay("08/26/2019"),
		createDay("08/27/2020"),
	]
}));
