import { RecentWorks } from '@containers/Marketplace/RecentWorks';
import { LogLevel } from '@enums/log-level';
import { Project } from '@interfaces/project';
import { getRandomProject } from '@services/project';
import log from '@utils/logger';
import { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import ProjectIntroSection from './ProjectIntroSection';

import s from './Marketplace.module.scss';

const LOG_PREFIX = 'Marketplace';

const Marketplace = () => {
  const [projectInfo, setProjectInfo] = useState<Project | undefined>();

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
      </Container>
      <div className={s.marketplaceContainer_recentWorks}>
        <Container>
          <RecentWorks />
        </Container>
      </div>
    </>
  );
};

export default Marketplace;
