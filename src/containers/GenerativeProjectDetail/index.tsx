import CollectionList from '@components/Collection/List';
import ClientOnly from '@components/Utils/ClientOnly';
import { GENERATIVE_PROJECT_CONTRACT } from '@constants/contract-address';
import ProjectIntroSection from '@containers/Marketplace/ProjectIntroSection';
import { LogLevel } from '@enums/log-level';
import { setProjectCurrent } from '@redux/project/action';
import { getProjectDetail, getProjectItems } from '@services/project';
import { base64ToUtf8 } from '@utils/format';
import log from '@utils/logger';
import _get from 'lodash/get';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { Container, Tab, Tabs } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import TokenTopFilter from './TokenTopFilter';
import styles from './styles.module.scss';
import { Loading } from '@components/Loading';
import { Project } from '@interfaces/project';
import { Token } from '@interfaces/token';

const LOG_PREFIX = 'GenerativeProjectDetail';

const GenerativeProjectDetail: React.FC = (): React.ReactElement => {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const router = useRouter();
  const dispatch = useDispatch();
  const { projectID } = router.query as { projectID: string };
  const [projectInfo, setProjectInfo] = useState<Project | null>(null);

  const [listItems, setListItems] = useState<Token[]>([]);

  const fetchProjectDetail = async (): Promise<void> => {
    if (projectID) {
      try {
        const data = await getProjectDetail({
          contractAddress: GENERATIVE_PROJECT_CONTRACT,
          projectID,
        });
        dispatch(setProjectCurrent(data));
        setProjectInfo(data);
      } catch (_: unknown) {
        log('failed to fetch project detail data', LogLevel.Error, LOG_PREFIX);
      }
    }
  };

  const fetchProjectItems = async (): Promise<void> => {
    if (projectInfo?.genNFTAddr) {
      try {
        const res = await getProjectItems(
          {
            contractAddress: projectInfo.genNFTAddr,
          },
          {
            limit: 20,
            page: 1,
            // sort: 'price-asc',
            // name: '11',
            // attributes: [''],
            // minPrice: '200000000',
            // maxPrice: '3000000',
          }
        );
        setListItems(res.result);
        setIsLoaded(true);
      } catch (_: unknown) {
        log('failed to fetch project items data', LogLevel.Error, LOG_PREFIX);
      }
    }
  };

  // const openseaUrl = useMemo(() => {
  //   const openseaAssetURL = getOpenseaAssetUrl();
  //   if (!openseaAssetURL) {
  //     return null;
  //   }
  //   return `${openseaAssetURL}/${GENERATIVE_PROJECT_CONTRACT}/${projectID}`;
  // }, [projectID]);

  useEffect(() => {
    if (!projectInfo) return;
    const _projectDetail = base64ToUtf8(
      projectInfo.projectURI.replace('data:application/json;base64,', '')
    );
    if (_projectDetail) {
      // const projectDetailObj = JSON.parse(_projectDetail);
      // setProjectDetail(projectDetailObj);
    }
  }, [projectInfo?.id]);

  useEffect(() => {
    fetchProjectDetail();
  }, [projectID]);

  useEffect(() => {
    fetchProjectItems();
  }, [projectInfo]);

  return (
    <section>
      <Container>
        <ProjectIntroSection project={projectInfo} />
        <ClientOnly>
          <Tabs className={styles.tabs} defaultActiveKey="items">
            <Tab tabClassName={styles.tab} eventKey="items" title="Items">
              <div className={styles.filterWrapper}>
                <TokenTopFilter
                  keyword=""
                  sort=""
                  onKeyWordChange={() => {
                    //
                  }}
                  onSortChange={() => {
                    //
                  }}
                />
              </div>
              <div className={styles.tokenListWrapper}>
                <Loading isLoaded={isLoaded} />
                {isLoaded && (
                  <div className={styles.tokenList}>
                    <CollectionList
                      projectInfo={projectInfo}
                      listData={listItems}
                    />
                  </div>
                )}
              </div>
            </Tab>
          </Tabs>
        </ClientOnly>
      </Container>
    </section>
  );
};

export default GenerativeProjectDetail;
