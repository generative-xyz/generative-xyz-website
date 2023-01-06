import { GenerativeTokenDetailContext } from '@contexts/generative-token-detail-context';
import React, { useContext } from 'react';
import s from './styles.module.scss';
import { CDN_URL } from '@constants/config';
import Button from '@components/ButtonIcon';
import cs from 'classnames';
import SvgInset from '@components/SvgInset';
import ListingForm from '../ListingForm';
import { ListingStep } from '@enums/listing-generative';
import ListingProcess from '../ListingProcess';
import ListingSuccess from '../ListingSuccess';

const ListingTokenModal: React.FC = (): React.ReactElement => {
  const { showListingModal, listingStep, hideListingModal } = useContext(
    GenerativeTokenDetailContext
  );

  const handleClose = (): void => {
    hideListingModal();
  };

  return (
    <div
      className={cs(s.listingTokenModal, {
        [`${s.listingTokenModal__show}`]: showListingModal,
      })}
    >
      <div className={s.backdrop} />
      <div className={s.modalWrapper}>
        <div className={s.modalContainer}>
          <div className={s.modalHeader}>
            <Button
              onClick={handleClose}
              className={s.closeBtn}
              variants="ghost"
            >
              <SvgInset
                className={s.closeIcon}
                svgUrl={`${CDN_URL}/icons/ic-x-circle-contained-28x28.svg`}
              />
            </Button>
          </div>
          <div className={s.modalBody}>
            {listingStep === ListingStep.InputInfo && <ListingForm />}
            {listingStep === ListingStep.Processing && <ListingProcess />}
            {listingStep === ListingStep.Success && <ListingSuccess />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListingTokenModal;
