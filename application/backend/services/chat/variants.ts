export interface IVariantsDataText {
	text: string;
}

export interface IVariants {
	id: number;
	title: string;
	variants: any[];
}

const variants = {};

export const createVariants = (() => {
	let id = 0;
	return (title, variantsItems) => {
		const newVariants = {
			id: ++id,
			title: title,
			variants: variantsItems.map((item, index) => ({...item, id: index + 1})),
		};
		variants[newVariants.id] = newVariants;
		return newVariants;
	}
})();

export const getVariants = async () => {
	return variants;
}

export const getVariantsById = async (id) => {
	return variants[id];
}