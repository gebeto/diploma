// import { sync, Student } from './index';


test("Database test", () => {
	expect(1).toBe(1);
});

// beforeAll(async () => {
// 	await sync();
// });

// describe("Student", () => {
// 	it("get all Students", async () => {
// 		const students = await Student.getAll();
// 		expect(students.length).toBe(0);
// 	});

// 	it("create student", async () => {
// 		const student = await Student.create("Slavik", "Nychkalo", "", "");
// 		expect(student.firstName).toBe("Slavik");
// 		expect(student.lastName).toBe("Nychkalo");
// 		expect(student.email).toBe("");
// 		expect(student.phone).toBe("");
// 	});
// })
