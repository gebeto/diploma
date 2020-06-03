import { createHumans } from '../academics/getAcademics';

export const students = createHumans(20);

export const getStudents = async () => {
	return students;
}

export const getStudentById = async (id) => {
	return students.find(stud => stud.id === id);
}