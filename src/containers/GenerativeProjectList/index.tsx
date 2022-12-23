import s from './styles.module.scss';
import React, { useEffect, useState } from 'react';
import { GENERATIVE_PROJECT_CONTRACT } from '@constants/contract-address';
import { LogLevel } from '@enums/log-level';
import { IProjectDetail } from '@interfaces/api/project';
import { getProjectList } from '@services/project';
import log from '@utils/logger';
import Link from '@components/Link';
import Image from 'next/image';
import { ROUTE_PATH } from '@constants/route-path';

const LOG_PREFIX = 'GenerativeProjectList';

const GenerativeProjectList: React.FC = (): React.ReactElement => {
  const [projects, setProjects] = useState<Array<IProjectDetail>>([]);

  const fetchProjectList = async (): Promise<void> => {
    try {
      const { result } = await getProjectList({
        limit: 1000,
        page: 1,
        contractAddress: GENERATIVE_PROJECT_CONTRACT,
      });
      setProjects(result);
    } catch (_: unknown) {
      log('failed to fetch project list data', LogLevel.Error, LOG_PREFIX);
    }
  };

  useEffect(() => {
    fetchProjectList();
  }, []);

  const renderProjectItem = (project: IProjectDetail) => {
    const { tokenID } = project;

    return (
      <div key={tokenID} className="col-4">
        <div className={s.projectItem}>
          <Image src={project.image} alt={project.name} />
          <Link href={`${ROUTE_PATH.GENERATIVE}/${tokenID}`}>#{tokenID}</Link>
        </div>
      </div>
    );
  };

  return (
    <section>
      <div className="container">
        <div className="row">
          {projects.map((project: IProjectDetail) =>
            renderProjectItem(project)
          )}
        </div>
      </div>
    </section>
  );
};

export default GenerativeProjectList;
