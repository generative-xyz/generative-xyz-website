import { GenerativeTokenDetailContext } from '@contexts/generative-token-detail-context';
import React, { useContext, useMemo, useState } from 'react';
import s from './styles.module.scss';
import { SERVICE_FEE } from '@constants/config';
import Button from '@components/ButtonIcon';
import cs from 'classnames';
import { Formik } from 'formik';
import { formatCurrency } from '@utils/format';
import { ListingStep } from '@enums/listing-generative';

interface IFormValues {
  price: number;
}

const ListingForm: React.FC = (): React.ReactElement => {
  const { tokenData, handleListingToken, setListingPrice, setListingStep } =
    useContext(GenerativeTokenDetailContext);
  const [userEarning, setUserEarning] = useState('');

  const validateForm = (values: IFormValues) => {
    const errors: Record<string, string> = {};
    setUserEarning('');

    if (!values.price.toString()) {
      errors.price = 'Price is required.';
    } else if (values.price < 0) {
      errors.price = 'Invalid number. Must be greater than 0.';
    } else {
      // Calculate earning
      const totalEarning =
        (1 - (SERVICE_FEE + (tokenData?.project.royalty ?? 0) / 10000)) *
        values.price;
      if (!isNaN(totalEarning)) {
        setUserEarning(formatCurrency(totalEarning));
      }
    }

    return errors;
  };

  const handleSubmit = async (values: IFormValues) => {
    setListingPrice(values.price);
    setListingStep(ListingStep.Processing);
    await handleListingToken(values.price.toString());
  };

  const creatorFee = useMemo(() => {
    if (tokenData?.project?.royalty) {
      return tokenData.project.royalty / 100;
    }
    return 0;
  }, [tokenData]);

  return (
    <div className={s.listingForm}>
      <Formik
        key="listingForm"
        initialValues={{
          price: 0,
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
              <h3 className={s.title}>Listing</h3>
              <div className={cs(s.formWrapper)}>
                <div className={s.formItem}>
                  <label className={s.label} htmlFor="price">
                    Set a price <sup className={s.requiredTag}>*</sup>
                  </label>
                  <div className={s.inputContainer}>
                    <input
                      id="price"
                      type="number"
                      name="price"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.price}
                      className={s.input}
                      placeholder="Provide a number"
                    />
                    <div className={s.inputPostfix}>ETH</div>
                  </div>
                  {errors.price && touched.price && (
                    <p className={s.error}>{errors.price}</p>
                  )}
                </div>
              </div>
              <div className={s.formSummaryWrapper}>
                <div className={s.sectionTitle}>Summary</div>
                <div className={s.feeItem}>
                  <span className={s.feeLabel}>Listing price</span>
                  <span className={s.feeLabel}>
                    {values.price.toString() !== ''
                      ? `${formatCurrency(values.price)} ETH`
                      : '--'}
                  </span>
                </div>
                <div className={s.feeItem}>
                  <span className={s.feeLabel}>Service fee</span>
                  <span className={s.feeLabel}>{`${SERVICE_FEE * 100}%`}</span>
                </div>
                <div className={s.feeItem}>
                  <span className={s.feeLabel}>Creator fee</span>
                  <span className={s.feeLabel}>{`${creatorFee}%`}</span>
                </div>
              </div>
              <div className={s.actionWrapper}>
                <div className={s.earningWrapper}>
                  <span className={s.earningLabel}>Potential earnings</span>
                  <span>{userEarning ? `${userEarning} ETH` : '--'}</span>
                </div>
                <Button className={s.submitBtn} type="submit">
                  Complete listing
                </Button>
              </div>
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default ListingForm;
