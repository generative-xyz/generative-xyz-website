import cs from 'classnames';
import React, { PropsWithChildren, ReactNode } from 'react';
import styles from './styles.module.scss';
type ButtonType = 'button' | 'submit' | 'reset' | undefined;
type ButtonVariantsType = 'default' | 'secondary' | 'outline' | 'ghost';
type ButtonSizesType = 'large' | 'medium' | 'small' | 'xsmall';

interface ButtonProps extends React.HTMLProps<HTMLButtonElement> {
  className?: string;
  type?: ButtonType;
  variants?: ButtonVariantsType;
  sizes?: ButtonSizesType;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
}

const Button = React.forwardRef<
  HTMLButtonElement,
  PropsWithChildren<ButtonProps>
>(
  (
    {
      children,
      className,
      type = 'button',
      variants = 'default',
      sizes = 'medium',
      startIcon,
      endIcon,
      ...delegatedProps
    }: PropsWithChildren<ButtonProps>,
    ref: React.ForwardedRef<HTMLButtonElement>
  ) => {
    return (
      <button
        type={type}
        className={cs(
          styles.button,
          styles[`${variants}`],
          styles[`${sizes}`],
          className
        )}
        ref={ref}
        {...delegatedProps}
      >
        {startIcon}
        {children}
        {endIcon}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;
