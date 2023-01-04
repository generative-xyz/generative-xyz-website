import Heading from '@components/Heading';
import {
  IGetProjectDetailResponse,
  IProjectItem,
} from '@interfaces/api/project';
import { useRouter } from 'next/router';
import Avatar from '@components/Avatar';
import ButtonIcon from '@components/ButtonIcon';
import ProgressBar from '@components/ProgressBar';
import SvgInset from '@components/SvgInset';
import Text from '@components/Text';
import ThumbnailPreview from '@components/ThumbnailPreview';
import { CDN_URL, NETWORK_CHAIN_ID } from '@constants/config';
import { ROUTE_PATH } from '@constants/route-path';
import { base64ToUtf8, formatAddress } from '@utils/format';
import dayjs from 'dayjs';
import s from './styles.module.scss';
import { useEffect, useMemo, useState } from 'react';
import MintGenerativeNFTOperation from '@services/contract-operations/generative-nft/mint-generative-nft';
import useContractOperation from '@hooks/useContractOperation';
import { IMintGenerativeNFTParams } from '@interfaces/contract-operations/mint-generative-nft';
import { TransactionReceipt } from 'web3-eth';
import { LogLevel } from '@enums/log-level';
import log from '@utils/logger';
import toast from 'react-hot-toast';

const LOG_PREFIX = 'ProjectIntroSection';

type Props = {
  project: IGetProjectDetailResponse | null;
};

const MOCK_DATE = '2022-12-30T03:51:28.986Z';

const ProjectIntroSection = ({ project }: Props) => {
  const router = useRouter();
  const [projectDetail, setProjectDetail] =
    useState<Omit<IProjectItem, 'owner'>>();
  const creatorProfile = project?.creatorProfile;
  const createdDate = dayjs(MOCK_DATE).format('MMM DD');
  const createdYear = dayjs(MOCK_DATE).format('YYYY');
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

      await mintToken({
        projectAddress: project.genNFTAddr,
        mintFee: project.mintPrice.toString(),
        chainID: NETWORK_CHAIN_ID,
      });
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
          {project?.name}
        </Heading>
        <div className={s.usersInfo}>
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
              <Heading as="h5" fontWeight="bold">
                {createdDate}
              </Heading>
              <Text fontWeight="semibold" className={s.usersInfo_subText}>
                {createdYear}
              </Text>
            </div>
          </div>
          <div className={s.usersInfo_item}>
            {creatorProfile && (
              <Avatar imgSrcs={creatorProfile?.avatar} width={34} height={34} />
            )}
            <div>
              <Text
                size="12"
                fontWeight="bold"
                className={s.usersInfo_mainText}
              >
                Creator
              </Text>
              <Text fontWeight="semibold">
                {creatorProfile?.displayName ||
                  formatAddress(
                    creatorProfile?.walletAddress || project?.creatorAddr || ''
                  )}
              </Text>
            </div>
          </div>
        </div>
        <ProgressBar
          current={project?.mintingInfo?.index}
          total={project?.maxSupply}
          className={s.progressBar}
        />
        <div className={s.CTA}>
          <ButtonIcon
            sizes="large"
            endIcon={
              <SvgInset svgUrl={`${CDN_URL}/icons/ic-arrow-right-18x18.svg`} />
            }
            disabled={isMinting}
            onClick={handleMintToken}
          >
            {isMinting && 'Minting...'}
            {!isMinting && (
              <>{isProjectDetailPage ? 'Mint iteration now' : 'Mint now'}</>
            )}
          </ButtonIcon>
          {!isProjectDetailPage && (
            <ButtonIcon
              sizes="large"
              variants="ghost"
              onClick={() =>
                router.push(`${ROUTE_PATH.GENERATIVE}/${project?.tokenID}`)
              }
            >
              Explore this collection
            </ButtonIcon>
          )}
        </div>
        {isProjectDetailPage && (
          <div className={s.stats}>
            <div className={s.stats_item}>
              <Text size="12" fontWeight="bold">
                Items
              </Text>
              <Text size="18" fontWeight="bold">
                {project?.mintingInfo?.index}
              </Text>
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
              <Text size="18" fontWeight="bold">
                {(project?.royalty || 0) / 100}%
              </Text>
            </div>
          </div>
        )}
        {project?.desc.length > 0 && (
          <div className={s.description}>
            <Text size="14" fontWeight="bold" className="text-secondary-color">
              DESCRIPTION
            </Text>
            <Text size="18" fontWeight="medium">
              {project?.desc}
            </Text>
          </div>
        )}
      </div>
      <div className="h-divider"></div>
      <div>
        <ThumbnailPreview data={projectDetail} allowVariantion />
      </div>
    </div>
  );
};

export default ProjectIntroSection;
