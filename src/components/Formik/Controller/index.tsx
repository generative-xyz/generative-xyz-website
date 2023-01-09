import React, { HTMLInputTypeAttribute, ReactNode } from 'react';
import Input from '@components/Formik/Input';
import TextArea from '@components/Formik/TextArea';
import Select from '@components/Formik/Select';
import Checkboxes from '@components/Formik/Checkboxes';
import RadioButtons from '@components/Formik/RadioButtons';

export type FormikControllerProps = {
  control: string;
  name: string;
  label: string;
  desc?: string;
  type?: HTMLInputTypeAttribute;
  options?: {
    value: string;
    key: string;
  }[];
  startIcon?: ReactNode;
  endIcon?: ReactNode;
};

function FormikController(props: FormikControllerProps) {
  const { control, ...rest } = props;
  switch (control) {
    case 'input':
      return <Input {...rest} />;
    case 'textArea':
      return <TextArea {...rest} />;
    case 'select':
      return <Select {...rest} />;
    case 'radio':
      return <RadioButtons {...rest} />;
    case 'checkbox':
      return <Checkboxes {...rest} />;
    default:
      return null;
  }
}
export default FormikController;
