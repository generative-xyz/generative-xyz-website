import { LogLevel } from '@enums/log-level';
import log from '@utils/logger';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { Button, Container, Stack } from 'react-bootstrap';
import styles from './styles.module.scss';
import { MOCK } from './mock';
import { IGetGenerativeTokenUriResponse } from '@interfaces/api/token-uri';
import AvatarInfo from '@components/AvatarInfo';
import Accordion from '@components/Accordion';

const LOG_PREFIX = 'GenerativeTokenDetail';

const GenerativeTokenDetail: React.FC = (): React.ReactElement => {
  const router = useRouter();
  const { projectID, tokenID } = router.query as {
    projectID: string;
    tokenID: string;
  };

  const [itemDetail, setItemDetail] =
    useState<IGetGenerativeTokenUriResponse>();

  const fetchItemDetail = async (): Promise<void> => {
    try {
      if (tokenID) {
        // const res = await getTokenUri({
        //   contractAddress: GENERATIVE_PROJECT_CONTRACT,
        //   tokenID,
        // });
        setItemDetail(MOCK);
      }
    } catch (err: unknown) {
      log('failed to fetch item detail', LogLevel.Error, LOG_PREFIX);
      throw Error('failed to fetch item detail');
    }
  };

  // TODO: handle click buy action
  const handleBuy = () => {
    return;
  };

  // TODO: handle click offer action
  const handleOffer = () => {
    return;
  };

  useEffect(() => {
    fetchItemDetail();
  }, [tokenID]);

  return (
    <section>
      <Container>
        <div className={styles.wrapper}>
          <div className={styles.leftWrapper}>
            <div className={styles.itemInfo}>
              <h3>{itemDetail?.name}</h3>
              <b>projectID: {projectID}</b>
              <Stack direction="horizontal" gap={2}>
                <AvatarInfo
                  imgSrc=""
                  width={40}
                  height={40}
                  leftContent={
                    <div>
                      <p>Owner</p>
                      <p>Owner address</p>
                    </div>
                  }
                />
                <AvatarInfo
                  imgSrc=""
                  width={40}
                  height={40}
                  leftContent={
                    <div>
                      <p>Creator</p>
                      <p>Creator address</p>
                    </div>
                  }
                />
                <AvatarInfo
                  imgSrc=""
                  width={40}
                  height={40}
                  leftContent={
                    <div>
                      <p>Minted on</p>
                      <p>Date</p>
                    </div>
                  }
                />
              </Stack>
              <div className="divider"></div>
              <Stack direction="horizontal" gap={5} className={styles.stats}>
                <div>
                  <b>X.XX ETH</b>
                  <p>Price</p>
                </div>
                <div>
                  <b>X.XX ETH</b>
                  <p>Highest Offer</p>
                </div>
                <div>
                  <b>XX %</b>
                  <p>Royalty</p>
                </div>
              </Stack>
              <Stack direction="horizontal" gap={2}>
                <Button variant="secondary" onClick={handleBuy} disabled>
                  Buy now
                </Button>
                <Button
                  variant="outline-secondary"
                  onClick={handleOffer}
                  disabled
                >
                  Make offer
                </Button>
              </Stack>
            </div>
            <Accordion header="Description" content={itemDetail?.description} />
            <div></div>
            <div></div>
            <div></div>
          </div>
          <div className={styles.thumbnail}>Image</div>
        </div>
      </Container>
    </section>
  );
};

export default GenerativeTokenDetail;
