import React, { CSSProperties, PropsWithChildren } from 'react';
import s from './styles.module.scss';
import cs from 'classnames';

type THeading = {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5';
  fontWeight?: 'bold' | 'semibold' | 'medium' | 'normal' | 'light';
  style?: CSSProperties;
  className?: string;
  color?: string;
};

const Heading = ({
  as = 'h1',
  children,
  fontWeight = 'normal',
  style,
  color,
  className,
  ...props
}: PropsWithChildren<THeading>) => {
  const Text = as;

  return (
    <Text
      {...props}
      className={cs(
        className,
        s.heading,
        `font-${fontWeight}`,
        `text-${color}`
      )}
      style={{ ...style }}
    >
      {children}
    </Text>
  );
};

export default Heading;
