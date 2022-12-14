import React, { PropsWithChildren } from 'react';

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
      <button type={type} className={className} ref={ref} {...delegatedProps}>
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;
