import Accordion from '@components/Accordion';
import AvatarInfo from '@components/AvatarInfo';
import { GENERATIVE_PROJECT_CONTRACT } from '@constants/contract-address';
import { LogLevel } from '@enums/log-level';
import { IGetGenerativeTokenUriResponse } from '@interfaces/api/token-uri';
import { getTokenUri } from '@services/token-uri';
import log from '@utils/logger';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { Container, Stack } from 'react-bootstrap';
import styles from './styles.module.scss';
import { convertIpfsToHttp } from '@utils/image';
import { getChainName, getOpenseaAssetUrl, getScanUrl } from '@utils/chain';
import Link from '@components/Link';
import { formatAddress } from '@utils/format';

const LOG_PREFIX = 'GenerativeTokenDetail';

const GenerativeTokenDetail: React.FC = (): React.ReactElement => {
  const router = useRouter();
  const { projectID, tokenID } = router.query as {
    projectID: string;
    tokenID: string;
  };

  // const itemDetail: IGetGenerativeTokenUriResponse = MOCK;
  const [itemDetail, setItemDetail] = useState<IGetGenerativeTokenUriResponse>({
    name: '',
    description: '',
    image: '',
    animation_url: '',
    attributes: [],
    genNFTAddr: '', // TODO
    owner: {
      displayName: '',
      bio: '',
      avatar: '',
      walletAddress: '',
      id: '',
    },
    ownerAddress: '',
    project: {
      maxSupply: 0,
      limit: 0,
      mintPrice: '',
      mintPriceAddr: '',
      name: '',
      creator: '',
      creatorAddr: '',
      license: '',
      desc: '',
      image: '',
      scriptType: [],
      social: {
        Web: '',
        Twitter: '',
        Discord: '',
        Medium: '',
        Instagram: '',
      },
      scripts: [],
      styles: '',
      completeTime: 0,
      genNFTAddr: '',
      itemDesc: '',
      status: false,
      nftTokenURI: '',
      projectURI: '',
      royalty: 0,
      tokenID: '',
      mintingInfo: {
        index: 0,
        indexReserve: 0,
      },
    },
    mintedTime: '',
  });

  const scanURL = getScanUrl();

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

  const renderAttributes = () => {
    return (
      <>
        {itemDetail.attributes?.length > 0 &&
          itemDetail.attributes.map((attr, index: number) => (
            <div key={`${attr.trait_type}-${index}`}>{attr.trait_type}</div>
          ))}
      </>
    );
  };

  useEffect(() => {
    fetchItemDetail();
  }, [tokenID]);

  return (
    <section>
      <Container>
        <div className={styles.wrapper}>
          <div className={styles.leftWrapper}>
            <div className={styles.itemInfo}>
              <h3>{itemDetail?.name}</h3>
              <b>projectID: {projectID}</b>
              <Stack direction="horizontal" gap={2}>
                <AvatarInfo
                  imgSrc=""
                  width={40}
                  height={40}
                  leftContent={
                    <div>
                      <p>Owner</p>
                      <p>{itemDetail.owner.displayName}</p>
                    </div>
                  }
                />
                <AvatarInfo
                  imgSrc=""
                  width={40}
                  height={40}
                  leftContent={
                    <div>
                      <p>Creator</p>
                      <p>
                        {itemDetail.project.creator
                          ? itemDetail.project.creator
                          : formatAddress(itemDetail.project.creatorAddr)}
                      </p>
                    </div>
                  }
                />
                <AvatarInfo
                  imgSrc=""
                  width={40}
                  height={40}
                  leftContent={
                    <div>
                      <p>Minted on</p>
                      <p>{itemDetail.mintedTime}</p>
                    </div>
                  }
                />
              </Stack>
              {/* <div className="divider"></div>
              <Stack direction="horizontal" gap={5} className={styles.stats}>
                <div>
                  <b>X.XX ETH</b>
                  <p>Price</p>
                </div>
                <div>
                  <b>X.XX ETH</b>
                  <p>Highest Offer</p>
                </div>
                <div>
                  <b>XX %</b>
                  <p>Royalty</p>
                </div>
              </Stack>
              <Stack direction="horizontal" gap={2}>
                <Button
                  onClick={handleBuy}
                  variants={'default'}
                  sizes={'large'}
                >
                  Buy now
                </Button>

                <Button onClick={handleOffer} disabled>
                  Make offer
                </Button>
              </Stack> */}
            </div>
            <Accordion header="Description" content={itemDetail?.description} />
            <Accordion header="Feature" content={renderAttributes()} />
            <div>
              <b>Token Info</b>
              <div className="divider"></div>
              <div className={styles.tokenInfo}>
                <Stack direction="horizontal" className="justify-between mt-3">
                  <b>Contract Address</b>
                  <p>
                    <Link
                      target={`_blank`}
                      href={`${scanURL}/token/${itemDetail.project.genNFTAddr}`}
                    >
                      {formatAddress(itemDetail.project.genNFTAddr)}
                    </Link>
                  </p>
                </Stack>
                <Stack direction="horizontal" className="justify-between">
                  <b>Token ID</b>
                  <p>
                    <Link
                      target={`_blank`}
                      href={`${scanURL}/token/${itemDetail.project.genNFTAddr}?a=${tokenID}`}
                    >
                      {tokenID}
                    </Link>
                  </p>
                </Stack>
                <Stack direction="horizontal" className="justify-between">
                  <b>Token Standard</b>
                  <p>ERC-721</p>
                </Stack>
                <Stack direction="horizontal" className="justify-between">
                  <b>Blockchain</b>
                  <p>{getChainName()}</p>
                </Stack>
                <Stack direction="horizontal" className="justify-between">
                  <b>View Opensea</b>
                  <p>
                    <Link
                      target={`_blank`}
                      href={`${getOpenseaAssetUrl()}/${
                        itemDetail.project.genNFTAddr
                      }/${tokenID}`}
                    >
                      Opensea
                    </Link>
                  </p>
                </Stack>
              </div>
            </div>
            <div>
              <b>Activities</b>
              <div className="divider"></div>
            </div>
          </div>
          <div className={styles.thumbnail}>
            <Image
              src={convertIpfsToHttp(
                itemDetail?.image ||
                  'ipfs://QmZha95v86iME98rpxrJWbHerK3JjEHKkiGpdS4NgZKjdb'
              )}
              alt={itemDetail.name}
              fill
              style={{ width: '100%' }}
              sizes="(max-width: 768px) 100vw,
              (max-width: 1200px) 25vw"
            />
          </div>
        </div>
        <h3>More on this Colleciton</h3>

        {/* <CollectionList/> */}
      </Container>
    </section>
  );
};

export default GenerativeTokenDetail;
