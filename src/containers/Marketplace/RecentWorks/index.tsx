import { useState } from 'react';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import s from './RecentWorks.module.scss';
import Heading from '@components/Heading';
import { ProjectCard } from '@components/ProjectCard';
import { Project } from '@interfaces/project';
import { getProjectList } from '@services/project';
import useAsyncEffect from 'use-async-effect';
import { GENERATIVE_PROJECT_CONTRACT } from '@constants/contract-address';

export const RecentWorks = (): JSX.Element => {
  const [projects, setProjects] = useState<Project[]>([]);

  useAsyncEffect(async () => {
    const tmpProject = await getProjectList({
      contractAddress: String(GENERATIVE_PROJECT_CONTRACT),
    });

    setProjects(tmpProject.result);
  }, []);

  return (
    <div className={s.recentWorks}>
      <Row>
        <Col xs="3">
          <span>Recent works</span>
          <Heading as="h3" fontWeight={'bold'}>
            Join the Elite Collectors Club.
          </Heading>
          <p>
            Join the elite collectors by exploring our list of mintable
            collections. These rare and highly sought-after items will add value
            and prestige to your collection.
          </p>
        </Col>
        <Col xs="9">
          <div className={s.recentWorks_slider}>
            {projects.map(project => {
              return (
                <div key={project.id} className={s.recentWorks_slider_item}>
                  <ProjectCard project={project} />
                </div>
              );
            })}
          </div>
        </Col>
      </Row>
    </div>
  );
};
