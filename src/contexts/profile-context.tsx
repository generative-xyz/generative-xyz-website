import React, {
  PropsWithChildren,
  useCallback,
  useMemo,
  useState,
} from 'react';
import log from '@utils/logger';
import { LogLevel } from '@enums/log-level';
import { useAppSelector } from '@redux';
import {
  getProfileByWallet,
  getProfileProjectsByWallet,
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
import useAsyncEffect from 'use-async-effect';

const LOG_PREFIX = 'ProfileContext';

export interface IProfileContext {
  currentUser?: User;
  userWalletAddress?: string;
  profileTokens?: IGetProfileTokensResponse;
  profileProjects?: IGetProjectItemsResponse;
  profileMakeOffer?: ITokenOfferListResponse;
  profileListing?: IListingTokensResponse;

  isLoaded: boolean;

  isLoadedProfileTokens: boolean;
  isLoadedProfileProjects: boolean;
  isLoadedProfileMakeOffer: boolean;
  // isLoadedProfileListing: boolean;

  handleFetchTokens: () => void;
  handleFetchProjects: () => void;
  handleFetchMakeOffers: () => void;
  handleFetchListingTokens: () => void;
}

const initialValue: IProfileContext = {
  currentUser: undefined,
  isLoaded: false,
  isLoadedProfileTokens: false,
  isLoadedProfileProjects: false,
  isLoadedProfileMakeOffer: false,
  // isLoadedProfileListing: false,
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
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  const [profileTokens, setProfileTokens] = useState<
    IGetProfileTokensResponse | undefined
  >();

  const [isLoadedProfileTokens, setIsLoadedProfileTokens] =
    useState<boolean>(false);

  const [profileProjects, setProfileProjects] = useState<
    IGetProjectItemsResponse | undefined
  >();

  const [isLoadedProfileProjects, setIsLoadedProfileProjects] =
    useState<boolean>(false);

  const [profileMakeOffer, setProfileMakeOffer] = useState<
    ITokenOfferListResponse | undefined
  >();

  const [isLoadedProfileMakeOffer, setIsLoadedProfileMakeOffer] =
    useState<boolean>(false);

  const [profileListing, setProfileListing] = useState<
    IListingTokensResponse | undefined
  >();

  // const [isLoadedProfileListing, setIsLoadedProfileListing] =
  //   useState<boolean>(false);

  const handleFetchProjects = useCallback(async () => {
    try {
      if (currentUser.walletAddress) {
        let page = (profileProjects && profileProjects?.page) || 0;
        page += 1;

        setIsLoadedProfileProjects(false);
        const projects = await getProfileProjectsByWallet({
          walletAddress: currentUser.walletAddress,
          page,
          limit: 12,
        });

        if (projects) {
          if (profileProjects && profileProjects?.result) {
            projects.result = [...profileProjects.result, ...projects.result];
          }

          setProfileProjects(projects);
          setIsLoadedProfileProjects(true);
        }
      }
    } catch (ex) {
      log('can not fetch created collections', LogLevel.Error, LOG_PREFIX);
      setIsLoadedProfileProjects(true);
    }
  }, [currentUser, profileProjects]);

  const handleFetchListingTokens = useCallback(async () => {
    try {
      if (currentUser.walletAddress) {
        const listingTokens = await getListingTokensByWallet({
          walletAddress: currentUser.walletAddress,
          closed: false,
        });
        if (listingTokens && listingTokens) {
          setProfileListing(listingTokens);
        }
      }
    } catch (ex) {
      log('can not fetch listing tokens', LogLevel.Error, LOG_PREFIX);
    }
  }, [currentUser]);

  const handleFetchMakeOffers = useCallback(async () => {
    try {
      if (currentUser.walletAddress) {
        setIsLoadedProfileMakeOffer(false);
        const makeOffers = await getMakeOffersByWallet({
          walletAddress: currentUser.walletAddress,
          closed: false,
        });
        if (makeOffers) {
          setProfileMakeOffer(makeOffers);
          setIsLoadedProfileMakeOffer(true);
        }
      }
    } catch (ex) {
      log('can not fetch listing tokens', LogLevel.Error, LOG_PREFIX);
      setIsLoadedProfileMakeOffer(true);
    }
  }, [currentUser]);

  const handleFetchTokens = useCallback(async () => {
    try {
      if (currentUser.walletAddress) {
        let page = (profileTokens && profileTokens?.page) || 0;
        page += 1;

        setIsLoadedProfileTokens(false);
        const tokens = await getProfileTokens({
          walletAddress: currentUser.walletAddress,
          limit: 12,
          page,
        });
        if (tokens) {
          if (profileTokens && profileTokens?.result) {
            tokens.result = [...profileTokens.result, ...tokens.result];
          }

          setProfileTokens(tokens);
          setIsLoadedProfileTokens(true);
        }
      }
    } catch (ex) {
      log('can not fetch tokens', LogLevel.Error, LOG_PREFIX);
      setIsLoadedProfileTokens(true);
    }
  }, [currentUser, profileTokens]);

  const handleFetchProfileByWallet = useCallback(async () => {
    try {
      if (walletAddress) {
        const getUser = await getProfileByWallet({
          walletAddress: walletAddress.toLowerCase(),
        });
        if (getUser && getUser.id !== '') {
          setCurrentUser(getUser);
        }
      }
    } catch (ex) {
      log('can not fetch tokens', LogLevel.Error, LOG_PREFIX);
    }
  }, [walletAddress]);

  useAsyncEffect(async () => {
    if (walletAddress) {
      setIsLoaded(false);
      setUserWalletAddress(walletAddress);
      await handleFetchProfileByWallet();
      setTimeout(() => {
        setIsLoaded(true);
      }, 400);
    }
  }, [walletAddress]);

  useAsyncEffect(async () => {
    if (!walletAddress) {
      setCurrentUser(user);
      setTimeout(() => {
        setIsLoaded(true);
      }, 400);
    }

    handleFetchMakeOffers();
    handleFetchProjects();
    handleFetchTokens();
  }, [currentUser, user]);

  const contextValues = useMemo((): IProfileContext => {
    return {
      currentUser,
      userWalletAddress,
      profileTokens,
      profileProjects,
      profileMakeOffer,
      profileListing,

      isLoaded,

      isLoadedProfileTokens,
      isLoadedProfileProjects,
      isLoadedProfileMakeOffer,
      // isLoadedProfileListing,

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

    isLoaded,

    isLoadedProfileTokens,
    isLoadedProfileProjects,
    isLoadedProfileMakeOffer,
    // isLoadedProfileListing,

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
