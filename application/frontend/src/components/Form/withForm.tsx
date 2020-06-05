import * as React from 'react';


const beforeSubmitDefault = (values, props) => values;
const onAsyncSubmitDefault = (values, props) => Promise.reject<any>(Error("No fetcher"));


interface withFormState {
	values: Record<string, any>;
	errors: Record<string, any>;
	errorMessage: string;
	isSubmitting: boolean;
}

interface withFormProps {
	handleFieldChange(e: any): void;
	onSubmit(): void;
	reset(): void;
}


interface withFormHocProps extends withFormState, withFormProps {}


export type defaultValues<T> = Record<any, any> | ((props: T) => Record<any, any>);

export interface withFormInterface<CP> {
	onAsyncSubmit: (values: any, props: CP) => Promise<any>;
	beforeSubmit?: (values: any, props: CP) => Record<any, any>;
	onSuccess: (props: CP, data: any, form?: {reset(): void}) => any;
	onError?: (props: CP, data: any) => any;
	defaultValues?: defaultValues<CP>;
	name?: string;
	capitalizeValues?: boolean;
	validation?: any;
	disabled?: any;
	hiddens?: any;
}


export const withForm = <P extends any>({
	defaultValues = {},
	validation={},
	disabled={},
	hiddens={},
	beforeSubmit = beforeSubmitDefault,
	onAsyncSubmit = onAsyncSubmitDefault,
	onSuccess = undefined,
	onError = undefined,
	capitalizeValues = false,
}: withFormInterface<P>) => <T extends Partial<withFormHocProps> & Partial<P>>(Component: React.ComponentType<T>) => {
	const initState = (props): withFormState => ({
		values: typeof defaultValues === 'function' ? defaultValues(props) : defaultValues,
		errors: {},
		errorMessage: "",
		isSubmitting: false,
	});

	const CC = Component as any;

	class WithForm extends React.Component<P, withFormState> {
		static displayName = `withForm(${Component.name || Component.displayName})`;

		constructor(props) {
			super(props);

			this.state = initState(props);
		}

		handleSubmitAsync = () => {
			this.setState(state => ({
				...state,
				isSubmitting: true,
				errors: {},
				errorMessage: "",
			}));
			const asyncSubmit = onAsyncSubmit(beforeSubmit(this.state.values, this.props), this.props)
				.catch(err => {
					let message = err.message;
					if (!navigator.onLine) {
						message = 'No internet connection! Please connect to the internet and try again.';
					}
					if (err.error) {
						return err;
					}
					this.setState(state => ({
						...state,
						isSubmitting: false,
						errorMessage: message,
					}));
				})
				.then(response => {
					if (response.error) {
						this.setState(state => ({
							...state,
							errors: response.error.fields || {},
							isSubmitting: false,
							errorMessage: response.error.message,
						}));
						throw new Error("Server error");
					}
					this.setState(state => ({
						...state,
						isSubmitting: false,
						errors: {},
						errorMessage: "",
					}));
					return response;
				});

			if (onSuccess) {
				asyncSubmit.then((data) => onSuccess(this.props, data, {
					reset: this.reset,
				})).then(() => { this.reset(); });
			}
		}

		onSubmit = (e) => {
			this.handleSubmitAsync();
		}

		prepareValue = (value) => {
			if (capitalizeValues && value.toUpperCase) {
				return value.toUpperCase();
			}
			return value;
		}

		handleFieldChange = ({ target }) => {
			if (validation[target.name] && !validation[target.name](target.value)) return;
			const name = target.name;
			const value = this.prepareValue(target.value);
			this.setState(state => ({
				...state,
				values: {
					...state.values,
					[name]: value,
				}
			}));
		}

		resetFormErrors = (newErrors) => {
			this.setState(state => ({ ...state, errors: {} }));
		}

		resetFormValues = (newErrors) => {
			this.setState(state => ({ ...state, values: {} }));
		}

		reset = () => {
			this.setState(state => initState(this.props));
		}

		updateFormValues = (newValues) => {
			this.setState(state => ({ ...state, values: { ...state.values, ...newValues } }));
		}

		updateFormErrors = (newErrors) => {
			this.setState(state => ({ ...state, errors: { ...state.errors, ...newErrors } }));
		}

		render() {
			return (
				<CC
					{...this.props as P}
					// {...this.state}
					disabled={disabled}
					hiddens={hiddens}
					values={this.state.values}
					errors={this.state.errors}
					errorMessage={this.state.errorMessage}
					isSubmitting={this.state.isSubmitting}
					
					onSubmit={this.onSubmit}
					handleFieldChange={this.handleFieldChange}
					updateFormValues={this.updateFormValues}
					updateFormErrors={this.updateFormErrors}
					resetFormValues={this.resetFormValues}
					resetFormErrors={this.resetFormErrors}
					reset={this.reset}
				/>
			);
		}
	}

	return WithForm;
}


export const withFormModal = <P extends any>(Modal: any, title: any, options: withFormInterface<P>) => <T extends Partial<withFormHocProps> & Partial<P>>(FormComponent: React.ComponentType<T>) => {
	const titleIsFunction = typeof title === "function";

	const FCC = FormComponent as any;

	return withForm(options)((props) => (
		<Modal
			title={titleIsFunction ? title(props) : title}
			isOpened={(props as any).isOpened}
			handleClose={(props as any).handleClose}
			handleExited={props.reset}
			onSubmit={props.onSubmit}
			isLoading={props.isSubmitting}
		>
			<FCC {...props} />
		</Modal>
	));
};
