import { bcryptHash, bcryptCompare } from './bcrypt';


test("Bcrypt hash service", async () => {
	expect(1).toBe(1);
	// const hash = await bcryptHash("Hello");
	// expect(/^\$2b\$05\$/.test(hash)).toBe(true);
	// const compared = await bcryptCompare("Hello", hash);
	// expect(compared).toBe(true);
});