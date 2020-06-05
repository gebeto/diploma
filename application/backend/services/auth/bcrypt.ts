// import * as bcrypt from 'bcrypt';
import Bcrypt from 'bcrypt';

Bcrypt.hash()

export const bcryptHash = (text): Promise<string> => new Promise((resolve, reject) => {
	Bcrypt.hash(text, 5, (err, result) => {
		if (err) reject(err);
		resolve(result);
	})
});


export const bcryptCompare = (text, hash): Promise<boolean> => new Promise((resolve, reject) => {
	Bcrypt.compare(text, hash, (err, result) => {
		if (err) reject(err);
		resolve(result);
	})
});
