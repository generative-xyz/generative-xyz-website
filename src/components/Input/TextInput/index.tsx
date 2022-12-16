import * as React from 'react';
import styles from './styles.module.scss';
import cx from 'classnames';

type InputProps = {
  className?: string;
  containerStyle?: React.CSSProperties;
  errors?: string;
  disabled?: boolean;
  icon?: React.ReactElement;
  inputStyle?: React.CSSProperties;
  name: string;
  onChange?: () => void;
  placeholder?: string;
  readOnly?: boolean;
  required?: boolean;
  type?: string;
  value?: string;
  wrapperStyle?: React.CSSProperties;
  label?: string;
  desc?: string;
  descStyle?: React.CSSProperties;
  as?: 'input' | 'textarea';
};

const Input = ({
  className,
  containerStyle,
  errors,
  disabled,
  icon,
  inputStyle,
  name,
  onChange,
  placeholder,
  readOnly,
  required,
  type,
  value,
  wrapperStyle,
  label,
  desc,
  descStyle,
  as = 'input',
}: InputProps) => {
  const InputType = as;
  const inputRef = React.useRef<HTMLInputElement>(null);
  const handleClick = () => {
    if (inputRef && inputRef.current) inputRef.current?.focus();
  };

  return (
    <div className={cx(styles.inputWrapper, className)} style={wrapperStyle}>
      <label htmlFor={name}>{label}</label>
      <p className={styles.desc} style={descStyle}>
        {desc}
      </p>
      <div onClick={handleClick} className="container" style={containerStyle}>
        {icon}
        <InputType
          id={name}
          aria-label={name}
          data-testid={name}
          tabIndex={0}
          type={type}
          name={name}
          onChange={onChange}
          placeholder={placeholder}
          value={value}
          style={inputStyle}
          disabled={disabled}
          readOnly={readOnly}
        />
      </div>
      {errors && !value && required && (
        <div data-testid="errors" className={styles.errors}>
          Required!
        </div>
      )}
    </div>
  );
};

export default Input;
