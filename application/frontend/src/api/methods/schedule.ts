import { API_POST, ResponseAll, ResponseOne } from "../utils";
import { IAcademic } from './academics';

export interface ISubject {
	id: number;
	title: string;
}

export interface ISubjectType {
	id: number;
	title: string;
}

export interface IPavilion {
	id: number;
	title: string;
}

export interface IScheduleLesson {
	id: number;
	order: number;
	classroom: string;
	type: ISubjectType.id;
	subject: ISubject.id;
	academic: IAcademic.id;
	pavilion: IPavilion.id;
}

export interface IScheduleDay {
	id: number;
	date: Date;
	lessons: IScheduleLesson[];
}

export const scheduleGet = (data: {}) => API_POST<{
	schedule: IScheduleDay[];
	academics: IAcademic[];
	subjects: ISubject[];
	pavilions: IPavilion[];
	subjectTypes: ISubjectType[];
}>(`/schedule/get`, data);

export const scheduleGetNextDay = (data: {}) => API_POST<ResponseOne<IScheduleDay>>(`/schedule/getNextDay`, data);

export const lessonUpdate = (data: any) => API_POST<ResponseOne<IScheduleLesson>>(`/schedule/update-lesson`, data);
