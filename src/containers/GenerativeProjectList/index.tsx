import s from './styles.module.scss';
import React, { Fragment, useEffect, useState } from 'react';
import { GENERATIVE_PROJECT_CONTRACT } from '@constants/contract-address';
import { LogLevel } from '@enums/log-level';
import { getProjectList } from '@services/project';
import log from '@utils/logger';
import { Project } from '@interfaces/project';
import { ProjectCard } from '@components/ProjectCard';
import { Loading } from '@components/Loading';

const LOG_PREFIX = 'GenerativeProjectList';

const GenerativeProjectList: React.FC = (): React.ReactElement => {
  const [projects, setProjects] = useState<Array<Project>>([]);
  const [loaded, setLoaded] = useState(false);

  const fetchProjectList = async (): Promise<void> => {
    try {
      const { result } = await getProjectList({
        limit: 100,
        page: 1,
        contractAddress: GENERATIVE_PROJECT_CONTRACT,
      });
      setProjects(result);
      setLoaded(true);
    } catch (_: unknown) {
      log('failed to fetch project list data', LogLevel.Error, LOG_PREFIX);
    }
  };

  useEffect(() => {
    fetchProjectList();
  }, []);

  const renderProjectItem = (project: Project) => {
    return (
      <div className="col-2 mb-2">
        <ProjectCard project={project}></ProjectCard>
      </div>
    );
  };

  return (
    <section>
      <div className={s.container}>
        <Loading isLoaded={loaded}></Loading>
        {projects && (
          <div className="row">
            {projects.map((project: Project) => (
              <Fragment key={project.id}>{renderProjectItem(project)}</Fragment>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default GenerativeProjectList;
