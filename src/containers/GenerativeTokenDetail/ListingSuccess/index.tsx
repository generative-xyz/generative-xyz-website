import CollectionItem from '@components/Collection/Item';
import LinkShare from '@components/LinkShare';
import DiscordShare from '@components/DiscordShare';
import EtherscanShare from '@components/EtherscanShare';
import TwitterShare from '@components/TwitterShare';
import { GenerativeTokenDetailContext } from '@contexts/generative-token-detail-context';
import React, { useContext } from 'react';
import Button from '@components/ButtonIcon';
import s from './styles.module.scss';
import { useRouter } from 'next/router';

const ListingSuccess: React.FC = (): React.ReactElement => {
  const router = useRouter();
  const { tokenData, txHash } = useContext(GenerativeTokenDetailContext);

  const handleViewListing = () => {
    router.push('/profile?tab=listing');
  };

  if (!tokenData) {
    return <></>;
  }

  return (
    <div className={s.listingSuccess}>
      <h3 className={s.title}>Your item has been listed!</h3>
      <div className={s.tokenInfoWrapper}>
        <CollectionItem data={tokenData} />
      </div>
      <div className={s.socialWrapper}>
        <span className={s.label}>Share to:</span>
        <LinkShare url={location.href} />
        <EtherscanShare transactionHash={txHash} />
        <DiscordShare />
        <TwitterShare
          url={location.href}
          title="Your art has been listed!"
          hashtags={['generative.xyz']}
        />
      </div>
      <div className={s.actionWrapper}>
        <Button onClick={handleViewListing} className={s.viewListingBtn}>
          View listing
        </Button>
      </div>
    </div>
  );
};

export default ListingSuccess;
