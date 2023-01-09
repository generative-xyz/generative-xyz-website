import s from './styles.module.scss';
import { MintGenerativeContext } from '@contexts/mint-generative-context';
import React, { useContext, useEffect } from 'react';
import Image from 'next/image';
import { CDN_URL } from '@constants/config';

const ErrorAlert: React.FC = (): React.ReactElement => {
  const { showErrorAlert, setShowErrorAlert } = useContext(
    MintGenerativeContext
  );

  useEffect(() => {
    let timeOutId: NodeJS.Timeout;
    if (showErrorAlert) {
      timeOutId = setTimeout(() => {
        setShowErrorAlert({ open: false, message: null });
      }, 5000);
    }
    return () => {
      timeOutId && clearTimeout(timeOutId);
    };
  }, [showErrorAlert, setShowErrorAlert]);

  if (!showErrorAlert.open) {
    return <></>;
  }

  return (
    <div className={s.errorAlert}>
      <div className={s.alertWrapper}>
        <div className={s.alertContainer}>
          <div className={s.iconWrapper}>
            <Image
              src={`${CDN_URL}/icons/ic-triangle-exclamation-24x24.svg`}
              width={24}
              height={24}
              alt="ic-triangle-exclamation"
            />
          </div>
          <div className={s.errorInfoWrapper}>
            <h3 className={s.title}>Error</h3>
            <p className={s.errorMessage}>
              {showErrorAlert.message
                ? showErrorAlert.message
                : 'Unable to create NFT. Please check your input and try again.'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ErrorAlert;
