import React, { CSSProperties, PropsWithChildren } from 'react';
import s from './styles.module.scss';

type THeading = {
  as?: 'h1' | 'h2' | 'h3' | 'h4';
  fontWeight?: 'bold' | 'semibold' | 'meidum' | 'regular' | 'light';
  style?: CSSProperties;
};

const Heading = ({
  as = 'h1',
  children,
  fontWeight = 'regular',
  style,
  ...props
}: PropsWithChildren<THeading>) => {
  const Text = as;

  return (
    <Text {...props} className={s.heading} style={{ fontWeight, ...style }}>
      {children}
    </Text>
  );
};

export default Heading;
