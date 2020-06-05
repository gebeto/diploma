import { createHumansFabric, getAvatarUrl, IHuman } from '../academics/academics';

interface IStudent extends IHuman {
	password: string;
}

const createStudents = createHumansFabric<IStudent>((s) => ({ ...s, password: 'test' }));

export const students = [
	...createStudents(20),
	{
		id: 50,
		firstName: "Ярослав",
		middleName: "Володимирович",
		lastName: "Ничкало",
		phone: "0970067238",
		avatar: getAvatarUrl("Ярослав", 50),
		email: "yaroslav_nychkalo@gmail.com",
		password: "test",
	} as IStudent
];

export const getStudents = async () => {
	return students;
}

export const getStudentById = async (id) => {
	return students.find(stud => stud.id === id);
}

export const getStudentByEmailAndPassword = async (email: string, password: string) => {
	const student = students.find(s => s.email === email);
	
	if (!student || student.password !== password) {
		return null;
	}

	return student;
}