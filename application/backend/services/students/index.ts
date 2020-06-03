import * as jwt from 'jsonwebtoken';
import { SECRET_KEY } from '../../config';

import { sequelize } from '../../database/index';

export * from './students';

export const findByEmailForAuth = async (email: string) => {
	const student = await sequelize.models.student.findOne({
		where: { email: email },
		attributes: [ 'id', 'password' ]
	});
	return student;
}
