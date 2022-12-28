import cs from 'classnames';
import { Field } from 'formik';
import { ReactNode } from 'react';

import s from './styles.module.scss';

interface IInputProps {
  name: string;
  label: string;
  desc?: string;
  size?: 'large' | 'medium';
  variant?: 'filled' | 'outline';
  className?: string;
  placeholder?: string;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  useFormik?: boolean;
  errors?: {
    [x: string]: string;
  };
  validate?: () => void;
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
    ...rest
  } = props;
  const isError = errors?.label;

  const renderInput = (inputProps?: any) => {
    return (
      <>
        <div className={s.input}>
          {startIcon && (
            <div className={cs(s.icon, s.leftIcon)}>{startIcon}</div>
          )}
          <input type="text" {...inputProps} placeholder={placeholder} />
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
      <label htmlFor={name}> {label}</label>
      <p>{desc}</p>
      {useFormik ? (
        <Field name={name} {...rest}>
          {({ field }: any) => renderInput(field)}
        </Field>
      ) : (
        renderInput()
      )}
    </div>
  );
};
export default Input;
