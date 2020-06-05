import { bcryptHash, bcryptCompare } from './crypt';


test("Bcrypt hash and compare service is working", async () => {
	const hash = await bcryptHash("Hello");
	expect(/^\$2b\$05\$/.test(hash)).toBe(true);
	const compared = await bcryptCompare("Hello", hash);
	expect(compared).toBe(true);
});