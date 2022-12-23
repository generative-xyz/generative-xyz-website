import CollectionList from '@components/Collection/List';
import { GENERATIVE_PROJECT_CONTRACT } from '@constants/contract-address';
import {
  IGetProjectDetailResponse,
  IProjectItem,
} from '@interfaces/api/project';
import { getProjectDetail, getProjectItems } from '@services/project';
import { convertIpfsToHttp } from '@utils/image';
import cs from 'classnames';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useEffect, useMemo, useState } from 'react';
import {
  Button,
  Container,
  Form,
  InputGroup,
  Stack,
  Tab,
  Tabs,
} from 'react-bootstrap';
import styles from './styles.module.scss';
import { formatContractAddress } from '@utils/format';

const GenerativeProjectDetail: React.FC = (): React.ReactElement => {
  const router = useRouter();
  const { projectID } = router.query as { projectID: string };

  const [projectInfo, setprojectInfo] = useState<IGetProjectDetailResponse>();
  const [listItems, setListItems] = useState<IProjectItem[]>([]);
  const [totalItems, setTotalItems] = useState(0);

  const fetchProjectDetail = async (): Promise<void> => {
    if (projectID) {
      const data = await getProjectDetail({
        contractAddress: GENERATIVE_PROJECT_CONTRACT,
        projectID,
      });
      setprojectInfo(data);
    }
  };

  const fetchProjectItems = async (): Promise<void> => {
    if (projectInfo) {
      const res = await getProjectItems({
        contractAddress: projectInfo?.genNFTAddr,
        limit: 20,
      });
      setListItems(res.result);
      setTotalItems(res.total);
    }
  };

  // TODO: Handle mint actions
  const handleMintToken = () => {
    return;
  };

  const calcMintProgress = useMemo(() => {
    return (totalItems / (projectInfo?.maxSupply || 1)) * 100;
  }, [totalItems, projectInfo]);

  useEffect(() => {
    fetchProjectDetail();
  }, [projectID]);

  useEffect(() => {
    fetchProjectItems();
  }, [projectInfo]);

  return (
    <section>
      <Container>
        <div className={styles.projectInfo}>
          <div className={styles.thumbnail}>
            <Image
              src={convertIpfsToHttp(
                projectInfo?.image ||
                  'ipfs://QmZha95v86iME98rpxrJWbHerK3JjEHKkiGpdS4NgZKjdb'
              )}
              fill
              style={{ objectFit: 'cover', width: '100%' }}
              sizes="(max-width: 1200px) 330px"
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
                  <p>
                    {projectInfo?.creator ||
                      formatContractAddress(projectInfo?.creatorAddr || '')}
                  </p>
                </div>
              </Stack>
              {/* <Stack direction="horizontal" className={styles.createdDate}>
                <div className="skeleton avatar"></div>
                <div>
                  <p>Created date</p>
                  <p>{projectInfo?.creator || projectInfo?.creatorAddr}</p>
                </div>
              </Stack> */}
            </Stack>
            <div className={styles.mintProgress}>
              <p>
                <b>
                  {/* TODO: Update mint number */}
                  {totalItems} / {projectInfo?.maxSupply} minted
                </b>
              </p>
              <div className={cs(styles.progressWrapper, 'skeleton')}>
                {/* TODO: Update mint progress */}
                <div
                  className={styles.progressBar}
                  style={{
                    width: `${calcMintProgress}%`,
                  }}
                ></div>
              </div>
            </div>
            {projectInfo?.status && (
              <Button onClick={handleMintToken}>Mint iteration now</Button>
            )}
            <Stack direction="horizontal" className={styles.meta} gap={5}>
              <Stack className="items-center">
                <b>{totalItems}</b>
                <p>Items</p>
              </Stack>
              <Stack className="items-center">
                <b>{projectInfo?.royalty || 0}%</b>
                <p>Royalty</p>
              </Stack>
              {/* Do not remove comment below, will use later */}
              {/* <div>Total volume</div>
              <div>Floor price</div>
              <div>Highest offer</div>
            */}
            </Stack>
          </div>
        </div>
        <Tabs
          defaultActiveKey="profile"
          id="uncontrolled-tab-example"
          className="mt-4"
          fill
        >
          <Tab eventKey="items" title="Items">
            <InputGroup size="sm" className="my-4">
              <InputGroup.Text id="inputGroup-sizing-sm">
                Search
              </InputGroup.Text>
              <Form.Control
                placeholder="owner, item, address..."
                aria-label="Small"
                aria-describedby="inputGroup-sizing-sm"
              />
            </InputGroup>
            <CollectionList listData={listItems} />
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
