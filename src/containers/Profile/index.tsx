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
import {
  getListingTokensByWallet,
  getMakeOffersByWallet,
} from '@services/marketplace';
import { getProfileNFTs, getProfileProjects } from '@services/profile';
import { IGetProjectItemsResponse } from '@interfaces/api/project';
import { IGetProfileNFTsResponse } from '@interfaces/api/token-uri';
import { TokenOffer } from '@interfaces/token';

const LOG_PREFIX = 'Profile';

const Profile: React.FC = (): React.ReactElement => {
  const walletCtx = useContext(WalletContext);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const user = useAppSelector(getUserSelector);
  const [collections, setCollections] =
    useState<IGetProjectItemsResponse | null>(null);
  const [tokens, setTokens] = useState<IGetProfileNFTsResponse | null>(null);
  const [listingOffers, setListingOffers] = useState<Array<TokenOffer> | null>(
    null
  );
  const [tokenOffer, setTokenOffer] = useState<Array<TokenOffer> | null>(null);
  const handleDisconnectWallet = async (): Promise<void> => {
    try {
      await walletCtx.disconnect();
    } catch (err: unknown) {
      log(err as Error, LogLevel.Debug, LOG_PREFIX);
    }
  };

  const handleFetchCollections = async () => {
    try {
      if (user.walletAddress) {
        const collections = await getProfileProjects();
        if (
          collections &&
          collections.result &&
          collections.result.length > 0
        ) {
          setCollections(collections);
        }
      }
    } catch (ex) {
      log('can not fetch created collections', LogLevel.Error, '');
      // throw Error('failed to fetch item detail');
    }
  };

  const handleFetchTokens = async () => {
    try {
      if (user.walletAddress) {
        const tokens = await getProfileNFTs({
          walletAddress: user.walletAddress,
        });
        if (tokens && tokens.result && tokens.result.length > 0) {
          setTokens(tokens);
        }
      }
    } catch (ex) {
      log('can not fetch tokens', LogLevel.Error, '');
      // throw Error('failed to fetch item detail');
    }
  };

  const handleFetchListingTokens = async () => {
    try {
      if (user.walletAddress) {
        const { result } = await getListingTokensByWallet({
          walletAddress: user.walletAddress,
          closed: false,
        });
        if (result) {
          setListingOffers(result);
        }
      }
    } catch (ex) {
      log('can not fetch listing tokens', LogLevel.Error, '');
      // throw Error('failed to fetch item detail');
    }
  };

  const handleFetchMakeOffers = async () => {
    try {
      if (user.walletAddress) {
        const { result } = await getMakeOffersByWallet({
          walletAddress: user.walletAddress,
          closed: false,
        });
        if (result) {
          setTokenOffer(result);
        }
      }
    } catch (ex) {
      log('can not fetch listing tokens', LogLevel.Error, '');
    }
  };

  useEffect(() => {
    handleFetchListingTokens();
    handleFetchMakeOffers();
    handleFetchCollections();
    handleFetchTokens();
  }, [user.walletAddress]);

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
          Collections
          {collections &&
            collections.result &&
            collections.result.length > 0 &&
            collections.result.map((item, i) => (
              <div key={`collection_${i}`}>
                {item.name}, {item.owner ? item.image : ''}
              </div>
            ))}
        </div>
        <div>
          NFTs
          {tokens &&
            tokens.result &&
            tokens.result.length > 0 &&
            tokens.result.map((item, i) => (
              <div key={`token_${i}`}>
                {item.name}, {item.owner ? item.image : ''}
              </div>
            ))}
        </div>
        <div>
          Listing
          {listingOffers &&
            listingOffers.length > 0 &&
            listingOffers.map((item, i) => (
              <div key={`item_listing_token_${i}`}>
                {item.offeringID}, {item.token ? item.token.image : ''}
              </div>
            ))}
        </div>
        <div>
          Offers
          {tokenOffer &&
            tokenOffer.length > 0 &&
            tokenOffer.map((item, i) => (
              <div key={`make_offer_${i}`}>
                {item.offeringID}, {item.token ? item.token.image : ''}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Profile;
