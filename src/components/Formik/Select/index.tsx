import { Field } from 'formik';
import React from 'react';
import FormikErrorMessage from '../ErrorMessage';
import { FormikControllerProps } from '../Controller';

function Select(
  props: Pick<FormikControllerProps, 'name' | 'label' | 'options'>
) {
  const { label, name, options, ...rest } = props;
  return (
    <div>
      <label htmlFor={name}>{label}</label>
      <Field as="select" id={name} name={name} {...rest}>
        {options.map(option => {
          return (
            <option key={option.value} value={option.value}>
              {option.key}
            </option>
          );
        })}
      </Field>
      <FormikErrorMessage name={name} />
    </div>
  );
}

export default Select;
