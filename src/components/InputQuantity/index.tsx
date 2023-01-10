/* eslint-disable no-restricted-properties */
/* eslint-disable @typescript-eslint/no-explicit-any */
// #region Global Imports
import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
// #endregion Global Imports

// #region Local Imports
import toast from 'react-hot-toast';
import { IInputQuantity } from './InputQuantity';
import s from './InputQuantity.module.scss';
// #endregion Local Imports

const InputQuantity = React.forwardRef(
  (props: IInputQuantity.IProps | any, ref: any) => {
    const {
      className,
      onChange,
      onMouseEnter,
      onMouseLeave,
      defaultValue,
      maxLength,
      maxValue,
      maxValueErrorMessage,
      minValueErrorMessage,
      isLoading,
      onBlur,
      size,
      disabledChangeQuantity = false,
      minimumQuantity,
    } = props;
    const [quantity, setQuantity] = useState(defaultValue || 1) as any;
    const max = maxLength || 4;
    const allowValue = maxValue ?? 9999;

    const prefix = 'wrapperQty';
    const [timer, setTimer] = useState() as any;

    useEffect(() => {
      if (defaultValue !== quantity) {
        setQuantity(defaultValue);
      }
    }, [defaultValue]);

    const handleAfterQuantityChange = (value: number) => {
      if (typeof onChange === 'function') {
        if (timer) {
          clearTimeout(timer);
          setTimer(null);
        }
        setTimer(
          setTimeout(() => {
            onChange(value);
          }, 300)
        );
      }
    };

    const onQuantityChange = (e: any) => {
      if (disabledChangeQuantity) return;
      toast.remove();
      let { value } = e.target;
      // is waiting api response ?
      if (isLoading) return;
      // is right format number ?
      if ((value || '').length > max) {
        return;
      }

      value = parseInt(value.replace(/[^0-9]/g, ''), 10);
      if (
        window?.isNaN(minimumQuantity) === false &&
        (value <= minimumQuantity || Number.isNaN(value))
      ) {
        if (minValueErrorMessage) {
          toast.error(minValueErrorMessage);
        }
        setQuantity(value);
      } else if (!value) {
        setQuantity('');
      } else if (value > allowValue) {
        if (maxValueErrorMessage) {
          toast.error(maxValueErrorMessage);
        }
        setQuantity(value);
      } else {
        setQuantity(value);
        handleAfterQuantityChange(value);
      }
    };

    const onCheckValueChange = (e: any) => {
      let { value } = e.target;
      value = parseInt(value.replace(/[^0-9]/g, ''), 10);
      // min
      if (
        window?.isNaN(minimumQuantity) === false &&
        (value <= minimumQuantity || Number.isNaN(value))
      ) {
        setQuantity(minimumQuantity);
        handleAfterQuantityChange(minimumQuantity);
        value = minimumQuantity;
      } else if (!value) {
        // normal
        setQuantity(1);
        handleAfterQuantityChange(1);
        value = 1;
      } else if (value > allowValue) {
        // max
        setQuantity(allowValue);
        handleAfterQuantityChange(allowValue);
        value = allowValue;
      }

      if (typeof onBlur === 'function') {
        onBlur(value);
      }
    };

    return (
      <div
        className={classNames(
          s.wrapperQty,
          className,
          'wrapperQty',
          size && s[`${prefix}__${size}`]
        )}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        <div
          role="presentation"
          className={`${s.btnEditQty} btnEditQty ${
            disabledChangeQuantity || quantity <= minimumQuantity
              ? s.disabled
              : ''
          }`}
          onClick={() => {
            toast.remove();
            const newValue = quantity - 1;
            if (window?.isNaN(minimumQuantity) === false && newValue >= 0) {
              setQuantity(newValue);
              handleAfterQuantityChange(newValue);
            } else if (newValue > 0 && !disabledChangeQuantity) {
              setQuantity(newValue);
              handleAfterQuantityChange(newValue);
            }
          }}
        >
          {/*<FontAwesomeIcon className={s.icon} icon={faMinus} />*/}-
        </div>
        <input
          ref={ref}
          type="number"
          pattern="\d*"
          className={`${s.qtyInput} qtyInput`}
          value={quantity}
          onChange={onQuantityChange}
          onBlur={onCheckValueChange}
          disabled={disabledChangeQuantity}
        />
        <div
          role="presentation"
          className={`${s.btnEditQty} btnEditQty ${
            disabledChangeQuantity ? s.disabled : ''
          }`}
          onClick={() => {
            toast.remove();
            const newValue = quantity + 1;
            if (newValue <= allowValue && !disabledChangeQuantity) {
              setQuantity(newValue);
              handleAfterQuantityChange(newValue);
            } else if (maxValueErrorMessage) {
              toast.error(maxValueErrorMessage);
            }
          }}
        >
          +{/*<FontAwesomeIcon className={s.icon} icon={faPlus} />*/}
        </div>
      </div>
    );
  }
);

InputQuantity.displayName = 'InputQuantity';
export default InputQuantity;
