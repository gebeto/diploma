const groups = {};

const createGroup = (() => {
	let id = 0;
	return (groups, title) => {
		const newGroup = {
			id: ++id,
			title: title,
		};
		groups[title] = newGroup
		return newGroup;
	}
})();

createGroup(groups, "ПЗ-41з");

export const getGroups = async () => {
	return groups;
}

export const getGroup = async (groupName) => {
	return groups[groupName];
}

export const addGroup = async (groupTitle) => {
	return createGroup(groups, groupTitle);
}
