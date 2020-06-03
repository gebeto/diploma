import { getGroups, getGroup } from './groups';


test("One group by default", async () => {
	const groups = await getGroups();
	expect(Object.keys(groups).length).toBe(1);
});

test("Return group by name", async () => {
	const group = await getGroup("ПЗ-41з");
	expect(group.id).toBe(1);
	expect(group.title).toBe("ПЗ-41з");
});