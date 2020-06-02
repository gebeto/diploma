import * as React from 'react';
import { connect } from 'react-redux';

import Grid from '@material-ui/core/Grid';

import { Academics } from './Academics';

import { academicsSlice } from '../slice';


export const AcademicsListRaw = (props) => {
	return (
		<Grid container spacing={2} justify="center">
			<Grid item xs={12} md={10} lg={7} xl={7}>
			<Academics
				academics={props.academics}
			/>
			</Grid>
		</Grid>
	);
}

export const AcademicsList = connect(
	(state, ownProps) => ({
		academics: academicsSlice.selectors.itemsSelector(state, ownProps),
	})
)(AcademicsListRaw);