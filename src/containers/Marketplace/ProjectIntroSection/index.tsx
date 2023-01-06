import ButtonIcon from '@components/ButtonIcon';
import Heading from '@components/Heading';
import ProgressBar from '@components/ProgressBar';
import SvgInset from '@components/SvgInset';
import Text from '@components/Text';
import ThumbnailPreview from '@components/ThumbnailPreview';
import { CDN_URL, NETWORK_CHAIN_ID } from '@constants/config';
import { ROUTE_PATH } from '@constants/route-path';
import { LogLevel } from '@enums/log-level';
import useContractOperation from '@hooks/useContractOperation';
import {
  IGetProjectDetailResponse,
  IProjectItem,
} from '@interfaces/api/project';
import { IMintGenerativeNFTParams } from '@interfaces/contract-operations/mint-generative-nft';
import { getUserSelector } from '@redux/user/selector';
import MintGenerativeNFTOperation from '@services/contract-operations/generative-nft/mint-generative-nft';
import { WalletManager } from '@services/wallet';
import { isTestnet } from '@utils/chain';
import { base64ToUtf8, formatAddress } from '@utils/format';
import log from '@utils/logger';
import BN from 'bn.js';
import _get from 'lodash/get';
import { useRouter } from 'next/router';
import { useEffect, useMemo, useState } from 'react';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import Web3 from 'web3';
import { TransactionReceipt } from 'web3-eth';
import s from './styles.module.scss';
import Accordion from '@components/Accordion';
import Link from '@components/Link';
import dayjs from 'dayjs';
import Skeleton from '@components/Skeleton';

const LOG_PREFIX = 'ProjectIntroSection';

type Props = {
  project: IGetProjectDetailResponse | null;
};

const ProjectIntroSection = ({ project }: Props) => {
  const user = useSelector(getUserSelector);
  const router = useRouter();
  const [projectDetail, setProjectDetail] =
    useState<Omit<IProjectItem, 'owner'>>();
  // const creatorProfile = project?.creatorProfile;
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

  const handleMintToken = async () => {
    try {
      setIsMinting(true);

      if (!project) {
        return;
      }

      // check balance
      if (new BN(project.mintPrice).cmp(new BN(0)) == 1) {
        const walletManagerInstance = new WalletManager();
        if (walletManagerInstance) {
          const check = await walletManagerInstance.checkInsufficient(
            user.walletAddress,
            '0x0000000000000000000000000000000000000000',
            project.mintPrice.toString()
          );
          if (!check) {
            if (isTestnet()) {
              toast.error(
                'Insufficient funds testnet. Go to profile and get testnet faucet'
              );
            } else {
              toast.error('Insufficient funds.');
            }
            return;
          }
        }
      }

      const mintTx = await mintToken({
        projectAddress: project.genNFTAddr,
        mintFee: project.mintPrice.toString(),
        chainID: NETWORK_CHAIN_ID,
      });

      if (!mintTx) {
        toast.error('Something went wrong. Please try again.');
        return;
      }

      const tokenID: string | null = _get(
        mintTx,
        'events.Transfer.returnValues.tokenId',
        null
      );

      router.push(`/generative/${project.tokenID}/${tokenID}`);
    } catch (err: unknown) {
      log(err as Error, LogLevel.Error, LOG_PREFIX);
    } finally {
      setIsMinting(false);
    }
  };

  useEffect(() => {
    if (errorMessage) {
      toast.remove();
      toast.error('Oops. Something went wrong. Please try again later.');
      resetMintToken();
    }
  }, [errorMessage]);

  const isProjectDetailPage = useMemo(
    () => !!router.query?.projectID,
    [router.query?.projectID]
  );

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
      <div className={s.info}>
        {!isProjectDetailPage && (
          <Heading
            as="h5"
            fontWeight="semibold"
            className="text-secondary-color"
          >
            Recent Collection
          </Heading>
        )}
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
          {project?.status ? (
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
                    {isProjectDetailPage ? 'Mint iteration now' : 'Mint now'} Ξ
                    {Web3.utils.fromWei(project?.mintPrice, 'ether')}
                  </>
                )}
              </ButtonIcon>
            </>
          ) : (
            <Skeleton width={200} height={56} isLoaded={!!project?.status} />
          )}
          {!isProjectDetailPage && (
            <Link
              className={s.explore_btn}
              href={`${ROUTE_PATH.GENERATIVE}/${project?.tokenID}`}
            >
              Explore this collection
            </Link>
          )}
        </div>
        {isProjectDetailPage ? (
          <>
            <div className={s.stats}>
              <div className={s.stats_item}>
                <Text size="12" fontWeight="bold">
                  Items
                </Text>
                <Heading as="h4" fontWeight="bold">
                  {project?.mintingInfo?.index}
                </Heading>
              </div>
              {/* <div className={s.stats_item}>
            <Text size='12' fontWeight='bold'>Total Volume</Text>
            <Text size='18' fontWeight='bold'></Text>
          </div>
          <div className={s.stats_item}>
            <Text size='12' fontWeight='bold'>Floor price</Text>
            <Text size='18' fontWeight='bold'></Text>
          </div>
          <div className={s.stats_item}>
            <Text size='12' fontWeight='bold'>highest offer</Text>
            <Text size='18' fontWeight='bold'></Text>
          </div> */}
              <div className={s.stats_item}>
                <Text size="12" fontWeight="bold">
                  royalty
                </Text>
                <Heading as="h4" fontWeight="bold">
                  {(project?.royalty || 0) / 100}%
                </Heading>
              </div>
            </div>
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
                    {/* TODO: Update corect profile link */}
                    <Link href={ROUTE_PATH.PROFILE}>
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
          </>
        ) : (
          <>
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
          </>
        )}
      </div>
      <div className={isProjectDetailPage ? `h-divider` : ''}></div>
      <div>
        <ThumbnailPreview data={projectDetail} allowVariantion />
      </div>
    </div>
  );
};

export default ProjectIntroSection;
