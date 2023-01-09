import { useState, useEffect } from 'react';

import s from './ProjectCard.module.scss';

import { Project } from '@interfaces/project';
import { CreatorInfo } from '@components/CreatorInfo';
import { User } from '@interfaces/user';
import { LOGO_MARKETPLACE_URL } from '@constants/common';
import Heading from '@components/Heading';
import ProgressBar from '@components/ProgressBar';
import { ROUTE_PATH } from '@constants/route-path';
import { useRouter } from 'next/router';
import { convertIpfsToHttp } from '@utils/image';

interface IPros {
  project: Project;
}

export const ProjectCard = ({ project }: IPros): JSX.Element => {
  const router = useRouter();
  const [creator, setCreator] = useState<User | null>(null);

  const [thumb, setThumb] = useState<string>(project.image);

  const onThumbError = () => {
    setThumb(LOGO_MARKETPLACE_URL);
  };

  useEffect(() => {
    if (project.creatorProfile) {
      setCreator(project.creatorProfile);
    }
  }, [project]);

  const onClick = () => {
    router.push(`${ROUTE_PATH.GENERATIVE}/${project.tokenID}`);
  };

  return (
    <div onClick={onClick} className={s.projectCard}>
      <div className={s.projectCard_inner}>
        <div
          className={`${s.projectCard_thumb} ${
            thumb === LOGO_MARKETPLACE_URL ? s.isDefault : ''
          }`}
        >
          <img
            onError={onThumbError}
            src={convertIpfsToHttp(thumb)}
            alt={project.name}
            loading={'lazy'}
          />
        </div>
        <div className={s.projectCard_info}>
          <div className={s.projectCard_info_title}>
            <Heading as={'h4'}>{project.name}</Heading>
          </div>
          {creator && <CreatorInfo creator={creator} />}
          <ProgressBar
            size={'small'}
            current={
              project.mintingInfo.index + project.mintingInfo.indexReserve
            }
            total={project.limit}
          />
        </div>
      </div>
    </div>
  );
};
