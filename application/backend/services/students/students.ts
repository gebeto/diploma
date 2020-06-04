import { createHumansFabric } from '../academics/getAcademics';

const createStudents = createHumansFabric();

export const students = createStudents(20);

export const getStudents = async () => {
	return students;
}

export const getStudentById = async (id) => {
	return students.find(stud => stud.id === id);
}