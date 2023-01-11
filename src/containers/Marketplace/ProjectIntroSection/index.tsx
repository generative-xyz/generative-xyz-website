import Accordion from '@components/Accordion';
import ButtonIcon from '@components/ButtonIcon';
import Heading from '@components/Heading';
import Link from '@components/Link';
import { Loading } from '@components/Loading';
import ProgressBar from '@components/ProgressBar';
import Skeleton from '@components/Skeleton';
import SvgInset from '@components/SvgInset';
import Text from '@components/Text';
import ThumbnailPreview from '@components/ThumbnailPreview';
import { CDN_URL, NETWORK_CHAIN_ID } from '@constants/config';
import { ROUTE_PATH } from '@constants/route-path';
import { WalletContext } from '@contexts/wallet-context';
import { ErrorMessage } from '@enums/error-message';
import { LogLevel } from '@enums/log-level';
import useContractOperation from '@hooks/useContractOperation';
import { IGetProjectDetailResponse } from '@interfaces/api/project';
import { IMintGenerativeNFTParams } from '@interfaces/contract-operations/mint-generative-nft';
import { MarketplaceStats } from '@interfaces/marketplace';
import { Token } from '@interfaces/token';
import { getUserSelector } from '@redux/user/selector';
import MintGenerativeNFTOperation from '@services/contract-operations/generative-nft/mint-generative-nft';
import { getMarketplaceStats } from '@services/marketplace';
import { isTestnet } from '@utils/chain';
import { convertToETH } from '@utils/currency';
import { base64ToUtf8, formatAddress } from '@utils/format';
import log from '@utils/logger';
import dayjs from 'dayjs';
import _get from 'lodash/get';
import { useRouter } from 'next/router';
import { useContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import Web3 from 'web3';
import { TransactionReceipt } from 'web3-eth';
import s from './styles.module.scss';

const LOG_PREFIX = 'ProjectIntroSection';

type Props = {
  project?: IGetProjectDetailResponse;
};

const ProjectIntroSection = ({ project }: Props) => {
  const { walletBalance } = useContext(WalletContext);
  const user = useSelector(getUserSelector);
  const router = useRouter();
  const [projectDetail, setProjectDetail] = useState<Omit<Token, 'owner'>>();
  const [marketplaceStats, setMarketplaceStats] =
    useState<MarketplaceStats | null>(null);
  const mintedTime = project?.mintedTime;
  let mintDate = dayjs();
  if (mintedTime) {
    mintDate = dayjs(mintedTime);
  }
  const mintedDate = mintDate.format('MMM DD, YYYY');
  const {
    call: mintToken,
    reset: resetMintToken,
    errorMessage,
  } = useContractOperation<IMintGenerativeNFTParams, TransactionReceipt>(
    MintGenerativeNFTOperation,
    true
  );
  const [isMinting, setIsMinting] = useState(false);

  const handleFetchMarketplaceStats = async () => {
    try {
      if (projectDetail && project?.genNFTAddr) {
        const res = await getMarketplaceStats({
          collectionAddr: project?.genNFTAddr,
        });
        if (res) setMarketplaceStats(res?.stats);
      }
    } catch (e) {
      log('can not fetch price', LogLevel.Error, '');
    }
  };

  const handleMintToken = async () => {
    try {
      setIsMinting(true);

      if (!project) {
        return;
      }

      if (
        walletBalance <
        parseFloat(Web3.utils.fromWei(project.mintPrice.toString()))
      ) {
        if (isTestnet()) {
          toast.error(
            'Insufficient funds testnet. Go to profile and get testnet faucet'
          );
        } else {
          toast.error('Insufficient funds.');
        }
        return;
      }

      const mintTx = await mintToken({
        projectAddress: project.genNFTAddr,
        mintFee: project.mintPrice.toString(),
        chainID: NETWORK_CHAIN_ID,
      });

      if (!mintTx) {
        toast.error(ErrorMessage.DEFAULT);
        return;
      }

      const tokenID: string | null = _get(
        mintTx,
        'events.Transfer.returnValues.tokenId',
        null
      );
      setTimeout(() => {
        router.push(`/generative/${project.tokenID}/${tokenID}`);
      }, 1000);
    } catch (err: unknown) {
      log(err as Error, LogLevel.Error, LOG_PREFIX);
    } finally {
      setIsMinting(false);
    }
  };

  const isProjectDetailPage = !!router.query.projectID;

  // const offerAvailable = useMemo(() => {
  //   if (project?.mintingInfo?.index && project?.maxSupply) {
  //     return (
  //       project?.mintingInfo?.index > 0 &&
  //       project?.mintingInfo?.index <= project?.maxSupply
  //     );
  //   }
  //   return false;
  // }, [project?.mintingInfo?.index, project?.maxSupply]);

  useEffect(() => {
    handleFetchMarketplaceStats();
  }, [projectDetail]);

  const renderLeftContent = () => {
    if (!project && !marketplaceStats)
      return (
        <div className={s.info}>
          <Loading
            isLoaded={!!project && !!marketplaceStats}
            className={s.loading_project}
          />
        </div>
      );
    if (isProjectDetailPage) {
      return (
        <div className={s.info}>
          <Heading as="h4" fontWeight="bold" style={{ marginBottom: '16px' }}>
            {project?.name}
          </Heading>
          {project?.mintingInfo.index !== project?.maxSupply && (
            <ProgressBar
              current={project?.mintingInfo?.index}
              total={project?.maxSupply}
              className={s.progressBar}
            />
          )}
          {project?.status ? (
            <div className={s.CTA}>
              <ButtonIcon
                sizes="large"
                className={s.mint_btn}
                disabled={isMinting}
                onClick={handleMintToken}
              >
                {isMinting && 'Minting...'}
                {!isMinting && project?.mintPrice && (
                  <>
                    {'Mint iteration now'} Ξ
                    {Web3.utils.fromWei(project?.mintPrice, 'ether')}
                  </>
                )}
              </ButtonIcon>
            </div>
          ) : (
            <></>
          )}
          <div className={s.stats}>
            <div className={s.stats_item}>
              <Text size="12" fontWeight="bold">
                Items
              </Text>
              <Heading as="h4" fontWeight="bold">
                {project?.mintingInfo?.index}
              </Heading>
            </div>
            <div className={s.stats_item}>
              <Text size="12" fontWeight="bold">
                Total Volume
              </Text>
              <Heading as="h4" fontWeight="bold">
                {convertToETH(marketplaceStats?.totalTradingVolumn || '')}
              </Heading>
            </div>
            <div className={s.stats_item}>
              <Text size="12" fontWeight="bold">
                Floor price
              </Text>
              <Heading as="h4" fontWeight="bold">
                {convertToETH(marketplaceStats?.floorPrice || '')}
              </Heading>
            </div>
            <div className={s.stats_item}>
              <Text size="12" fontWeight="bold">
                Percent Listed
              </Text>
              <Heading as="h4" fontWeight="bold">
                {marketplaceStats?.listedPercent}%
              </Heading>
            </div>

            <div className={s.stats_item}>
              <Text size="12" fontWeight="bold">
                royalty
              </Text>
              <Heading as="h4" fontWeight="bold">
                {(project?.royalty || 0) / 100}%
              </Heading>
            </div>
          </div>
          {/* {offerAvailable && (
            <div className={s.CTA}>
              <ButtonIcon sizes="large" variants="outline">
                Make collection offer
              </ButtonIcon>
              <Text
                size="12"
                fontWeight="medium"
                className="text-secondary-color"
              >
                Make offer for any NFT from this collection
              </Text>
            </div>
          )} */}
          <div className={s.accordion_list}>
            {project?.desc && (
              <Accordion
                header={'DESCRIPTION'}
                content={
                  <Text size="18" fontWeight="semibold">
                    {project?.desc}
                  </Text>
                }
              ></Accordion>
            )}
            <Accordion
              header={'Collected by'}
              content={
                <Text size="18" fontWeight="semibold">
                  {project?.stats?.uniqueOwnerCount === 1
                    ? `${project?.stats?.uniqueOwnerCount} owner`
                    : `${project?.stats?.uniqueOwnerCount}+ owners`}
                </Text>
              }
            ></Accordion>
            <Accordion
              header={'Creator'}
              content={
                <>
                  <Link
                    href={
                      user?.walletAddress === project?.creatorAddr
                        ? ROUTE_PATH.PROFILE
                        : `${ROUTE_PATH.PROFILE}/${project?.creatorAddr}`
                    }
                  >
                    <Text as="span" size="18" fontWeight="semibold">
                      {project?.creatorProfile?.displayName ||
                        formatAddress(
                          project?.creatorAddr ||
                            project?.creatorProfile?.walletAddress ||
                            ''
                        )}
                    </Text>
                  </Link>
                  {user &&
                    user?.walletAddress &&
                    user?.walletAddress === project?.creatorAddr && (
                      <Text as="span" size="18" fontWeight="semibold">
                        {' '}
                        (by you)
                      </Text>
                    )}
                </>
              }
            ></Accordion>
            <Accordion
              header={'Created date'}
              content={
                <Text size="18" fontWeight="semibold">
                  {mintedDate}
                </Text>
              }
            ></Accordion>
          </div>
          <div className="divider"></div>
          <div className={s.license}>
            <Text size="14" fontWeight="semibold">
              License: {project?.license}
            </Text>
          </div>
        </div>
      );
    } else {
      return (
        <div className={s.info}>
          <Heading
            as="h5"
            fontWeight="semibold"
            className="text-secondary-color"
          >
            Recent Collection
          </Heading>
          <Heading as="h4" fontWeight="bold" style={{ marginBottom: '16px' }}>
            <Skeleton width={200} height={44} isLoaded={!!project?.name} />
            {project?.name}
          </Heading>
          <ProgressBar
            current={project?.mintingInfo?.index}
            total={project?.maxSupply}
            className={s.progressBar}
          />
          <div className={s.CTA}>
            <Skeleton
              width={200}
              height={56}
              isLoaded={!(typeof project?.status === 'undefined')}
            />
            {project?.status && (
              <>
                <ButtonIcon
                  sizes="large"
                  className={s.mint_btn}
                  endIcon={
                    <SvgInset
                      svgUrl={`${CDN_URL}/icons/ic-arrow-right-18x18.svg`}
                    />
                  }
                  disabled={isMinting}
                  onClick={handleMintToken}
                >
                  {isMinting && 'Minting...'}
                  {!isMinting && project?.mintPrice && (
                    <>
                      {'Mint now'} Ξ
                      {Web3.utils.fromWei(project?.mintPrice, 'ether')}
                    </>
                  )}
                </ButtonIcon>
              </>
            )}
            {project?.tokenID && (
              <Link
                className={s.explore_btn}
                href={`${ROUTE_PATH.GENERATIVE}/${project?.tokenID}`}
              >
                Explore this collection
              </Link>
            )}
          </div>
          {project?.desc && project?.desc.length > 0 ? (
            <div className={s.description}>
              <Text size="18" fontWeight="medium">
                {project?.desc}
              </Text>
            </div>
          ) : (
            <div className={s.description}>
              <Skeleton width={400} height={28} />
              <Skeleton width={400} height={28} />
              <Skeleton width={200} height={28} />
            </div>
          )}
        </div>
      );
    }
  };

  useEffect(() => {
    if (errorMessage) {
      toast.remove();
      toast.error(ErrorMessage.DEFAULT);
      resetMintToken();
    }
  }, [errorMessage]);

  useEffect(() => {
    if (!project) return;
    const _projectDetail = base64ToUtf8(
      project.projectURI.replace('data:application/json;base64,', '')
    );
    if (_projectDetail) {
      const projectDetailObj = JSON.parse(_projectDetail);
      setProjectDetail(projectDetailObj);
    }
  }, [project?.id]);

  return (
    <div className={s.wrapper} style={{ marginBottom: '100px' }}>
      {renderLeftContent()}
      <div className={isProjectDetailPage ? `h-divider` : ''}></div>
      <div>
        <ThumbnailPreview data={projectDetail} allowVariantion />
      </div>
    </div>
  );
};

export default ProjectIntroSection;
