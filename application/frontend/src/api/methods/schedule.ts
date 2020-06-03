import { API_POST, ResponseAll, ResponseOne } from "../utils";


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

export const scheduleGet = (data: {}) => API_POST<ResponseAll<IScheduleDay>>(`/schedule/get`, data);

export const scheduleGetNextDay = (data: {}) => API_POST<ResponseOne<IScheduleDay>>(`/schedule/getNextDay`, data);
