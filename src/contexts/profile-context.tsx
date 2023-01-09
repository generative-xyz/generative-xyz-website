import React, {
  PropsWithChildren,
  useCallback,
  useMemo,
  useState,
  useEffect,
} from 'react';
import log from '@utils/logger';
import { LogLevel } from '@enums/log-level';
import { useAppSelector } from '@redux';
import {
  getProfileByWallet,
  getProfileProjects,
  getProfileTokens,
} from '@services/profile';
import { User } from '@interfaces/user';
import {
  getListingTokensByWallet,
  getMakeOffersByWallet,
} from '@services/marketplace';
import { getUserSelector } from '@redux/user/selector';
import { IGetProfileTokensResponse } from '@interfaces/api/token-uri';
import { IGetProjectItemsResponse } from '@interfaces/api/project';
import {
  IListingTokensResponse,
  ITokenOfferListResponse,
} from '@interfaces/api/marketplace';
import { useRouter } from 'next/router';
import { ROUTE_PATH } from '@constants/route-path';

const LOG_PREFIX = 'ProfileContext';

export interface IProfileContext {
  currentUser?: User;
  userWalletAddress?: string;
  profileTokens?: IGetProfileTokensResponse;
  profileProjects?: IGetProjectItemsResponse;
  profileMakeOffer?: ITokenOfferListResponse;
  profileListing?: IListingTokensResponse;
  handleFetchTokens: () => void;
  handleFetchProjects: () => void;
  handleFetchMakeOffers: () => void;
  handleFetchListingTokens: () => void;
}

const initialValue: IProfileContext = {
  currentUser: undefined,
  handleFetchTokens: () => new Promise<void>(r => r()),
  handleFetchProjects: () => new Promise<void>(r => r()),
  handleFetchMakeOffers: () => new Promise<void>(r => r()),
  handleFetchListingTokens: () => new Promise<void>(r => r()),
};

export const ProfileContext =
  React.createContext<IProfileContext>(initialValue);

export const ProfileProvider: React.FC<PropsWithChildren> = ({
  children,
}: PropsWithChildren): React.ReactElement => {
  const user = useAppSelector(getUserSelector);
  const router = useRouter();
  const [userWalletAddress, setUserWalletAddress] = useState<
    string | undefined
  >();
  const { walletAddress } = router.query as { walletAddress: string };
  const [currentUser, setCurrentUser] = useState<User>(user);

  const [profileTokens, setProfileTokens] = useState<
    IGetProfileTokensResponse | undefined
  >();

  const [profileProjects, setProfileProjects] = useState<
    IGetProjectItemsResponse | undefined
  >();

  const [profileMakeOffer, setProfileMakeOffer] = useState<
    ITokenOfferListResponse | undefined
  >();

  const [profileListing, setProfileListing] = useState<
    IListingTokensResponse | undefined
  >();

  const handleFetchProjects = useCallback(async () => {
    try {
      if (user.walletAddress) {
        const projects = await getProfileProjects();
        if (projects) {
          setProfileProjects(projects);
        }
      }
    } catch (ex) {
      log('can not fetch created collections', LogLevel.Error, LOG_PREFIX);
      // throw Error('failed to fetch item detail');
    }
  }, []);

  const handleFetchListingTokens = useCallback(async () => {
    try {
      if (user.walletAddress) {
        const listingTokens = await getListingTokensByWallet({
          walletAddress: user.walletAddress,
          closed: false,
        });
        if (listingTokens && listingTokens) {
          setProfileListing(listingTokens);
        }
      }
    } catch (ex) {
      log('can not fetch listing tokens', LogLevel.Error, LOG_PREFIX);
    }
  }, []);

  const handleFetchMakeOffers = useCallback(async () => {
    try {
      if (user.walletAddress) {
        const makeOffers = await getMakeOffersByWallet({
          walletAddress: user.walletAddress,
          closed: false,
        });
        if (makeOffers) {
          setProfileMakeOffer(makeOffers);
        }
      }
    } catch (ex) {
      log('can not fetch listing tokens', LogLevel.Error, LOG_PREFIX);
    }
  }, []);

  const handleFetchTokens = useCallback(async () => {
    try {
      if (user.walletAddress) {
        const tokens = await getProfileTokens({
          walletAddress: user.walletAddress,
        });
        if (tokens) {
          setProfileTokens(tokens);
        }
      }
    } catch (ex) {
      log('can not fetch tokens', LogLevel.Error, LOG_PREFIX);
    }
  }, []);

  const handleFetchProfileByWallet = useCallback(async () => {
    try {
      if (user.walletAddress) {
        const user = await getProfileByWallet({
          walletAddress: walletAddress,
        });
        if (user) {
          setCurrentUser(user);
        }
      }
    } catch (ex) {
      log('can not fetch tokens', LogLevel.Error, LOG_PREFIX);
    }
  }, [walletAddress]);

  useEffect(() => {
    if (user.walletAddress === walletAddress) {
      router.push(ROUTE_PATH.PROFILE);
      return;
    } else {
      setUserWalletAddress(walletAddress);
      handleFetchProfileByWallet();
    }

    handleFetchListingTokens();
    handleFetchMakeOffers();
    handleFetchProjects();
    handleFetchTokens();
  }, [user.walletAddress, walletAddress]);

  const contextValues = useMemo((): IProfileContext => {
    return {
      currentUser,
      userWalletAddress,
      profileTokens,
      profileProjects,
      profileMakeOffer,
      profileListing,
      handleFetchTokens,
      handleFetchProjects,
      handleFetchMakeOffers,
      handleFetchListingTokens,
    };
  }, [
    currentUser,
    userWalletAddress,
    profileTokens,
    profileProjects,
    profileMakeOffer,
    profileListing,
    handleFetchTokens,
    handleFetchProjects,
    handleFetchMakeOffers,
    handleFetchListingTokens,
  ]);

  return (
    <ProfileContext.Provider value={contextValues}>
      {children}
    </ProfileContext.Provider>
  );
};
