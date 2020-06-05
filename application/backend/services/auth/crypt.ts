// import * as bcrypt from 'bcrypt';
import * as bcrypt from 'bcrypt';


export const bcryptHash = (text): Promise<string> => new Promise((resolve, reject) => {
	bcrypt.hash(text, 5, (err, result) => {
		if (err) reject(err);
		resolve(result);
	})
});


export const bcryptCompare = (text, hash): Promise<boolean> => new Promise((resolve, reject) => {
	bcrypt.compare(text, hash, (err, result) => {
		if (err) reject(err);
		resolve(result);
	})
});
