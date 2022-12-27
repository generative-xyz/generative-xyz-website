import React, { useEffect, useRef, useState } from 'react';
import cn from 'classnames';
import { v4 } from 'uuid';
import { Field } from 'formik';

import s from './Input.module.scss';

const Input: React.FC<
  IInput.IProps &
    Partial<typeof Field> &
    React.InputHTMLAttributes<HTMLInputElement>
> = ({
  type = 'text',
  placeholder,
  clearable = true,
  className,
  value = '',
  usingFormik,
  onChange,
  ...props
}): JSX.Element => {
  const id = `Input_${v4()}`;
  const [inputValue, setInputValue] = useState(value);
  const [isFocused, setIsFocused] = useState(false);
  const wrapper = useRef<HTMLDivElement>(null);

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;

    setInputValue(value);
    onChange?.(value, e);
  };

  const handleClickOutside = (e: any) => {
    !wrapper?.current?.contains(e.target) && setIsFocused(false);
  };

  const renderInput = (props: Record<string, any>, meta: any = null) => {
    const isError = meta?.touched && meta?.error;
    return (
      <>
        <input
          id={id}
          type={type}
          value={inputValue}
          onChange={onInputChange}
          onFocus={() => setIsFocused(true)}
          className={cn(
            !!inputValue && s.hasValue,
            clearable && !!inputValue && s.clearable,
            isError && s.error
          )}
          {...props}
        />
        <label htmlFor={id}>
          {placeholder}
          {props.required && !inputValue && (
            <span className={s.required}> *</span>
          )}
        </label>
        {clearable && !!inputValue && isFocused && (
          <button
            type="button"
            className={s.Input_clearableBtn}
            onClick={() => onInputChange({ target: { value: '' } } as any)}
          >
            clear
          </button>
        )}
        {isError && <div className={s.Input_errorMsg}>{meta?.error}</div>}
      </>
    );
  };

  const render = () => {
    if (usingFormik) {
      return (
        <Field>{(field: any, meta: any) => renderInput(field, meta)}</Field>
      );
    }

    return renderInput(props);
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);

    return () => document.removeEventListener('click', handleClickOutside);
  });

  return (
    <div className={cn(s.Input, className)} ref={wrapper}>
      {render()}
    </div>
  );
};

export default Input;
