// import { sequelize } from '../../database/index';
import { createHumansFabric, getAvatarUrl, IHuman } from '../academics/academics';

interface IStudent extends IHuman {
	password: string;
}

const createStudents = createHumansFabric<IStudent>((s) => ({ ...s, password: 'test' }));

export const students = [
	...createStudents(20),
	{
		id: 49,
		firstName: "Ярослав",
		middleName: "Володимирович",
		lastName: "Ничкало",
		phone: "0970067238",
		avatar: getAvatarUrl("Ярослав", 49),
		email: "yaroslav_nychkalo@gmail.com",
		password: "test",
	} as IStudent,
	{
		id: 50,
		// firstName: "Петро",
		firstName: "Андрій",
		middleName: "Миронович",
		lastName: "Студент",
		phone: "0939758432",
		avatar: getAvatarUrl("Андрій", 50),
		// avatar: "https://pbs.twimg.com/profile_images/622151044831776768/BQ5ifWI__400x400.png",
		email: "test@gmail.com",
		password: "test",
	} as IStudent,
];

export const getStudents = async () => {
	return students;
}

export const getStudentById = async (id) => {
	return students.find(stud => stud.id === id);
}

export const getStudentByEmailAndPassword = async (email: string, password: string) => {
	const student = students.find(s => s.email === email);
	
	if (!student) {
		return undefined;
	}

	if (student.password !== password) {
		return null;
	}

	return student;
}