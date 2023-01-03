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
  iconOnly?: boolean;
}

const ButtonIcon = React.forwardRef<
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
      iconOnly,
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
          iconOnly && styles.iconOnly,
          className
        )}
        ref={ref}
        {...delegatedProps}
      >
        {startIcon && (
          <div className={cs(styles.icon, styles.leftIcon)}>{startIcon}</div>
        )}
        {children}
        {endIcon && (
          <div className={cs(styles.icon, styles.rightIcon)}>{endIcon}</div>
        )}
      </button>
    );
  }
);

ButtonIcon.displayName = 'ButtonIcon';

export default ButtonIcon;
