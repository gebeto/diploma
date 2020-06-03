import { API_POST, ResponseAll } from "../utils";


export interface IStudent {
	id: number;
	firstName: string;
	lastName: string;
	middleName: string;
	phone: string;
	email: string;
	avatar: string;
}

export const studentsGet = (data: {}) => API_POST<ResponseAll<IStudent>>(`/students/get`, data);
