import { LogLevel } from '@enums/log-level';
import log from '@utils/logger';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { Container } from 'react-bootstrap';

const LOG_PREFIX = 'GenerativeTokenDetail';

const GenerativeTokenDetail: React.FC = (): React.ReactElement => {
  const router = useRouter();
  const { projectID, tokenID } = router.query as {
    projectID: string;
    tokenID: string;
  };

  // const [itemDetail, setItemDetail] =
  //   useState<IGetGenerativeTokenUriResponse>();

  const fetchItemDetail = async (): Promise<void> => {
    try {
      if (tokenID) {
        // const res = await getTokenUri({
        //   contractAddress: GENERATIVE_PROJECT_CONTRACT,
        //   tokenID,
        // });
        // setItemDetail(MOCK);
      }
    } catch (err: unknown) {
      log('failed to fetch item detail', LogLevel.Error, LOG_PREFIX);
      throw Error('failed to fetch item detail');
    }
  };

  useEffect(() => {
    fetchItemDetail();
  }, [tokenID]);

  return (
    <section>
      <Container>
        <div>
          <div>Art Name</div>
          <div>Image</div>
          <div>{projectID}</div>
        </div>
      </Container>
    </section>
  );
};

export default GenerativeTokenDetail;
