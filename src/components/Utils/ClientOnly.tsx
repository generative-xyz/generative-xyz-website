import React, { PropsWithChildren } from 'react';
import useIsMounted from '@hooks/useIsMounted';

const ClientOnly: React.FC<PropsWithChildren> = (
  props: PropsWithChildren
): React.ReactElement => {
  const { children, ...delegatedProps } = props;
  const isMounted = useIsMounted();

  if (!isMounted) {
    return <></>;
  }

  return <div {...delegatedProps}>{children}</div>;
};

export default ClientOnly;
