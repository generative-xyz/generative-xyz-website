import React from 'react';
import { Field } from 'formik';
import FormikErrorMessage from '@components/Formik/ErrorMessage';
import { FormikControllerProps } from '../Controller';

function Input(props: Pick<FormikControllerProps, 'name' | 'label'>) {
  const { name, label, ...rest } = props;
  return (
    <div>
      <label htmlFor={name}> {label}</label>
      <Field name={name} {...rest} />
      <FormikErrorMessage name={name} />
    </div>
  );
}
export default Input;
