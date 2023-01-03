import { useState, useEffect } from 'react';

import s from './ProjectCard.module.scss';

import { Project } from '@interfaces/project';
import Image from 'next/image';
import { CreatorInfo } from '@components/CreatorInfo';
import { User } from '@interfaces/user';
import { CDN_URL } from '@constants/config';
import { LOGO_MARKETPLACE_URL } from '@constants/common';
import Heading from '@components/Heading';
import ProgressBar from '@components/ProgressBar';

interface IPros {
  project: Project;
}

export const ProjectCard = ({ project }: IPros): JSX.Element => {
  const [creator, setCreator] = useState<User>({
    displayName: 'MeoMeo',
    bio: 'test_bio',
    avatar: `${CDN_URL}/images/default-avatar.svg`,
    walletAddress: '0x0000000',
    id: '1',
  });

  useEffect(() => {
    if (project.creatorProfile) {
      setCreator(project.creatorProfile);
    }
  }, [project]);

  return (
    <div className={s.projectCard}>
      <div className={s.projectCard_inner}>
        <div
          className={`${s.projectCard_thumb} ${
            !project.image ? s.isDefault : ''
          }`}
        >
          <img
            src={project.image || LOGO_MARKETPLACE_URL}
            alt={project.name}
            loading={'lazy'}
          />
        </div>
        <div className={s.projectCard_info}>
          <CreatorInfo creator={creator} />
          <Heading as={'h4'} className={s.projectCard_info_title}>
            {project.name}
          </Heading>
          <ProgressBar size={'small'} />
        </div>
      </div>
    </div>
  );
};
