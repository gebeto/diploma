import { createHumans } from '../academics/getAcademics';

const students = createHumans(20);

export const getStudents = async () => {
	return students;
}