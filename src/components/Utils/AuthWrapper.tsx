import { useAppDispatch } from '@redux';
import { setUser } from '@redux/user/action';
import { getProfile } from '@services/profile';
import { getAccessToken } from '@utils/auth';
import React, { PropsWithChildren, useEffect } from 'react';

const AuthWrapper: React.FC<PropsWithChildren> = ({
  children,
}: PropsWithChildren): React.ReactElement => {
  const dispatch = useAppDispatch();

  const fetchProfileByToken = async (): Promise<void> => {
    const accessToken = getAccessToken();
    if (accessToken) {
      const userRes = await getProfile();
      dispatch(setUser(userRes));
    }
  };

  useEffect(() => {
    fetchProfileByToken();
  }, []);

  return <>{children}</>;
};

export default AuthWrapper;
