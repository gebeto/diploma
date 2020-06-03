import * as React from 'react';
import { connect } from 'react-redux';
import Typography from '@material-ui/core/Typography';

import { StudentsList } from './StudentsList';
import { loadStudents, studentsSlice } from './slice';

const StudentsRaw = (props) => {
	React.useEffect(() => {
		props.loadStudents({});
		// return () => {
		// 	props.reset();
		// }
	}, []);

	return (
		<React.Fragment>
			<StudentsList />
		</React.Fragment>
	);
};

const Students = connect(
	undefined,
	{ loadStudents, reset: studentsSlice.actions.reset }
)(StudentsRaw);

export default Students;
