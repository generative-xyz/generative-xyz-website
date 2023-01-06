import React, { useContext } from 'react';
import s from './styles.module.scss';
import Image from 'next/image';
import { GenerativeTokenDetailContext } from '@contexts/generative-token-detail-context';
import { formatCurrency, formatTokenId } from '@utils/format';
import Button from '@components/ButtonIcon';
import { CDN_URL } from '@constants/config';

const ListingProcess: React.FC = (): React.ReactElement => {
  const { tokenData, listingPrice, handleListingToken, errorMessage } =
    useContext(GenerativeTokenDetailContext);

  const handleRetry = async (): Promise<void> => {
    await handleListingToken(listingPrice.toString());
  };

  if (!tokenData) {
    return <></>;
  }

  return (
    <div className={s.listingProcess}>
      <h3 className={s.title}>Approve collection</h3>
      <div className={s.tokenInfoWrapper}>
        <div className={s.thumbnailWrapper}>
          <Image
            className={s.thumbnailImage}
            alt={tokenData.name}
            width={128}
            height={128}
            src={tokenData.image}
          />
        </div>
        <div className={s.infoWrapper}>
          <p className={s.tokenName}>
            {`#${formatTokenId(tokenData.tokenID)}`}
          </p>
          <p className={s.collectionName}>{tokenData.project.name}</p>
        </div>
      </div>
      <div className={s.listingSummaryWrapper}>
        <div className={s.summaryItem}>
          <span className={s.summaryItemLabel}>Listing for</span>
          <span className={s.summaryItemValue}>{`${formatCurrency(
            listingPrice
          )} ETH`}</span>
        </div>
        <div className={s.summaryItem}>
          <span className={s.summaryItemLabel}>Expiration</span>
          <span className={s.summaryItemValue}>None</span>
        </div>
      </div>
      <div className={s.listingGuideWrapper}>
        <h4 className={s.sectionTitle}>Go to your wallet</h4>
        <p className={s.guideDetail}>
          You&apos;ll be asked to approve this collection from your wallet. You
          only need to approve each collection once.
        </p>
      </div>
      {errorMessage && (
        <>
          <div className={s.actionWrapper}>
            <Button onClick={handleRetry} className={s.tryAgainBtn}>
              Try again
            </Button>
          </div>
          <div className={s.errorWrapper}>
            <div className={s.errorContainer}>
              <div className={s.iconWrapper}>
                <Image
                  src={`${CDN_URL}/icons/ic-triangle-exclamation-24x24.svg`}
                  width={24}
                  height={24}
                  alt="ic-triangle-exclamation"
                />
              </div>
              <div className={s.errorInfoWrapper}>
                <h3 className={s.errorTitle}>Error</h3>
                <p className={s.errorMessage}>{errorMessage}</p>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ListingProcess;
