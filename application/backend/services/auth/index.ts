import * as jwt from 'jsonwebtoken';
import { SECRET_KEY } from '../../config';

// import { sequelize, Student } from '../../database/';
import { bcryptHash, bcryptCompare } from './crypt';
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
		id: student.id,
		groupId: 1,
	}, SECRET_KEY);
	
	return token;
}

export const decodeToken = async (token) => {	
	const decoded = jwt.verify(token, SECRET_KEY);
	return decoded;
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
