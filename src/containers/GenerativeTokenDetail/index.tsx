import ThumbnailPreview from '@components/ThumbnailPreview';
import { GENERATIVE_PROJECT_CONTRACT } from '@constants/contract-address';
import { LogLevel } from '@enums/log-level';
import { IGetGenerativeTokenUriResponse } from '@interfaces/api/token-uri';
import { getTokenUri } from '@services/token-uri';
import log from '@utils/logger';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import s from './styles.module.scss';
import { Container, Stack } from 'react-bootstrap';
import Heading from '@components/Heading';
import SvgInset from '@components/SvgInset';
import { CDN_URL } from '@constants/config';
import Text from '@components/Text';
import dayjs from 'dayjs';
import Avatar from '@components/Avatar';
import { formatAddress } from '@utils/format';
import ButtonIcon from '@components/ButtonIcon';
import Accordion from '@components/Accordion';
import { getChainName, getScanUrl } from '@utils/chain';
import { v4 } from 'uuid';
import Link from 'next/link';

const LOG_PREFIX = 'GenerativeTokenDetail';

const MARKETPLACE_API = false; // TODO: wait for Marketplace API

const GenerativeTokenDetail: React.FC = (): React.ReactElement => {
  const router = useRouter();
  const { tokenID } = router.query as {
    projectID: string;
    tokenID: string;
  };

  const [itemDetail, setItemDetail] =
    useState<IGetGenerativeTokenUriResponse | null>(null);

  const scanURL = getScanUrl();

  const mintedDate = dayjs(itemDetail?.mintedTime).format('MMM DD, YYYY');

  const fetchItemDetail = async (): Promise<void> => {
    try {
      if (tokenID) {
        const res = await getTokenUri({
          contractAddress: GENERATIVE_PROJECT_CONTRACT,
          tokenID,
        });
        setItemDetail(res);
      }
    } catch (err: unknown) {
      log('failed to fetch item detail', LogLevel.Error, LOG_PREFIX);
      throw Error('failed to fetch item detail');
    }
  };

  // const renderAttributes = () => {
  //   return (
  //     <>
  //       {itemDetail &&
  //         itemDetail.attributes?.length > 0 &&
  //         itemDetail.attributes.map((attr, index: number) => (
  //           <div key={`${attr.trait_type}-${index}`}>{attr.trait_type}</div>
  //         ))}
  //     </>
  //   );
  // };

  const TokenInfo = () => {
    const tokenInfos = [
      {
        id: 'contract-address',
        info: 'Contract Address',
        value: formatAddress(itemDetail?.project.genNFTAddr || ''),
        link: `${scanURL}/token/${itemDetail?.project.genNFTAddr}`,
      },
      {
        id: 'token-id',
        info: 'Token ID',
        value: tokenID,
        link: `${scanURL}/token/${itemDetail?.project.genNFTAddr}?a=${tokenID}`,
      },
      {
        id: 'token-standard',
        info: 'Token Standard',
        value: 'ERC-721',
      },
      {
        id: 'blockchain',
        info: 'Blockchain',
        value: getChainName(),
      },
    ];

    return (
      <>
        {tokenInfos.length > 0 &&
          tokenInfos.map(item => (
            <div className={s.tokenInfo} key={`token-${v4()}`}>
              <Text size="18" fontWeight="semibold">
                {item.info}
              </Text>
              <Stack direction="horizontal">
                <Text size="18" fontWeight="semibold">
                  {item.value}
                </Text>
                {!!item?.link && (
                  <Link href={item.link}>
                    <SvgInset svgUrl={`${CDN_URL}/icons/ic-share.svg`} />
                  </Link>
                )}
              </Stack>
            </div>
          ))}
      </>
    );
  };

  useEffect(() => {
    fetchItemDetail();
  }, [tokenID]);

  return (
    <Container>
      <div className={s.wrapper} style={{ marginBottom: '100px' }}>
        <div>
          <Heading as="h4" fontWeight="bold">
            {itemDetail?.name}
          </Heading>
          <Heading as="h5" fontWeight="bold" className={s.collectionName}>
            {itemDetail?.project?.name}
          </Heading>
          <div className={s.usersInfo}>
            <div className={s.usersInfo_item}>
              {itemDetail?.owner && (
                <Avatar
                  imgSrcs={itemDetail?.owner?.avatar}
                  width={34}
                  height={34}
                />
              )}
              <div>
                <Text
                  size="12"
                  fontWeight="bold"
                  className={s.usersInfo_mainText}
                >
                  Owner
                </Text>
                <Text fontWeight="semibold">
                  {itemDetail?.owner?.displayName ||
                    formatAddress(
                      itemDetail?.ownerAddr ||
                        itemDetail?.owner?.walletAddress ||
                        ''
                    )}
                </Text>
              </div>
            </div>
            <div className={s.usersInfo_item}>
              {itemDetail?.creator && (
                <Avatar
                  imgSrcs={itemDetail?.creator?.avatar}
                  width={34}
                  height={34}
                />
              )}
              <div>
                <Text
                  size="12"
                  fontWeight="bold"
                  className={s.usersInfo_mainText}
                >
                  Owner
                </Text>
                <Text fontWeight="semibold">
                  {itemDetail?.creator?.displayName ||
                    formatAddress(
                      itemDetail?.ownerAddr ||
                        itemDetail?.creator?.walletAddress ||
                        ''
                    )}
                </Text>
              </div>
            </div>
            <div className={s.usersInfo_item}>
              <SvgInset svgUrl={`${CDN_URL}/icons/ic-calendar.svg`} />
              <div>
                <Text
                  size="12"
                  fontWeight="bold"
                  className={s.usersInfo_mainText}
                >
                  Created date
                </Text>
                <Text fontWeight="semibold">{mintedDate}</Text>
              </div>
            </div>
          </div>
          <div className="divider"></div>
          <div className={s.prices}>
            {/* TODO: Remove when API ready  */}
            {/* <div>
              <Text size="12" fontWeight="bold">
                Price
              </Text>
              <Heading as="h5" fontWeight="bold">
                0.01 ETH
              </Heading>
            </div>
            <div>
              <Text size="12" fontWeight="bold">
                highest offer
              </Text>
              <Heading as="h5" fontWeight="bold">
                0.2 ETH
              </Heading>
            </div> */}
            <div>
              <Text size="12" fontWeight="bold">
                Royalty
              </Text>
              <Heading as="h5" fontWeight="bold">
                {(itemDetail?.project?.royalty || 0) / 100}%
              </Heading>
            </div>
          </div>
          <div className={s.CTA_btn}>
            <ButtonIcon>Buy</ButtonIcon>
            <ButtonIcon variants="outline">Make offer</ButtonIcon>
          </div>
          <div className={s.accordions}>
            <Accordion
              header={'DESCRIPTION'}
              content={itemDetail?.description}
            ></Accordion>

            <Accordion
              header={'Features'}
              content={itemDetail?.description}
            ></Accordion>
            <Accordion
              header={'Token Info'}
              content={<TokenInfo />}
            ></Accordion>
          </div>
        </div>
        <div className="h-divider"></div>
        <div>
          <ThumbnailPreview data={itemDetail} previewToken />
        </div>
      </div>
    </Container>

    //   <section>
    //     <Container>
    //       <div className={styles.wrapper}>
    //         <div className={styles.leftWrapper}>
    //           <div className={styles.itemInfo}>
    //             <h3>{itemDetail?.name}</h3>
    //             <b>projectID: {projectID}</b>
    //             <Stack direction="horizontal" gap={2}>
    //               <AvatarInfo
    //                 imgSrc=""
    //                 width={40}
    //                 height={40}
    //                 leftContent={
    //                   <div>
    //                     <p>Owner</p>
    //                     <p>
    //                       {itemDetail?.owner?.displayName
    //                         ? itemDetail?.owner?.displayName
    //                         : itemDetail?.owner?.walletAddress}
    //                     </p>
    //                   </div>
    //                 }
    //               />
    //               <AvatarInfo
    //                 imgSrc=""
    //                 width={40}
    //                 height={40}
    //                 leftContent={
    //                   <div>
    //                     <p>Creator</p>
    //                     <p>
    //                       {itemDetail && itemDetail.project.creator
    //                         ? formatAddress(itemDetail.project.creator || '')
    //                         : formatAddress(
    //                             itemDetail?.project.creatorAddr || ''
    //                           )}
    //                     </p>
    //                   </div>
    //                 }
    //               />
    //               <AvatarInfo
    //                 imgSrc=""
    //                 width={40}
    //                 height={40}
    //                 leftContent={
    //                   <div>
    //                     <p>Minted on</p>
    //                     <p>{itemDetail?.mintedTime}</p>
    //                   </div>
    //                 }
    //               />
    //             </Stack>
    //             {/* <div className="divider"></div>
    //             <Stack direction="horizontal" gap={5} className={styles.stats}>
    //               <div>
    //                 <b>X.XX ETH</b>
    //                 <p>Price</p>
    //               </div>
    //               <div>
    //                 <b>X.XX ETH</b>
    //                 <p>Highest Offer</p>
    //               </div>
    //               <div>
    //                 <b>XX %</b>
    //                 <p>Royalty</p>
    //               </div>
    //             </Stack>
    //             <Stack direction="horizontal" gap={2}>
    //               <Button
    //                 onClick={handleBuy}
    //                 variants={'default'}
    //                 sizes={'large'}
    //               >
    //                 Buy now
    //               </Button>

    //               <Button onClick={handleOffer} disabled>
    //                 Make offer
    //               </Button>
    //             </Stack> */}
    //           </div>
    //           <Accordion header="Description" content={itemDetail?.description} />
    //           <Accordion header="Feature" content={renderAttributes()} />
    //           <div>
    //             <b>Token Info</b>
    //             <div className="divider"></div>
    //             <div className={styles.tokenInfo}>
    //               <Stack direction="horizontal" className="justify-between mt-3">
    //                 <b>Contract Address</b>
    //                 <p>
    //                   <Link
    //                     target={`_blank`}
    //                     href={`${scanURL}/token/${itemDetail?.project.genNFTAddr}`}
    //                   >
    //                     {formatAddress(itemDetail?.project.genNFTAddr || '')}
    //                   </Link>
    //                 </p>
    //               </Stack>
    //               <Stack direction="horizontal" className="justify-between">
    //                 <b>Token ID</b>
    //                 <p>
    //                   <Link
    //                     target={`_blank`}
    //                     href={`${scanURL}/token/${itemDetail?.project.genNFTAddr}?a=${tokenID}`}
    //                   >
    //                     {tokenID}
    //                   </Link>
    //                 </p>
    //               </Stack>
    //               <Stack direction="horizontal" className="justify-between">
    //                 <b>Token Standard</b>
    //                 <p>ERC-721</p>
    //               </Stack>
    //               <Stack direction="horizontal" className="justify-between">
    //                 <b>Blockchain</b>
    //                 <p>{getChainName()}</p>
    //               </Stack>
    //               <Stack direction="horizontal" className="justify-between">
    //                 <b>View Opensea</b>
    //                 <p>
    //                   <Link
    //                     target={`_blank`}
    //                     href={`${getOpenseaAssetUrl()}/${
    //                       itemDetail?.project.genNFTAddr
    //                     }/${tokenID}`}
    //                   >
    //                     Opensea
    //                   </Link>
    //                 </p>
    //               </Stack>
    //             </div>
    //           </div>
    //           <div>
    //             <b>Activities</b>
    //             <div className="divider"></div>
    //           </div>
    //         </div>
    //         <ThumbnailPreview data={itemDetail} />
    //         {/* <div className={styles.rightWrapper}>
    //           <div className={styles.thumbnail}>
    //             <div
    //               className={cs(
    //                 // startAnimaton ? 'opacity-100' : 'opacity-0',
    //                 startAnimaton ? 'd-block' : 'd-none',
    //                 styles.sandboxContainer
    //               )}
    //             >
    //               <SandboxPreview
    //                 ref={sandboxRef}
    //                 rawHtml={base64ToUtf8(
    //                   itemDetail.animationUrl.replace(
    //                     'data:text/html;base64,',
    //                     ''
    //                   )
    //                 )}
    //                 hash={''}
    //                 sandboxFiles={null}
    //                 // onLoaded={handleIframeLoaded}
    //               />
    //             </div>

    //             <Image
    //               src={convertIpfsToHttp(
    //                 itemDetail?.image ||
    //                   'ipfs://QmNTU5ctcffhZz5Hphd44yPivh2Y89pDYYG8QQ6yWGY3wn'
    //               )}
    //               alt={itemDetail.name}
    //               fill
    //               style={{ width: '100%' }}
    //               className={cs(
    //                 startAnimaton ? 'd-none' : 'd-block'

    //                 // startAnimaton ? 'opacity-0' : 'opacity-100'
    //               )}
    //               sizes="(max-width: 768px) 100vw,
    // (max-width: 1200px) 25vw"
    //             />
    //           </div>
    //           <Stack
    //             direction="horizontal"
    //             className={styles.actionButtons}
    //             gap={5}
    //           >
    //             <div onClick={handleAnimationTrigger}>
    //               {startAnimaton ? 'Stop' : 'Run'}
    //             </div>
    //             <div onClick={handleRefreshAnimation}>Refresh</div>
    //             {iframeSrc && (
    //               <Link href={iframeSrc} target={`_blank`} rel="noopener">
    //                 Open
    //               </Link>
    //             )}
    //           </Stack>
    //         </div> */}
    //       </div>
    //       {/* <h3>More on this Colleciton</h3> */}
    //       {/* <SandboxPreview
    //         ref={sandboxRef}
    //         rawHtml={base64ToUtf8(
    //           itemDetail.animationUrl.replace('data:text/html;base64,', '')
    //         )}
    //         hash={null}
    //         sandboxFiles={null}
    //         onLoaded={handleIframeLoaded}
    //       /> */}

    //       {/* <CollectionList/> */}
    //     </Container>
    //   </section>
  );
};

export default GenerativeTokenDetail;
