import { ErrorMessage } from 'formik';

type FormikErrorMessageProps = {
  name: string;
};

const FormikErrorMessage = ({ name }: FormikErrorMessageProps) => {
  return (
    <ErrorMessage name={name}>
      {errMessage => {
        return <div style={{ color: 'red' }}>{errMessage}</div>;
      }}
    </ErrorMessage>
  );
};

export default FormikErrorMessage;
