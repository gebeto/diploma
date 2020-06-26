import { format } from 'date-fns';


export const formatDate = (dateString) => {
	return format(dateString, "dd.MM.yyyy");
}