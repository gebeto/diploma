export const first = ["Руслан", "Олег", "Василь", "Володимир", "Орест", "Любов", "Олена", "Юрій", "Олег", "Марта", "Зоряна", "Руслана", "Наталія", "Тетяна", "Олег", "Ярослав", "Елеонора", "Володимир", "Ірина", "Сергій", "Любомир", "Андрій", "Анжеліка", "Іван"];
export const last = ["Ганюк", "Стельмащук", "Кресяк", "Скиба", "Вітик", "Шахрайчук", "Парубій", "Попіль", "Кузьменко", "Кравець", "Остапишин", "Яремчук", "Жолудєва", "Ризванюк", "Панько", "Карпин", "Матюшко", "Коваль", "Герега", "Михальчук", "Лоневський", "Магдяк", "Любченко", "Левкін"];
export const middle = ["Володимирович", "Станіславович", "Васильович", "Володимирович", "Дмитрович", "Євгенівна", "Володимирівна", "Михайлович", "Михайлович", "Олегівна", "Володимирівна", "Іванівна", "Ярославівна", "Олексіївна", "Ігорович", "Степанович", "Романівна", "Богданович", "Онуфріївна", "Миколайович", "Миколайович", "Ярославович", "Олександрівна", "Володимирович"];
export const phone = ["0970676047", "0977318348", "0977499318", "0973858927", "0979922570", "0975681203", "0970948229", "0979233848", "0978233855", "0973884041", "0978307593", "0979441205", "0975723857", "0976510502", "0973722315", "0977393530", "0979968956", "0974427974", "0975480779", "0977627847", "0972418949", "0977446513", "0973988280", "0972307203", "0972402691", "0973478751", "0970388313", "0977634619", "0970248691", "0972239040"];
export const email = ["metzzo@yahoo.com", "stinson@live.com", "conteb@comcast.net", "kspiteri@gmail.com", "twoflower@yahoo.ca", "crusader@yahoo.ca", "kingma@icloud.com", "iamcal@comcast.net", "choset@outlook.com", "krueger@att.net", "psharpe@aol.com", "zyghom@yahoo.ca", "jacks@aol.com", "twoflower@verizon.net", "danny@hotmail.com", "stellaau@att.net", "frosal@att.net", "dbanarse@verizon.net", "rjones@yahoo.com", "stomv@hotmail.com", "osaru@mac.com", "fhirsch@comcast.net", "henkp@me.com", "heidrich@verizon.net"];

export function randomElement(arr) {
	const index = Math.floor(Math.random() * arr.length);
	return arr[index];
}

export const getAvatarUrl = (firstName, id) => firstName[firstName.length - 1] === 'а' ? `https://randomuser.me/api/portraits/women/${id}.jpg` : `https://randomuser.me/api/portraits/men/${id}.jpg`

export interface IHuman {
	id: number;
	firstName: string;
	middleName: string;
	lastName: string;
	phone: string;
	email: string;
	avatar: string;
}

const defaultModify = (h: IHuman) => h;
export const createHumansFabric = <T extends IHuman>(modify = defaultModify) => {
	const createHuman = (() => {
		let id = 0;
		return () => {
			const firstName = randomElement(first);
			return modify({
				id: ++id,
				firstName: firstName,
				middleName: randomElement(middle),
				lastName: randomElement(last),
				phone: randomElement(phone),
				email: randomElement(email),
				avatar: firstName[firstName.length - 1] === 'а' ? `https://randomuser.me/api/portraits/women/${id}.jpg` : `https://randomuser.me/api/portraits/men/${id}.jpg`,
			}) as T;
		};
	})();
	const createHumans = (count) => {
		return (new Array(count).fill(1)).map(() => createHuman());
	}

	return createHumans;
}

const createAcademics = createHumansFabric();

export const academics = createAcademics(10);

export const getAcademics = async () => {
	return academics;
}

export const getAcademicById = async (id) => {
	return academics.find(academic => academic.id === id);
}