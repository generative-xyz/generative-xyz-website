import Button from '@components/ButtonIcon';
import SvgInset from '@components/SvgInset';
import { CDN_URL } from '@constants/config';
import { GenerativeTokenDetailContext } from '@contexts/generative-token-detail-context';
import React, { useContext, useState } from 'react';
import s from './styles.module.scss';
import cs from 'classnames';
import Image from 'next/image';
import { formatTokenId } from '@utils/format';
import { Formik } from 'formik';
import { toast } from 'react-hot-toast';

interface IFormValues {
  toAddress: string;
}

const TransferTokenModal: React.FC = () => {
  const {
    tokenData,
    showTransferTokenModal,
    handleTransferToken,
    hideTransferTokenModal,
  } = useContext(GenerativeTokenDetailContext);
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>();

  const handleClose = (): void => {
    hideTransferTokenModal();
  };

  const validateForm = (values: IFormValues) => {
    const errors: Record<string, string> = {};

    if (!values.toAddress) {
      errors.toAddress = 'Receiver address is required.';
    } else if (!/^0x[a-fA-F0-9]{40}$/.test(values.toAddress)) {
      errors.toAddress = 'Invalid address.';
    }

    return errors;
  };

  const handleSubmit = async (values: IFormValues) => {
    if (!tokenData) {
      return;
    }
    try {
      setErrorMessage(null);
      setIsProcessing(true);
      await handleTransferToken(tokenData.tokenID, values.toAddress);
      toast.success('Transferred successfully');
      hideTransferTokenModal();
    } catch (err: unknown) {
      setErrorMessage((err as Error).message);
    } finally {
      setIsProcessing(false);
    }
  };

  if (!tokenData) {
    return <></>;
  }

  return (
    <div
      className={cs(s.transferTokenModal, {
        [`${s.transferTokenModal__show}`]: showTransferTokenModal,
      })}
    >
      <div className={s.backdrop} />
      <div className={s.modalWrapper}>
        <div className={s.modalContainer}>
          <div className={s.modalHeader}>
            <Button
              disabled={isProcessing}
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
            <h3 className={s.title}>Transfer token</h3>
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
            <div className={s.listingForm}>
              <Formik
                key="transferTokenForm"
                initialValues={{
                  toAddress: '',
                }}
                validate={validateForm}
                onSubmit={handleSubmit}
                validateOnChange
                enableReinitialize
              >
                {({
                  values,
                  errors,
                  touched,
                  handleChange,
                  handleBlur,
                  handleSubmit,
                }) => (
                  <form onSubmit={handleSubmit}>
                    <div className={cs(s.listingInfoWrapper)}>
                      <div className={cs(s.formWrapper)}>
                        <div className={s.formItem}>
                          <label className={s.label} htmlFor="toAddress">
                            Receiver address{' '}
                            <sup className={s.requiredTag}>*</sup>
                          </label>
                          <div className={s.inputContainer}>
                            <input
                              id="toAddress"
                              type="text"
                              name="toAddress"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.toAddress}
                              className={s.input}
                              placeholder="Provide an address"
                            />
                          </div>
                          {errors.toAddress && touched.toAddress && (
                            <p className={s.error}>{errors.toAddress}</p>
                          )}
                        </div>
                        <div className={s.actionWrapper}>
                          <Button
                            disabled={isProcessing}
                            className={s.submitBtn}
                            type="submit"
                          >
                            {isProcessing ? 'Processing' : 'Confirm'}
                          </Button>
                        </div>
                      </div>
                      {errorMessage && (
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
                      )}
                    </div>
                  </form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransferTokenModal;
