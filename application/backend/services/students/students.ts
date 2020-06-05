import { createHumansFabric, IHuman } from '../academics/academics';

interface IStudent extends IHuman {
	password: string;
}

const createStudents = createHumansFabric<IStudent>((s) => ({ ...s, password: 'test' }));

export const students = [
	...createStudents(20),
	{
		id: 100,
		firstName: "Ярослав",
		middleName: "Володимирович",
		lastName: "Ничкало",
		phone: "0970067238",
		email: "yaroslav.nychkalo@gmail.com",
		password: "test",
	} as IStudent
];

export const getStudents = async () => {
	return students;
}

export const getStudentById = async (id) => {
	return students.find(stud => stud.id === id);
}