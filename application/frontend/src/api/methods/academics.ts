import { API_POST, ResponseAll } from "../utils";


export interface IAcademic {
	id: number;
	firstName: string;
	lastName: string;
	middleName: string;
	phone: string;
	email: string;
}

export const academicsGet = (data: {}) => API_POST<ResponseAll<IAcademic>>(`/academics/get`, data);
