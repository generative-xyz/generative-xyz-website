import { IGetProjectDetailResponse } from '@interfaces/api/project';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import styles from './styles.module.scss';
import { getProjectDetail } from '@services/project';
import Image from 'next/image';
import { convertIpfsToHttp } from '@utils/image';
import { Button, Container, Stack, Tab, Tabs } from 'react-bootstrap';
import cs from 'classnames';
import CollectionItem from '@components/Collection/Item';

const GenerativeProjectDetail: React.FC = (): React.ReactElement => {
  const router = useRouter();
  const { projectID } = router.query as { projectID: string };

  const [projectInfo, setprojectInfo] = useState<IGetProjectDetailResponse>();

  const fetchProjectDetail = async (): Promise<void> => {
    if (projectID) {
      const data = await getProjectDetail({ projectID });
      setprojectInfo(data);
    }
  };

  // TODO: Handle mint actions
  const handleMintToken = () => {
    return;
  };

  useEffect(() => {
    fetchProjectDetail();
  }, [projectID]);

  return (
    <section>
      <Container>
        <div className={styles.projectInfo}>
          <div className={styles.thumbnail}>
            <Image
              src={convertIpfsToHttp(projectInfo?.image || '')}
              fill
              style={{ objectFit: 'cover', width: '100%' }}
              alt={'project thumbnail image'}
            />
          </div>
          <div className={styles.info}>
            <h2>{projectInfo?.name}</h2>
            <Stack direction="horizontal" gap={5}>
              <Stack direction="horizontal" className={styles.creator} gap={2}>
                <div className="skeleton avatar"></div>
                <div>
                  <p>Creator</p>
                  <p>{projectInfo?.creator || projectInfo?.creatorAddr}</p>
                </div>
              </Stack>
              <Stack direction="horizontal" className={styles.createdDate}>
                <div className="skeleton avatar"></div>
                <div>
                  <p>Created date</p>
                  <p>{projectInfo?.creator || projectInfo?.creatorAddr}</p>
                </div>
              </Stack>
            </Stack>
            <div className={styles.mintProgress}>
              <p>
                <b>
                  {/* TODO: Update mint number */}
                  {projectInfo?.limit} / {projectInfo?.maxSupply} minted
                </b>
              </p>
              <div className={cs(styles.progressWrapper, 'skeleton')}>
                {/* TODO: Update mint progress */}
                <div
                  className={styles.progressBar}
                  style={{ width: '95%' }}
                ></div>
              </div>
            </div>
            {projectInfo?.status && (
              <Button onClick={handleMintToken}>Mint iteration now</Button>
            )}
            <Stack direction="horizontal" className={styles.meta} gap={5}>
              <div>Items</div>
              <div>Total volume</div>
              <div>Floor price</div>
              <div>Highest offer</div>
              <div>Royalty</div>
            </Stack>
          </div>
        </div>
        <Tabs
          defaultActiveKey="profile"
          id="uncontrolled-tab-example"
          className="mt-4"
        >
          <Tab eventKey="items" title="Items">
            <div className="grid grid-cols-4 mt-4">
              <CollectionItem />
              <CollectionItem />
              <CollectionItem />
              <CollectionItem />
            </div>
          </Tab>
          <Tab eventKey="analytics" title="Analytics" disabled>
            Analytics
          </Tab>
          <Tab eventKey="activity" title="Activity" disabled>
            Activity
          </Tab>
        </Tabs>
      </Container>
    </section>
  );
};

export default GenerativeProjectDetail;
