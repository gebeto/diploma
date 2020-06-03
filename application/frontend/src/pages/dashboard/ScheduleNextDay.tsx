import * as React from 'react';

import CircularProgress from '@material-ui/core/CircularProgress';

import { ScheduleDay } from '../schedule/ScheduleList/Day';
import { formatDate } from '../schedule/ScheduleList/helpers';

import { scheduleGetNextDay } from '../../api/';
import { makeApiRequest } from '../../api/utils';


const useNextDayApiRequest = makeApiRequest(async () => {
	const result = await scheduleGetNextDay({});
	const item = result.item;
	return { ...item, date: new Date(item.date) };
});


export const ScheduleNextDay = () => {
	const req = useNextDayApiRequest();

	if (req.state.isFetching) {
		return <CircularProgress />;
	}

	return <ScheduleDay title={`Найближчі заняття: ${formatDate(req.state.response.date)}`} schedule={req.state.response} />;
}