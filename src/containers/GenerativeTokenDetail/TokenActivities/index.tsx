import { Tab, Tabs } from 'react-bootstrap';
import OfferTable from './OfferTable';
import s from './styles.module.scss';

const TokenActivities = () => {
  return (
    <div className={s.wrapper}>
      <Tabs className={s.tabs} defaultActiveKey="offers">
        <Tab tabClassName={s.tab} eventKey="offers" title="Offers">
          <div className={s.activities_table}>
            <OfferTable></OfferTable>
          </div>
        </Tab>
      </Tabs>
    </div>
  );
};

export default TokenActivities;
