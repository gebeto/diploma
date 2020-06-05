import * as React from 'react';
import { connect } from 'react-redux';
import Typography from '@material-ui/core/Typography';

import { AcademicsList } from './AcademicsList';

import { loadAcademics, academicsSlice } from './slice';

export const AcademicsRaw = (props) => {
	React.useEffect(() => {
		props.loadAcademics({});

		return () => {
			props.reset();
		}
	}, []);

	return (
		<React.Fragment>
			<AcademicsList />
		</React.Fragment>
	);
};


export const Academics = connect(
	undefined,
	{ loadAcademics, reset: academicsSlice.actions.reset }
)(AcademicsRaw)


export default Academics;
