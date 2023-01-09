import Table from '@components/Table';
import { GenerativeTokenDetailContext } from '@contexts/generative-token-detail-context';
import { LogLevel } from '@enums/log-level';
import { getMakeOffers } from '@services/marketplace';
import log from '@utils/logger';
import { useRouter } from 'next/router';
import { useContext, useEffect } from 'react';
import { Tab, Tabs } from 'react-bootstrap';
import s from './styles.module.scss';

const LOG_PREFIX = 'TokenActivities';

const TABLE_OFFERS_HEADING = ['Event', 'Price', 'From', 'To', 'Date'];

const TokenActivities = () => {
  const router = useRouter();
  const { tokenID } = router.query as {
    tokenID: string;
  };

  // const [makeOffers, setMakeOffers] = useState<IMakeOffers | null>(null);

  const { tokenData } = useContext(GenerativeTokenDetailContext);
  const handleFetchMakeOffers = async () => {
    try {
      if (tokenData && tokenData.genNFTAddr && tokenID) {
        const makeOffers = await getMakeOffers({
          genNFTAddr: tokenData?.genNFTAddr ? tokenData?.genNFTAddr : '',
          tokenId: tokenID,
          closed: false,
        });
        if (makeOffers && makeOffers.result[0]) {
          // setMakeOffers(makeOffers);
        }
      }
    } catch (e) {
      log('can not fetch price', LogLevel.Error, LOG_PREFIX);
      throw Error('failed to fetch item detail');
    }
  };

  useEffect(() => {
    handleFetchMakeOffers();
  }, [tokenData]);

  return (
    <div className={s.wrapper}>
      {/* {makeOffers?.result[0].offeringID} */}
      <Tabs className={s.tabs} defaultActiveKey="offers">
        <Tab tabClassName={s.tab} eventKey="offers" title="Offers">
          <div className={s.activities_table}>
            <Table tableHead={TABLE_OFFERS_HEADING} data={[]}></Table>
          </div>
        </Tab>
      </Tabs>
    </div>
  );
};

export default TokenActivities;
