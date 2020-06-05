import * as React from 'react';

import { FormGroup, FormInputGroup, InputGroup } from '../wrappers';

import TextField from '@material-ui/core/TextField';
// import { makeStyles } from '@material-ui/core/styles';
// import * as sss from '@material-ui/core/styles';
import { InputAddonPrepend } from './addons';


export const InputField = ({
	name, title, values, errors,
	type="text",
	addons = undefined,
	onChange = undefined,
	autoFocus = undefined,
	placeholder = undefined,
	disabled = undefined,
	className = undefined,
	required = undefined,

	InputProps = undefined,
}) => {

	return (
		<TextField
			fullWidth
			size="small"
			variant="outlined"
			// autoComplete="off"
			autoComplete="off-off"
			id={name}
			name={name}
			label={title}
			type={type}
			value={values[name] === null ? '' : values[name]}
			error={!!errors[name]}
			helperText={errors[name]}
			onChange={onChange}
			required={required}
			placeholder={placeholder}
			autoFocus={autoFocus}
			disabled={disabled}
			InputProps={InputProps}
		/>
	);
}
