import React, { useContext, useState } from 'react';
import s from './styles.module.scss';
import cs from 'classnames';
import { GenerativeTokenDetailContext } from '@contexts/generative-token-detail-context';
import Image from 'next/image';
import { formatTokenId } from '@utils/format';
import Button from '@components/ButtonIcon';
import SvgInset from '@components/SvgInset';
import { CDN_URL } from '@constants/config';
import { Formik } from 'formik';
import Select, { SingleValue } from 'react-select';
import { SelectOption } from '@interfaces/select-input';
import Link from 'next/link';
import { getFaucetLink } from '@utils/chain';
import dayjs from 'dayjs';

interface IFormValues {
  offerPrice: number;
  offerExpiration: '7d' | '30d' | 'alltime';
}

const OFFER_EXPIRATION: Array<SelectOption> = [
  {
    value: '7d',
    label: '7 days',
  },
  {
    value: '30d',
    label: '30 days',
  },
  {
    value: 'alltime',
    label: 'All time',
  },
];

const MakeOfferModal: React.FC = (): React.ReactElement => {
  const {
    showMakeOfferModal,
    tokenData,
    handleMakeTokenOffer,
    hideMakeOffergModal,
  } = useContext(GenerativeTokenDetailContext);
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  if (!tokenData) {
    return <></>;
  }

  const handleClose = (): void => {
    hideMakeOffergModal();
  };

  const validateForm = (values: IFormValues) => {
    const errors: Record<string, string> = {};

    if (!values.offerPrice.toString()) {
      errors.offerPrice = 'Offer price is required.';
    } else if (values.offerPrice <= 0) {
      errors.offerPrice = 'Invalid number. Must be greater than 0.';
    }

    return errors;
  };

  const handleSubmit = async (values: IFormValues) => {
    try {
      setErrorMessage(null);
      setIsProcessing(true);
      let durationTimestamp;
      if (values.offerExpiration === '7d') {
        durationTimestamp = dayjs().add(7, 'day').unix();
      } else if (values.offerExpiration === '30d') {
        durationTimestamp = dayjs().add(30, 'day').unix();
      } else {
        durationTimestamp = 0;
      }
      await handleMakeTokenOffer(
        values.offerPrice.toString(),
        durationTimestamp
      );
    } catch (err: unknown) {
      setErrorMessage((err as Error).message);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div
      className={cs(s.makeOfferModal, {
        [`${s.makeOfferModal__show}`]: showMakeOfferModal,
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
            <h3 className={s.title}>Make an offer</h3>
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
                key="makeOfferForm"
                initialValues={{
                  offerPrice: 0,
                  offerExpiration: '7d',
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
                  setFieldValue,
                }) => (
                  <form onSubmit={handleSubmit}>
                    <div className={cs(s.listingInfoWrapper)}>
                      <div className={cs(s.formWrapper)}>
                        <div className={s.formItem}>
                          <label className={s.label} htmlFor="offerPrice">
                            Offer price <sup className={s.requiredTag}>*</sup>
                          </label>
                          <div className={s.inputContainer}>
                            <input
                              id="offerPrice"
                              type="number"
                              name="offerPrice"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.offerPrice}
                              className={s.input}
                              placeholder="Provide a number"
                            />
                            <div className={s.inputPostfix}>WETH</div>
                          </div>
                          {errors.offerPrice && touched.offerPrice && (
                            <p className={s.error}>{errors.offerPrice}</p>
                          )}
                        </div>
                        <div className={s.formItem}>
                          <label className={s.label} htmlFor="offerExpiration">
                            Offer expiration
                          </label>
                          <Select
                            id="offerExpiration"
                            name="offerExpiration"
                            defaultValue={OFFER_EXPIRATION[0]}
                            options={OFFER_EXPIRATION}
                            className={s.selectInput}
                            classNamePrefix="select"
                            isClearable={false}
                            isSearchable={false}
                            onChange={(op: SingleValue<SelectOption>) => {
                              setFieldValue('offerExpiration', op?.value);
                            }}
                            onBlur={handleBlur}
                          />
                        </div>
                      </div>
                      <div className={s.actionWrapper}>
                        <Button
                          disabled={isProcessing}
                          className={s.submitBtn}
                          type="submit"
                        >
                          {isProcessing ? 'Processing' : 'Make offer'}
                        </Button>
                      </div>
                      <div className={s.addFundWrapper}>
                        <p className={s.addFunddescription}>
                          Not enough balance.
                        </p>
                        <Link
                          className={s.addFundLink}
                          href={getFaucetLink() ?? ''}
                        >
                          Add fund
                        </Link>
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

export default MakeOfferModal;
