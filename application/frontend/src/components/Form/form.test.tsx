import * as React from 'react';
import { render } from '@testing-library/react';

import { InputField } from './Fields/InputField';
import { TextareaField } from './Fields/TextareaField';
import { SelectField } from './Fields/SelectField';
import { BooleanField } from './Fields/BooleanField';

import { InputAddonPrepend, InputAddonAppend } from './Fields/addons';


test("InputField is rendering without errors", () => {
	const input = render(
		<InputField name="test" title="test" values={{test: "111"}} errors={{}} />
	);
});

test("TextareaField is rendering without errors", () => {
	const input = render(
		<TextareaField name="test" title="test" values={{test: "111"}} errors={{}} />
	);
});

test("SelectField is rendering without errors", () => {
	const input = render(
		<SelectField name="test" title="test" values={{test: "111"}} errors={{}}>
			<option value="111">111</option>
		</SelectField>
	);
});

test("BooleanField is rendering without errors", () => {
	const input = render(
		<BooleanField name="test" title="test" values={{test: "111"}} errors={{}} />
	);
});

test("InputAddonPrepend is rendering without errors", () => {
	const prepend = render(
		<InputAddonPrepend>Test</InputAddonPrepend>
	);
});

test("InputAddonAppend is rendering without errors", () => {
	const append = render(
		<InputAddonAppend>Test</InputAddonAppend>
	);
});
