import * as React from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Alert from '@material-ui/lab/Alert';
import IconButton from '@material-ui/core/IconButton';

import EditIcon from '@material-ui/icons/Edit';


const Profile = (props) => {
	return (
		<React.Fragment>
			<Typography variant="h4" gutterBottom>
				Ничкало Ярослав
				<IconButton><EditIcon /></IconButton>
			</Typography>
			<Grid container spacing={2}>
				<Grid item xs={12}>
					Hello
				</Grid>
			</Grid>
		</React.Fragment>
	);
};


export default Profile;
