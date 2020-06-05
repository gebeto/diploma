import * as jwt from 'jsonwebtoken';
import { SECRET_KEY } from '../../config';

// import { sequelize, Student } from '../../database/';
import { bcryptHash, bcryptCompare } from './bcrypt';
import { getStudents, getStudentByEmailAndPassword } from '../students/index';


export const generateTokenForStudentEmailPassword = async (email: string, password: string) => {
	// const student = await sequelize.models.student.findOne({
	// 	where: { email: email },
	// 	attributes: [ 'id', 'password' ]
	// });
	const student = await getStudentByEmailAndPassword(email, password);
	
	if (!student) {
		return null;
	}

	return await generateTokenForStudent(student);
}

export const generateTokenForStudent = async (student) => {	
	const token = jwt.sign({
		id: student.id
	}, SECRET_KEY);
	
	return token;
}

interface IStudent {
	firstName: string;
	middleName: string;
	lastName: string;
	phone: string;
	email: string;
	password: string;
}

// export const registerStudent = async (student: IStudent) => {
// 	const cryptedPassword = await bcryptHash(student.password);
// 	const createdStudent = await Student.create(
// 		student.firstName,
// 		student.middleName,
// 		student.lastName,
// 		student.email,
// 		student.phone,
// 		cryptedPassword,
// 	);

// 	return null;
// }
