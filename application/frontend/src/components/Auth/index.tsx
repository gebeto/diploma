import * as React from 'react';

import Box from '@material-ui/core/Box';


export const Auth = (props) => {
	return (
		<Box height="100vh" boxSizing="border-box" bgcolor="red">
			Hello auth

			<input type="text" name="login" />
		</Box>
	);
}

