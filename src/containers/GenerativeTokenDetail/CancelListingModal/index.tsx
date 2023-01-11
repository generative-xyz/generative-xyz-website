import Button from '@components/ButtonIcon';
import SvgInset from '@components/SvgInset';
import { CDN_URL } from '@constants/config';
import { GenerativeTokenDetailContext } from '@contexts/generative-token-detail-context';
import cs from 'classnames';
import React, { useContext, useState } from 'react';
import s from './styles.module.scss';

const CancelListingModal: React.FC = (): React.ReactElement => {
  const {
    showCancelListingModal,
    hideCancelListingModal,
    handleCancelListingOffer,
  } = useContext(GenerativeTokenDetailContext);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleClose = (): void => {
    hideCancelListingModal();
  };

  const onCancelListingTokenOffer = async (): Promise<void> => {
    if (!showCancelListingModal.offer) {
      return;
    }
    setIsProcessing(true);
    await handleCancelListingOffer(showCancelListingModal.offer);
    setIsProcessing(false);
  };

  if (!showCancelListingModal.open) {
    return <></>;
  }

  return (
    <div className={cs(s.cancelListingModal)}>
      <div className={s.backdrop}>
        <div className={s.modalWrapper}>
          <div className={s.modalContainer}>
            <div className={s.modalHeader}>
              <Button
                onClick={handleClose}
                className={s.closeBtn}
                variants="ghost"
              >
                <SvgInset
                  size={28}
                  className={s.closeIcon}
                  svgUrl={`${CDN_URL}/icons/ic-x-circle-contained-28x28.svg`}
                />
              </Button>
            </div>
            <div className={s.modalBody}>
              <h3 className={s.modalTitle}>Cancel listing?</h3>
              <p className={s.modalDescription}>
                This will cancel your listing. You will also be asked to confirm
                this cancelation from your wallet
              </p>
              <div className={s.divider}></div>
              <div className={s.actionWrapper}>
                <Button
                  onClick={handleClose}
                  className={s.actionBtn}
                  variants="ghost"
                >
                  <SvgInset
                    size={18}
                    svgUrl={`${CDN_URL}/icons/ic-arrow-left-18x18.svg`}
                  />
                  Go back
                </Button>
                <Button
                  disabled={isProcessing}
                  onClick={onCancelListingTokenOffer}
                  className={s.actionBtn}
                >
                  Continue
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CancelListingModal;
