import { Field, FieldInputProps } from 'formik';
import FormikErrorMessage from '../ErrorMessage';
import { FormikControllerProps } from '../Controller';
import Stack from 'react-bootstrap/Stack';

function Checkboxes(
  props: Pick<FormikControllerProps, 'name' | 'label' | 'options'>
) {
  const { label, name, options, ...rest } = props;
  return (
    <div>
      <label>{label}</label>
      <Field name={name}>
        {(formik: { field: FieldInputProps<string> }) => {
          const { field } = formik;
          return options?.map(option => {
            return (
              <Stack direction="horizontal" key={option.key} gap={2}>
                <input
                  type="checkbox"
                  id={option.value}
                  {...field}
                  {...rest}
                  value={option.value}
                  checked={field.value.includes(option.value)}
                />
                <label>{option.value}</label>
              </Stack>
            );
          });
        }}
      </Field>
      <FormikErrorMessage name={name} />
    </div>
  );
}

export default Checkboxes;
