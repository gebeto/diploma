import { getStudents, getStudentById, getStudentByEmailAndPassword } from './students';

test("getStudents returns array with 21 students", async () => {
	const students = await getStudents();
	expect(students.length).toBe(21);
});

test("getStudentById returns student by id", async () => {
	const student = await getStudentById(1);
	expect(student.id).toBe(1);
});

test("getStudentByEmailAndPassword returns student by email and password", async () => {
	const student = await getStudentByEmailAndPassword("yaroslav_nychkalo@gmail.com", "test");
	expect(student.id).toBe(50);
});

test("getStudentByEmailAndPassword returns null if student is not found by email", async () => {
	const student = await getStudentByEmailAndPassword("admin@gmail.com", "test");
	expect(student).toBe(null);
});

test("getStudentByEmailAndPassword returns null if student password is wrong", async () => {
	const student = await getStudentByEmailAndPassword("yaroslav_nychkalo@gmail.com", "test1");
	expect(student).toBe(null);
});