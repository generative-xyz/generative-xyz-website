import ClientOnly from '@components/Utils/ClientOnly';
import { getUserSelector } from '@redux/user/selector';
import { useRouter } from 'next/router';
import React, { PropsWithChildren } from 'react';
import { useSelector } from 'react-redux';

const AuthGuard: React.FC<PropsWithChildren> = ({
  children,
}: PropsWithChildren): React.ReactElement => {
  const router = useRouter();
  const user = useSelector(getUserSelector);

  if (typeof window !== 'undefined' && !user.id) {
    router.push(`/connect-wallet?next=${location.pathname}`);
    return <></>;
  }

  return <ClientOnly>{children}</ClientOnly>;
};

export default AuthGuard;
