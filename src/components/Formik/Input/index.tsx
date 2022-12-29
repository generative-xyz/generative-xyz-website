import React from 'react';
import { Field } from 'formik';
import FormikErrorMessage from '@components/Formik/ErrorMessage';
import { FormikControllerProps } from '@components/Formik/Controller';

function Input(props: Pick<FormikControllerProps, 'name' | 'label' | 'desc'>) {
  const { name, label, desc, ...rest } = props;
  return (
    <div>
      <label htmlFor={name}> {label}</label>
      {desc && <p>{desc}</p>}
      <Field name={name} {...rest} />
      <FormikErrorMessage name={name} />
    </div>
  );
}
export default Input;
