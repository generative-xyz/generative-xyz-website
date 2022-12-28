import React, { ButtonHTMLAttributes } from 'react';
import cn from 'classnames';

import IButton from './Button';
import s from './Button.module.scss';

const Button: React.FC<
  IButton.IProps & ButtonHTMLAttributes<HTMLButtonElement>
> = ({
  children,
  variant = 'black',
  size = 'md',
  className,
  type = 'button',
  ...props
}) => {
  return (
    <button
      type={type}
      className={cn(
        s.Button,
        className,
        variant === 'black' && s.Button__black,
        variant === 'outline-black' && s.Button__outlineBlack,
        variant === 'white' && s.Button__white,
        variant === 'outline-white' && s.Button__outlineWhite,
        variant === 'cta-anim' && s.Button__ctaAnim,
        variant === 'cta-anim__black' &&
          `${s.Button__ctaAnim} ${s.Button__ctaAnim__black}`,
        variant === 'cta-border' && s.Button__ctaBorder,
        variant === 'cta-border__black' &&
          `${s.Button__ctaBorder} ${s.Button__ctaBorder__black}`,
        variant === 'cta-none' && s.Button__ctaNone,
        size === 'xl' && s.Button__xl,
        size === 'lg' && s.Button__lg,
        size === 'md' && s.Button__md,
        size === 'sm' && s.Button__sm,
        size === 'xs' && s.Button__xs
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
