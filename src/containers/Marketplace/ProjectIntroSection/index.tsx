import Heading from '@components/Heading';
import { IGetProjectDetailResponse } from '@interfaces/api/project';
import { useRouter } from 'next/router';

import Avatar from '@components/Avatar';
import ButtonIcon from '@components/ButtonIcon';
import ProgressBar from '@components/ProgressBar';
import SvgInset from '@components/SvgInset';
import Text from '@components/Text';
import { CDN_URL } from '@constants/config';
import { ROUTE_PATH } from '@constants/route-path';
import { formatAddress } from '@utils/format';
import dayjs from 'dayjs';
import s from './styles.module.scss';
import { useMemo } from 'react';

type Props = {
  project: IGetProjectDetailResponse;
};

const MOCK_DATE = '2022-12-30T03:51:28.986Z';

const ProjectIntroSection = ({ project }: Props) => {
  const router = useRouter();

  const { creatorProfile } = project;

  const createdDate = dayjs(MOCK_DATE).format('MMM DD');
  const createdYear = dayjs(MOCK_DATE).format('YYYY');

  const isProjectDetailPage = useMemo(
    () => !!router.query?.projectID,
    [router.query?.projectID]
  );

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
          {/* <div>
            <Avatar imgSrcs={[``, ``, ``]} width={40} height={40} />
          </div> */}
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
              <Text fontWeight="semibold" className="text-secondary-color">
                {creatorProfile?.displayName ||
                  formatAddress(creatorProfile?.walletAddress || '')}
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
          >
            {isProjectDetailPage ? 'Mint iteration now' : 'Mint now'}
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
      </div>
      <div className="h-divider"></div>
      <div></div>
    </div>
  );
};

export default ProjectIntroSection;
