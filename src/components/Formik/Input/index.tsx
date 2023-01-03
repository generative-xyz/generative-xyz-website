import cs from 'classnames';
import { Field } from 'formik';
import { ReactNode } from 'react';

import s from './styles.module.scss';

interface IInputProps {
  name: string;
  label?: string;
  desc?: string;
  size?: 'large' | 'medium';
  variant?: 'filled' | 'outline';
  className?: string;
  placeholder?: string;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  useFormik?: boolean;
  required?: boolean;
  errors?: {
    [x: string]: string;
  };
  validate?: () => void;
  as?: 'input' | 'textarea';
  inputClassName?: string;
}

const Input: React.FC<
  IInputProps &
    Partial<typeof Field> &
    React.InputHTMLAttributes<HTMLInputElement>
> = (props): JSX.Element => {
  const {
    variant = 'filled',
    name,
    label,
    desc,
    startIcon,
    endIcon,
    placeholder,
    className,
    size,
    errors,
    useFormik = false,
    required,
    as = 'input',
    inputClassName,
    ...rest
  } = props;
  const isError = errors?.label;

  const InputComponent = as;

  const renderInput = (inputProps?: any) => {
    return (
      <>
        <div className={cs(s.input, inputClassName)}>
          {startIcon && (
            <div className={cs(s.icon, s.leftIcon)}>{startIcon}</div>
          )}
          <InputComponent
            type="text"
            {...inputProps}
            placeholder={placeholder}
          />
          {endIcon && <div className={cs(s.icon, s.rightIcon)}>{endIcon}</div>}
        </div>
        {isError && <div className="text-error">{errors.label}</div>}
      </>
    );
  };

  return (
    <div
      className={cs(
        s.wrapper,
        s[`${variant}`],
        s[`${size}`],
        className,
        isError ? s.error : s.default
      )}
    >
      {label && (
        <label htmlFor={name}>
          {label}
          {required && ' * '}
        </label>
      )}
      {desc && <p>{desc}</p>}
      {useFormik ? (
        <Field name={name} {...rest}>
          {({ field }: any) => renderInput(field)}
        </Field>
      ) : (
        renderInput(rest)
      )}
    </div>
  );
};
export default Input;
