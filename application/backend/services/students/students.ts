import { createHumans } from '../academics/getAcademics';

export const students = createHumans(20);

export const getStudents = async () => {
	return students;
}