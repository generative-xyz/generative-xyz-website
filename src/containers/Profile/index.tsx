import s from './styles.module.scss';
import React, { useContext, useState } from 'react';
import { WalletContext } from '@contexts/wallet-context';
import { LogLevel } from '@enums/log-level';
import log from '@utils/logger';
import ImagePreviewInput from '@components/ImagePreviewInput';
import Button from '@components/Button';
import { useAppSelector } from '@redux';
import { getUserSelector } from '@redux/user/selector';
import Image from 'next/image';

const LOG_PREFIX = 'Profile';

const Profile: React.FC = (): React.ReactElement => {
  const walletCtx = useContext(WalletContext);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const user = useAppSelector(getUserSelector);
  const handleDisconnectWallet = async (): Promise<void> => {
    try {
      await walletCtx.disconnect();
    } catch (err: unknown) {
      log(err as Error, LogLevel.Debug, LOG_PREFIX);
    }
  };

  return (
    <div className={s.profile}>
      <div className="container">
        <div className="d-grid">
          <ImagePreviewInput
            file={avatarFile}
            onFileChange={setAvatarFile}
            placeHolderHtml={
              <Image
                src={user.avatar}
                alt={user.displayName}
                width={100}
                height={100}
              />
            }
          />
        </div>
        <div>{user.displayName}</div>
        <hr />
        <div>Wallet {user.walletAddress}</div>
        <div>
          <Button onClick={handleDisconnectWallet}>Disconnect wallet</Button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
