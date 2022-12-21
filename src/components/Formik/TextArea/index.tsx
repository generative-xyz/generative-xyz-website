import React from 'react';
import { Field } from 'formik';
import FormikErrorMessage from '../ErrorMessage';
import { FormikControllerProps } from '../Controller';

function TextArea(props: Pick<FormikControllerProps, 'name' | 'label'>) {
  const { label, name, ...rest } = props;
  return (
    <div>
      <label htmlFor={name}>{label}</label>
      <Field as="Textarea" id={name} name={name} {...rest} />
      <FormikErrorMessage name={name} />
    </div>
  );
}
export default TextArea;
