import CollectionItem from '@components/Collection/Item';
import { GenerativeTokenDetailContext } from '@contexts/generative-token-detail-context';
import React, { useContext } from 'react';
import s from './styles.module.scss';

const ListingSuccess: React.FC = (): React.ReactElement => {
  const { tokenData } = useContext(GenerativeTokenDetailContext);

  if (!tokenData) {
    return <></>;
  }

  return (
    <div className={s.listingSuccess}>
      <h3 className={s.title}>Your item has been listed!</h3>
      <CollectionItem data={tokenData} />
    </div>
  );
};

export default ListingSuccess;
