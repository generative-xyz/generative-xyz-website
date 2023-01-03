import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import ProjectIntroSection from './ProjectIntroSection';
import { IGetProjectDetailResponse } from '@interfaces/api/project';
import { getRandomProject } from '@services/project';
import { LogLevel } from '@enums/log-level';
import log from '@utils/logger';

const LOG_PREFIX = 'Marketplace';

const Marketplace = () => {
  const [projectInfo, setProjectInfo] = useState<IGetProjectDetailResponse>({
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
    <Container>
      <ProjectIntroSection project={projectInfo} />
    </Container>
  );
};

export default Marketplace;
