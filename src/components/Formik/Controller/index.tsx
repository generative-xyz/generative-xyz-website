import React, { HTMLInputTypeAttribute } from 'react';
import Input from '../Input';
import TextArea from '../TextArea';
import Select from '../Select';
import Checkboxes from '../Checkboxes';
import RadioButtons from '../RadioButtons';
// import Input from "Input.js"
// import TextArea from "TextArea.js"
// import Select from "Select.js"
// import CheckBoxes from "CheckBoxes.js"

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
