import { getStudentById } from '../students/index';
import { getSubjectById } from '../schedule/subjects';

export const getChatInfo = async (chatType: string, chatId: number) => {
	if (chatType === "group") {
		return { title: "Загальний" };
	} else if (chatType === "student") {
		const student = await getStudentById(chatId);
		return { title: `${student.firstName} ${student.lastName}` };
	} else if (chatType === "subject") {
		const subject = await getSubjectById(chatId);
		return { title: subject.title };
	}
}
