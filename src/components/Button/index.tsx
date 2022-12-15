import React, { PropsWithChildren } from 'react';
import styles from './styles.module.scss';
import cs from 'classnames';

type ButtonType = 'button' | 'submit' | 'reset' | undefined;

interface ButtonProps extends React.HTMLProps<HTMLButtonElement> {
  className?: string;
  type?: ButtonType;
}

const Button = React.forwardRef<
  HTMLButtonElement,
  PropsWithChildren<ButtonProps>
>(
  (
    {
      children,
      className,
      type,
      ...delegatedProps
    }: PropsWithChildren<ButtonProps>,
    ref: React.ForwardedRef<HTMLButtonElement>
  ) => {
    return (
      <button
        type={type}
        className={cs(styles.button, className)}
        ref={ref}
        {...delegatedProps}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;
