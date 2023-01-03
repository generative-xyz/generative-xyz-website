import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import ProjectIntroSection from './ProjectIntroSection';
import { getRandomProject } from '@services/project';
import { LogLevel } from '@enums/log-level';
import log from '@utils/logger';
import { GridDebug } from '@components/Grid/grid';
import { RecentWorks } from '@containers/Marketplace/RecentWorks';
import { Project } from '@interfaces/project';

import s from './Marketplace.module.scss';

const LOG_PREFIX = 'Marketplace';

const Marketplace = () => {
  const [projectInfo, setProjectInfo] = useState<Project>({
    id: '',
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
    scriptType: [''],
    social: {
      web: '',
      twitter: '',
      discord: '',
      medium: '',
      instagram: '',
    },
    scripts: [''],
    styles: '',
    completeTime: 0,
    genNFTAddr: '',
    itemDesc: '',
    status: false,
    nftTokenURI: '',
    projectURI: '',
    tokenID: '',
    mintingInfo: {
      index: 0,
      indexReserve: 0,
    },
    creatorProfile: {
      displayName: '',
      bio: '',
      avatar: '',
      walletAddress: '',
      id: '',
      createdAt: '',
      profileSocial: {
        web: '',
        twitter: '',
        discord: '',
        medium: '',
        instagram: '',
      },
    },
  });

  const fetchRandomProject = async () => {
    try {
      const res = await getRandomProject();
      setProjectInfo(res);
    } catch (err: unknown) {
      log('failed to fetch random project', LogLevel.Error, LOG_PREFIX);
      throw Error();
    }
  };

  useEffect(() => {
    fetchRandomProject();
  }, []);

  return (
    <>
      <Container className={s.marketplaceContainer}>
        <ProjectIntroSection project={projectInfo} />
        <RecentWorks />
      </Container>
      <GridDebug />
    </>
  );
};

export default Marketplace;
