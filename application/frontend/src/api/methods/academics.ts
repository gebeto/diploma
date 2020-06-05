import { API_POST, ResponseAll, ResponseOne } from "../utils";


export interface IAcademic {
	id: number;
	firstName: string;
	lastName: string;
	middleName: string;
	phone: string;
	email: string;
	avatar: string;
}

export const academicsGet = (data: {}) => API_POST<ResponseAll<IAcademic>>(`/academics/get`, data);
export const academicsAdd = (data: any) => API_POST<ResponseOne<IAcademic>>(`/academics/add`, data);
export const academicsUpdate = (data: any) => API_POST<ResponseOne<IAcademic>>(`/academics/update`, data);
