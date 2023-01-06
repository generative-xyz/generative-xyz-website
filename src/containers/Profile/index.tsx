import s from './styles.module.scss';
import React, { useContext, useEffect, useState } from 'react';
import { WalletContext } from '@contexts/wallet-context';
import { LogLevel } from '@enums/log-level';
import log from '@utils/logger';
import ImagePreviewInput from '@components/ImagePreviewInput';
import Button from '@components/Button';
import { useAppSelector } from '@redux';
import { getUserSelector } from '@redux/user/selector';
import Image from 'next/image';
import { getListingTokensByWallet } from '@services/marketplace';
import { IListingTokens } from '@interfaces/api/marketplace';

const LOG_PREFIX = 'Profile';

const Profile: React.FC = (): React.ReactElement => {
  const walletCtx = useContext(WalletContext);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const user = useAppSelector(getUserSelector);
  const [listingTokens, setListingTokens] = useState<IListingTokens | null>(
    null
  );
  const handleDisconnectWallet = async (): Promise<void> => {
    try {
      await walletCtx.disconnect();
    } catch (err: unknown) {
      log(err as Error, LogLevel.Debug, LOG_PREFIX);
    }
  };

  const handleFetchListingTokens = async () => {
    try {
      const listingTokens = await getListingTokensByWallet({
        walletAddress: user.walletAddress,
        closed: false,
      });
      if (listingTokens && listingTokens.result) {
        setListingTokens(listingTokens);
        // console.log(listingTokens.result);
      }
    } catch (ex) {
      log('can not fetch listing tokens', LogLevel.Error, '');
      // throw Error('failed to fetch item detail');
    }
  };

  useEffect(() => {
    handleFetchListingTokens();
  }, [user]);

  return (
    <div className={s.profile}>
      <div className="container">
        <div className="d-grid">
          <ImagePreviewInput
            file={avatarFile}
            onFileChange={setAvatarFile}
            placeHolderHtml={
              <Image
                src={
                  user.avatar
                    ? user.avatar
                    : 'https://cdn.generative.xyz/icons/logo-marketplace.svg'
                }
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
        <div>
          {listingTokens &&
            listingTokens.result &&
            listingTokens.result.length > 0 &&
            listingTokens.result.map((item, i) => (
              <div key={`item_listing_token_${i}`}>
                {item.offeringID}, {item.token ? item.token.image : ''}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Profile;
