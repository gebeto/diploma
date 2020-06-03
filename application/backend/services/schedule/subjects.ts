export const subjects = [
	{
		id: 1,
		title: "Основи програмування",
	},
	{
		id: 2,
		title: "Обєктно орієнтоване програмування",
	},
	{
		id: 3,
		title: "Системне програмування",
	},
	{
		id: 4,
		title: "Основи компютерних мереж"
	},
	{
		id: 5,
		title: "Архітектура і проектування ПЗ",
	},
	{
		id: 6,
		title: "Менеджмент проектів з розробки Пз",
	},
];


export const getSubjects = async () => {
	return subjects;
}

export const getSubjectById = async (id) => {
	return subjects.find(subject => subject.id === id);
}

