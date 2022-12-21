import { Field, FieldInputProps } from 'formik';
import FormikErrorMessage from '../ErrorMessage';
import { FormikControllerProps } from '../Controller';

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
          return options.map(option => {
            return (
              <div key={option.key}>
                <input
                  type="checkbox"
                  id={option.value}
                  {...field}
                  {...rest}
                  value={option.value}
                  checked={field.value.includes(option.value)}
                />
                <label>{option.key}</label>
              </div>
            );
          });
        }}
      </Field>
      <FormikErrorMessage name={name} />
    </div>
  );
}

export default Checkboxes;
