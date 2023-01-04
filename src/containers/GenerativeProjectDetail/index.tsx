import CollectionList from '@components/Collection/List';
import ClientOnly from '@components/Utils/ClientOnly';
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
import { setProjectCurrent } from '@redux/project/action';
import MintGenerativeNFTOperation from '@services/contract-operations/generative-nft/mint-generative-nft';
import { getProjectDetail, getProjectItems } from '@services/project';
import { base64ToUtf8 } from '@utils/format';
import log from '@utils/logger';
import _get from 'lodash/get';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { Container, Tab, Tabs } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { TransactionReceipt } from 'web3-eth';
import TokenTopFilter from './TokenTopFilter';
import styles from './styles.module.scss';

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

  // const openseaUrl = useMemo(() => {
  //   const openseaAssetURL = getOpenseaAssetUrl();
  //   if (!openseaAssetURL) {
  //     return null;
  //   }
  //   return `${openseaAssetURL}/${GENERATIVE_PROJECT_CONTRACT}/${projectID}`;
  // }, [projectID]);

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
                <CollectionList listData={listItems} />
              </div>
            </Tab>
          </Tabs>
        </ClientOnly>
      </Container>
    </section>
  );
};

export default GenerativeProjectDetail;
