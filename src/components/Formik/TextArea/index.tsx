import React from 'react';
import { Field } from 'formik';
import FormikErrorMessage from '@components/Formik/ErrorMessage';
import { FormikControllerProps } from '@components/Formik/Controller';
import Stack from 'react-bootstrap/Stack';

function TextArea(props: Pick<FormikControllerProps, 'name' | 'label'>) {
  const { label, name, ...rest } = props;
  return (
    <Stack>
      <label htmlFor={name}>{label}</label>
      <Field as="textarea" id={name} name={name} {...rest} />
      <FormikErrorMessage name={name} />
    </Stack>
  );
}
export default TextArea;
