import s from './styles.module.scss';
import React, { Fragment, useEffect, useState } from 'react';
import { GENERATIVE_PROJECT_CONTRACT } from '@constants/contract-address';
import { LogLevel } from '@enums/log-level';
import { getProjectList } from '@services/project';
import log from '@utils/logger';
import Link from '@components/Link';
import Image from 'next/image';
import { ROUTE_PATH } from '@constants/route-path';
import { convertIpfsToHttp } from '@utils/image';
import { Project } from '@interfaces/project';

const LOG_PREFIX = 'GenerativeProjectList';

const GenerativeProjectList: React.FC = (): React.ReactElement => {
  const [projects, setProjects] = useState<Array<Project>>([]);

  const fetchProjectList = async (): Promise<void> => {
    try {
      const { result } = await getProjectList({
        limit: 100,
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

  const renderProjectItem = (project: Project) => {
    const { tokenID } = project;

    return (
      <div className="col-4 mb-4">
        <div className={s.projectItem}>
          <Image
            src={convertIpfsToHttp(
              project.image ||
                'ipfs://QmNTU5ctcffhZz5Hphd44yPivh2Y89pDYYG8QQ6yWGY3wn'
            )}
            alt={project.name}
            fill
            style={{ objectFit: 'cover', width: '100%' }}
            sizes="(max-width: 768px) 100vw,
              (max-width: 1200px) 25vw"
          />
        </div>
        <Link href={`${ROUTE_PATH.GENERATIVE}/${tokenID}`}>#{tokenID}</Link>
      </div>
    );
  };

  return (
    <section>
      <div className="container">
        <div className="row">
          {projects.map((project: Project) => (
            <Fragment key={project.id}>{renderProjectItem(project)}</Fragment>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GenerativeProjectList;
