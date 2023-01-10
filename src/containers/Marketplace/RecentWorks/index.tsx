import React, { useMemo, useState } from 'react';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import s from './RecentWorks.module.scss';
import Heading from '@components/Heading';
import { ProjectCard } from '@components/ProjectCard';
import { Project } from '@interfaces/project';
import { getProjectList } from '@services/project';
import useAsyncEffect from 'use-async-effect';
import { GENERATIVE_PROJECT_CONTRACT } from '@constants/contract-address';
import Select, { SingleValue } from 'react-select';
import { ProjectList } from '@components/ProjectLists';
import { Loading } from '@components/Loading';

const SORT_OPTIONS: Array<{ value: string; label: string }> = [
  {
    value: '',
    label: 'All',
  },
  {
    value: 'progress',
    label: 'Minting in progress',
  },
  {
    value: 'fully',
    label: 'Fully minted',
  },
];

export const RecentWorks = (): JSX.Element => {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [projects, setProjects] = useState<Project[]>([]);
  const [sort, setSort] = useState<string | null>(null);
  const selectedOption = useMemo(() => {
    return SORT_OPTIONS.find(op => sort === op.value) ?? SORT_OPTIONS[0];
  }, [sort]);

  const sortChange = async (): Promise<void> => {
    const tmpProject = await getProjectList({
      contractAddress: String(GENERATIVE_PROJECT_CONTRACT),
      limit: 12,
      page: 1,
    });
    setIsLoaded(true);
    setProjects(tmpProject.result);
  };

  useAsyncEffect(async () => {
    sortChange();
  }, []);

  return (
    <div className={s.recentWorks}>
      <Row style={{ justifyContent: 'space-between' }}>
        <Col xs={'auto'}>
          <Heading as="h4" fontWeight="bold">
            Explore collections
          </Heading>
        </Col>
        <Col xs={'auto'}>
          <div className={s.dropDownWrapper}>
            <Select
              isSearchable={false}
              isClearable={false}
              defaultValue={selectedOption}
              options={SORT_OPTIONS}
              className={s.selectInput}
              classNamePrefix="select"
              onChange={(val: SingleValue<any>) => {
                sortChange(val.value);
              }}
            />
          </div>
        </Col>
      </Row>
      <Row className={s.recentWorks_projects}>
        <Loading isLoaded={isLoaded} />
        {isLoaded && <ProjectList listData={projects} />}
      </Row>
    </div>
  );
};
