import { API_POST, ResponseAll, ResponseOne } from "../utils";
import { IAcademic } from './academics';

export interface ISubject {
	id: number;
	title: string;
}

export interface IPavilion {
	id: number;
	title: string;
}

export interface IScheduleSubject {
	id: number;
	type: string;
	order: number;
	classroom: string;
	subject: ISubject;
	academic: IAcademic;
	pavilion: IPavilion;
}

export interface IScheduleDay {
	id: number;
	date: Date;
	subjects: IScheduleSubject[];
}

export const scheduleGet = (data: {}) => API_POST<ResponseAll<IScheduleDay>>(`/schedule/get`, data);
export const scheduleGetNextDay = (data: {}) => API_POST<ResponseOne<IScheduleDay>>(`/schedule/getNextDay`, data);
