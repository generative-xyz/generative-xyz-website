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

  const childrenWithProps = React.Children.map(children, child => {
    // Checking isValidElement is the safe way and avoids a
    // typescript error too.
    if (React.isValidElement(child)) {
      return React.cloneElement(child, { ...delegatedProps });
    }
    return child;
  });

  return <>{childrenWithProps}</>;
};

export default ClientOnly;
