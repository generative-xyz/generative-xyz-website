import CollectionList from '@components/Collection/List';
import { GENERATIVE_PROJECT_CONTRACT } from '@constants/contract-address';
import { ROUTE_PATH } from '@constants/route-path';
import ProjectIntroSection from '@containers/Marketplace/ProjectIntroSection';
import { LogLevel } from '@enums/log-level';
import useContractOperation from '@hooks/useContractOperation';
import {
  IGetProjectDetailResponse,
  IProjectItem,
} from '@interfaces/api/project';
import { IMintGenerativeNFTParams } from '@interfaces/contract-operations/mint-generative-nft';
import MintGenerativeNFTOperation from '@services/contract-operations/generative-nft/mint-generative-nft';
import { getProjectDetail, getProjectItems } from '@services/project';
import { getOpenseaAssetUrl } from '@utils/chain';
import { base64ToUtf8 } from '@utils/format';
import log from '@utils/logger';
import _get from 'lodash/get';
import { useRouter } from 'next/router';
import React, { useEffect, useMemo, useState } from 'react';
import { Container, Form, InputGroup, Tab, Tabs } from 'react-bootstrap';
import { TransactionReceipt } from 'web3-eth';
import styles from './styles.module.scss';
import { useDispatch } from 'react-redux';
import { setProjectCurrent } from '@redux/project/action';

const LOG_PREFIX = 'GenerativeProjectDetail';

const GenerativeProjectDetail: React.FC = (): React.ReactElement => {
  const router = useRouter();
  const dispatch = useDispatch();
  const {
    // call: mintToken,
    // reset: resetMintToken,
    // isLoading: isMinting,
    data: mintTx,
  } = useContractOperation<IMintGenerativeNFTParams, TransactionReceipt>(
    MintGenerativeNFTOperation,
    true
  );
  const { projectID } = router.query as { projectID: string };
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

  // const [projectDetail, setProjectDetail] =
  //   useState<Omit<IProjectItem, 'owner'>>();

  const [listItems, setListItems] = useState<IProjectItem[]>([]);

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
    if (projectInfo.genNFTAddr) {
      try {
        const res = await getProjectItems({
          contractAddress: projectInfo.genNFTAddr,
          limit: 100,
          page: 1,
        });
        setListItems(res.result);
      } catch (_: unknown) {
        log('failed to fetch project items data', LogLevel.Error, LOG_PREFIX);
      }
    }
  };

  // const handleMintToken = () => {
  //   resetMintToken();

  //   if (!projectInfo) {
  //     return;
  //   }

  //   mintToken({
  //     projectAddress: projectInfo.genNFTAddr,
  //     mintFee: projectInfo.mintPrice.toString(),
  //     chainID: NETWORK_CHAIN_ID,
  //   });
  // };

  const openseaUrl = useMemo(() => {
    const openseaAssetURL = getOpenseaAssetUrl();
    if (!openseaAssetURL) {
      return null;
    }
    return `${openseaAssetURL}/${GENERATIVE_PROJECT_CONTRACT}/${projectID}`;
  }, [projectID]);

  useEffect(() => {
    const _projectDetail = base64ToUtf8(
      projectInfo.projectURI.replace('data:application/json;base64,', '')
    );
    if (_projectDetail) {
      // const projectDetailObj = JSON.parse(_projectDetail);
      // setProjectDetail(projectDetailObj);
    }
  }, [projectInfo.id]);

  useEffect(() => {
    if (!mintTx) {
      return;
    }

    const tokenID = _get(mintTx, 'events.Transfer.returnValues.tokenId', null);
    if (tokenID === null) {
      return;
    }

    router.push(`${ROUTE_PATH.GENERATIVE}/${projectID}/${tokenID}`);
  }, [mintTx, projectID]);

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
        {openseaUrl && (
          <p>
            <a target="_blank" href={openseaUrl} rel="noreferrer">
              View on Opensea
            </a>
          </p>
        )}

        {/* <div className={styles.projectInfo}>
          <div className={styles.info}>
            <h2>{projectInfo?.name}</h2>
            <Stack direction="horizontal" gap={5}>
              <Stack direction="horizontal" className={styles.creator} gap={2}>
                <div className="skeleton avatar"></div>
                <div>
                  <p>Creator</p>
                  <p>
                    {projectInfo?.creator ||
                      formatAddress(projectInfo?.creatorAddr || '')}
                  </p>
                </div>
              </Stack> */}
        {/* <Stack direction="horizontal" className={styles.createdDate}>
                <div className="skeleton avatar"></div>
                <div>
                  <p>Created date</p>
                  <p>{projectInfo?.creator || projectInfo?.creatorAddr}</p>
                </div>
              </Stack> */}
        {/* </Stack>
            <div className={styles.mintProgress}>
              <p>
                <b>
                  {totalItems} / {projectInfo?.maxSupply} minted
                </b>
              </p>
              <div className={cs(styles.progressWrapper, 'skeleton')}>
                <div
                  className={styles.progressBar}
                  style={{
                    width: `${calcMintProgress}%`,
                  }}
                ></div>
              </div>
            </div>
            <div>
              <p>
                Mint price:{' '}
                {projectInfo?.mintPrice
                  ? `${Web3.utils.fromWei(
                      projectInfo.mintPrice.toString(),
                      'ether'
                    )} eth`
                  : '--'}
              </p>
              {openseaUrl && (
                <p>
                  <a target="_blank" href={openseaUrl} rel="noreferrer">
                    View on Opensea
                  </a>
                </p>
              )}
            </div>
            {projectInfo?.status && (
              <Button className={styles.submitBtn} onClick={handleMintToken}>
                {isMinting ? 'Minting...' : 'Mint now'}
              </Button>
            )}
            <Stack direction="horizontal" className={styles.meta} gap={5}>
              <Stack className="items-center">
                <b>{totalItems}</b>
                <p>Items</p>
              </Stack>
              <Stack className="items-center">
                <b>{(projectInfo?.royalty || 0) / 100}%</b>
                <p>Royalty</p>
              </Stack>
            </Stack>
            <div className={styles.desc}>
              <h5>Description</h5>
              <p>{projectInfo?.desc}</p>
            </div>
          </div>
          <ThumbnailPreview data={projectDetail} allowVariation /> */}
        {/* <div className={styles.thumbnail}>
            <Image
              src={convertIpfsToHttp(
                projectInfo?.image ||
                  'ipfs://QmNTU5ctcffhZz5Hphd44yPivh2Y89pDYYG8QQ6yWGY3wn'
              )}
              fill
              style={{ objectFit: 'cover', width: '100%' }}
              sizes="(max-width: 1200px) 330px"
              alt={'project thumbnail image'}
            />
          </div> */}
        {/* </div> */}
        <Tabs
          defaultActiveKey="items"
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
          <Tab
            eventKey="analytics"
            title="Analytics"
            tabClassName="invisible"
            disabled
          >
            Analytics
          </Tab>
          <Tab
            eventKey="activity"
            title="Activity"
            tabClassName="invisible"
            disabled
          >
            Activity
          </Tab>
        </Tabs>
      </Container>
    </section>
  );
};

export default GenerativeProjectDetail;
