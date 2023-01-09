import s from './Profile.module.scss';
import React, { useEffect, useState } from 'react';
// import { WalletContext } from '@contexts/wallet-context';
// import { LogLevel } from '@enums/log-level';
// import log from '@utils/logger';
// import ImagePreviewInput from '@components/ImagePreviewInput';
// import Button from '@components/Button';
// import { useAppSelector } from '@redux';
// import { getUserSelector } from '@redux/user/selector';
// import Image from 'next/image';
// import {
//   getListingTokensByWallet,
//   getMakeOffersByWallet,
// } from '@services/marketplace';
// import { IListingTokens, IMakeOffers } from '@interfaces/api/marketplace';
// import { getProfileNFTs, getProfileProjects } from '@services/profile';
// import { IGetProjectItemsResponse } from '@interfaces/api/project';
// import { IGetProfileNFTsResponse } from '@interfaces/api/token-uri';
import { Container, Tab, Tabs } from 'react-bootstrap';
// import styles from '@containers/GenerativeProjectDetail/styles.module.scss';
// import TokenTopFilter from '@containers/GenerativeProjectDetail/TokenTopFilter';
// import { Loading } from '@components/Loading';
// import CollectionList from '@components/Collection/List';
import ClientOnly from '@components/Utils/ClientOnly';
// import { Owned } from '@containers/Profile/Components/Owned';
import { OwnedTab } from '@containers/Profile/Components/OwnedTab';
// import { Loading } from '@components/Loading';
// import CollectionList from '@components/Collection/List';
import { IGetProfileNFTsResponse } from '@interfaces/api/token-uri';
import { useAppSelector } from '@redux';
import { getUserSelector } from '@redux/user/selector';
import { getProfileNFTs } from '@services/profile';
import log from '@utils/logger';
import { LogLevel } from '@enums/log-level';

// const LOG_PREFIX = 'Profile';

const Profile: React.FC = (): React.ReactElement => {
  // const walletCtx = useContext(WalletContext);
  // const [avatarFile, setAvatarFile] = useState<File | null>(null);
  // const user = useAppSelector(getUserSelector);
  // const [collections, setCollections] =
  //   useState<IGetProjectItemsResponse | null>(null);
  //
  // const [listingTokens, setListingTokens] = useState<IListingTokens | null>(
  //   null
  // );
  // const [makeOffers, setMakeOffers] = useState<IMakeOffers | null>(null);
  // const handleDisconnectWallet = async (): Promise<void> => {
  //   try {
  //     await walletCtx.disconnect();
  //   } catch (err: unknown) {
  //     log(err as Error, LogLevel.Debug, LOG_PREFIX);
  //   }
  // };
  //
  // const handleFetchCollections = async () => {
  //   try {
  //     if (user.walletAddress) {
  //       const collections = await getProfileProjects();
  //       if (
  //         collections &&
  //         collections.result &&
  //         collections.result.length > 0
  //       ) {
  //         setCollections(collections);
  //       }
  //     }
  //   } catch (ex) {
  //     log('can not fetch created collections', LogLevel.Error, '');
  //     // throw Error('failed to fetch item detail');
  //   }
  // };
  //
  // const handleFetchListingTokens = async () => {
  //   try {
  //     if (user.walletAddress) {
  //       const listingTokens = await getListingTokensByWallet({
  //         walletAddress: user.walletAddress,
  //         closed: false,
  //       });
  //       if (listingTokens && listingTokens.result) {
  //         setListingTokens(listingTokens);
  //         // console.log(listingTokens.result);
  //       }
  //     }
  //   } catch (ex) {
  //     log('can not fetch listing tokens', LogLevel.Error, '');
  //     // throw Error('failed to fetch item detail');
  //   }
  // };
  //
  // const handleFetchMakeOffers = async () => {
  //   try {
  //     if (user.walletAddress) {
  //       const makeOffers = await getMakeOffersByWallet({
  //         walletAddress: user.walletAddress,
  //         closed: false,
  //       });
  //       if (makeOffers && makeOffers.result) {
  //         setMakeOffers(makeOffers);
  //         // console.log(listingTokens.result);
  //       }
  //     }
  //   } catch (ex) {
  //     log('can not fetch listing tokens', LogLevel.Error, '');
  //     // throw Error('failed to fetch item detail');
  //   }
  // };
  //
  // useEffect(() => {
  //   handleFetchListingTokens();
  //   handleFetchMakeOffers();
  //   handleFetchCollections();
  // }, [user.walletAddress]);

  const [tokens, setTokens] = useState<IGetProfileNFTsResponse | null>(null);
  const [totalTokens, setTotalTokens] = useState<number>(0);
  const user = useAppSelector(getUserSelector);

  const handleFetchTokens = async () => {
    try {
      if (user.walletAddress) {
        const tokens = await getProfileNFTs({
          walletAddress: user.walletAddress,
          // '0xE55EAdE1B17BbA28A80a71633aF8C15Dc2D556A5'.toLowerCase(), //todo //user.walletAddress,
        });
        if (tokens && tokens.result && tokens.result.length > 0) {
          setTokens(tokens);
          setTotalTokens(tokens.total || 0);
        }
      }
    } catch (ex) {
      log('can not fetch tokens', LogLevel.Error, '');
      // throw Error('failed to fetch item detail');
    }
  };

  useEffect(() => {
    handleFetchTokens();
  }, [user.walletAddress]);

  return (
    <Container>
      <ClientOnly>
        <Tabs className={s.tabs} defaultActiveKey="ownedTab">
          <Tab
            tabClassName={s.tab}
            eventKey="ownedTab"
            title={`Owned (${totalTokens})`}
          >
            <OwnedTab tokens={tokens?.result} />
          </Tab>
        </Tabs>
      </ClientOnly>
    </Container>

    // <div className={s.profile}>
    //   <div className="container">
    //     <div className="d-grid">
    //       <ImagePreviewInput
    //           file={avatarFile}
    //           onFileChange={setAvatarFile}
    //           placeHolderHtml={
    //             <Image
    //                 src={
    //                   user.avatar
    //                       ? user.avatar
    //                       : 'https://cdn.generative.xyz/icons/logo-marketplace.svg'
    //                 }
    //                 alt={user.displayName}
    //                 width={100}
    //                 height={100}
    //             />
    //           }
    //       />
    //     </div>
    //     <div>{user.displayName}</div>
    //     <hr />
    //     <div>Wallet {user.walletAddress}</div>
    //     <div>
    //       <Button onClick={handleDisconnectWallet}>Disconnect wallet</Button>
    //     </div>
    //     <div>
    //       Collections
    //       {collections &&
    //           collections.result &&
    //           collections.result.length > 0 &&
    //           collections.result.map((item, i) => (
    //               <div key={`collection_${i}`}>
    //                 {item.name}, {item.owner ? item.image : ''}
    //               </div>
    //           ))}
    //     </div>
    //     {/*<div>*/}
    //     {/*  NFTs*/}
    //     {/*  {tokens &&*/}
    //     {/*    tokens.result &&*/}
    //     {/*    tokens.result.length > 0 &&*/}
    //     {/*    tokens.result.map((item, i) => (*/}
    //     {/*      <div key={`token_${i}`}>*/}
    //     {/*        {item.name}, {item.owner ? item.image : ''}*/}
    //     {/*      </div>*/}
    //     {/*    ))}*/}
    //     {/*</div>*/}
    //     <div>
    //       Listing
    //       {listingTokens &&
    //           listingTokens.result &&
    //           listingTokens.result.length > 0 &&
    //           listingTokens.result.map((item, i) => (
    //               <div key={`item_listing_token_${i}`}>
    //                 {item.offeringID}, {item.token ? item.token.image : ''}
    //               </div>
    //           ))}
    //     </div>
    //     <div>
    //       Offers
    //       {makeOffers &&
    //           makeOffers.result &&
    //           makeOffers.result.length > 0 &&
    //           makeOffers.result.map((item, i) => (
    //               <div key={`make_offer_${i}`}>
    //                 {item.offeringID}, {item.token ? item.token.image : ''}
    //               </div>
    //           ))}
    //     </div>
    //   </div>
    // </div>;
  );
};

export default Profile;
