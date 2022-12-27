import React, { useEffect, useMemo, useState } from 'react';
import { Modal } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import cn from 'classnames';
// import Web3Utils from 'web3-utils';

import { isOpenCheckoutPopupSelector } from '@redux/general/selector';
import { setIsOpenCheckoutPopup } from '@redux/general/action';
import { useAppDispatch } from '@redux/index';
import { FRAME_OPTIONS } from '@constants/frame';
// import Dropdown from '@components/Dropdown';
import Input from '@components/Input';
import Button from '@components/Button';
import InputQuantity from '@components/InputQuantity';
// import Countries from '@constants/country-list.json';
// import StateOfUS from '@constants/state-of-us.json';

import s from './CheckoutModal.module.scss';

interface IShippingInfo {
  name: string;
  email: string;
  address: string;
  address2: string;
  city: string;
  state: string;
  zip: string;
  country: string;
}

const CheckoutModal: React.FC = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const isShow = useSelector(isOpenCheckoutPopupSelector);
  const onHideModal = () => dispatch(setIsOpenCheckoutPopup(false));
  const [cart, setCart] = useState(
    FRAME_OPTIONS.map(option => ({
      ...option,
      qty: 0,
    }))
  );
  const [shippingInfo, setShippingInfo] = useState<IShippingInfo>({
    name: '',
    email: '',
    address: '',
    address2: '',
    city: '',
    state: '',
    zip: '',
    country: '',
  });

  // const selectedCountry = useMemo(
  //   () => Countries.find(item => item.key === shippingInfo.country),
  //   [shippingInfo.country]
  // );
  // const selectedState = useMemo(
  //   () =>
  //     shippingInfo.country === 'US' &&
  //     StateOfUS.find(item => item.key === shippingInfo.state),
  //   [shippingInfo.state]
  // );

  const onChangeQty = (qty: number, cartIndex: number) => {
    cart[cartIndex].qty = qty;
    setCart([...cart]);
  };

  const totalPrice = useMemo(
    () =>
      Math.round(
        cart.reduce((prev, current) => prev + current.price * current.qty, 0) *
          10e9
      ) / 10e9,
    [cart]
  );

  const placeOrder = async () => {
    // if (typeof window.ethereum !== 'undefined') {
    //   const accounts = await window.ethereum.request({
    //     method: 'eth_requestAccounts',
    //   });
    //
    //   const value = Web3Utils.toHex(
    //     Web3Utils.toWei(totalPrice.toString(), 'ether')
    //   );
    //
    //   const txHash = await window.ethereum.request({
    //     method: 'eth_sendTransaction',
    //     params: [
    //       {
    //         from: accounts[0],
    //         to: '0x4a6ac457C5F16F3e75fFb4476aA5421b815DD210',
    //         value: value,
    //       },
    //     ],
    //   });
    //
    //   console.log(txHash);
    // }
  };

  const isEnablePaymentBtn =
    totalPrice > 0 &&
    shippingInfo.name &&
    shippingInfo.email &&
    shippingInfo.address &&
    shippingInfo.city &&
    shippingInfo.state &&
    shippingInfo.zip &&
    shippingInfo.country;

  useEffect(() => {
    if (!isShow) {
      setCart(
        FRAME_OPTIONS.map(option => ({
          ...option,
          qty: 0,
        }))
      );
    }
  }, [isShow]);

  return (
    <Modal show={isShow} onHide={onHideModal} className={s.CheckoutModal}>
      <Modal.Header closeButton />
      <Modal.Body>
        <div>
          <div className={s.CheckoutModal_title}>Buy Gen-Frame</div>
          <div className={s.CheckoutModal_optionsContainer}>
            {cart.map((option, i) => (
              <div key={option.id} className={s.CheckoutModal_optionItem}>
                <div className={s.CheckoutModal_optionItemPrice}>
                  {`${option.price} ETH`}
                </div>
                <div className={s.CheckoutModal_optionItemContainer}>
                  <div>{option.name}</div>
                  <InputQuantity
                    defaultValue={option.qty}
                    minimumQuantity={0}
                    size="sm"
                    className={s.CheckoutModal_optionItemQty}
                    onChange={(qty: number) => onChangeQty(qty, i)}
                  />
                </div>
              </div>
            ))}
          </div>
          <div
            className={cn(s.CheckoutModal_title, s.CheckoutModal_shippingTitle)}
          >
            Shipping information
          </div>
          <div>
            {/*<Dropdown*/}
            {/*  values={selectedCountry ? [selectedCountry] : []}*/}
            {/*  options={Countries}*/}
            {/*  labelField="value"*/}
            {/*  valueField="key"*/}
            {/*  searchable={false}*/}
            {/*  multi={false}*/}
            {/*  /!* eslint-disable-next-line @typescript-eslint/no-unused-vars *!/*/}
            {/*  onChange={value => {*/}
            {/*    // setShippingInfo({*/}
            {/*    //   ...shippingInfo,*/}
            {/*    //   country: value[0]?.key || '',*/}
            {/*    // });*/}
            {/*  }}*/}
            {/*  placeholder="Country/Region"*/}
            {/*  className={s.CheckoutModal_input}*/}
            {/*  required*/}
            {/*/>*/}
            <Input
              placeholder="Full name"
              className={s.CheckoutModal_input}
              value={shippingInfo.name}
              onChange={value =>
                setShippingInfo({
                  ...shippingInfo,
                  name: (value as string) || '',
                })
              }
              required
            />
            <Input
              placeholder="Email"
              type="email"
              className={s.CheckoutModal_input}
              value={shippingInfo.email}
              onChange={value =>
                setShippingInfo({
                  ...shippingInfo,
                  email: (value as string) || '',
                })
              }
              required
            />
            <Input
              placeholder="Street address"
              className={s.CheckoutModal_input}
              value={shippingInfo.address}
              onChange={value =>
                setShippingInfo({
                  ...shippingInfo,
                  address: (value as string) || '',
                })
              }
              required
            />
            <Input
              placeholder="Apartment, suite, etc"
              className={s.CheckoutModal_input}
              value={shippingInfo.address2}
              onChange={value =>
                setShippingInfo({
                  ...shippingInfo,
                  address2: (value as string) || '',
                })
              }
            />
            <div className={s.CheckoutModal_regionGroup}>
              <Input
                placeholder="City"
                value={shippingInfo.city}
                onChange={value =>
                  setShippingInfo({
                    ...shippingInfo,
                    city: (value as string) || '',
                  })
                }
                required
              />
              {/*{shippingInfo.country === 'US' ? (*/}
              {/*  <Dropdown*/}
              {/*    values={selectedState ? [selectedState] : []}*/}
              {/*    options={StateOfUS}*/}
              {/*    labelField="value"*/}
              {/*    valueField="key"*/}
              {/*    placeholder="State"*/}
              {/*    onChange={value =>*/}
              {/*      setShippingInfo({*/}
              {/*        ...shippingInfo,*/}
              {/*        state: (value[0] as any)?.key,*/}
              {/*      })*/}
              {/*    }*/}
              {/*    required*/}
              {/*  />*/}
              {/*) : (*/}
              {/*  <Input*/}
              {/*    placeholder="State"*/}
              {/*    value={shippingInfo.state}*/}
              {/*    onChange={value =>*/}
              {/*      setShippingInfo({*/}
              {/*        ...shippingInfo,*/}
              {/*        state: (value as string) || '',*/}
              {/*      })*/}
              {/*    }*/}
              {/*    required*/}
              {/*  />*/}
              {/*)}*/}
              <Input
                placeholder="Zip code"
                value={shippingInfo.zip}
                onChange={value =>
                  setShippingInfo({
                    ...shippingInfo,
                    zip: (value as string) || '',
                  })
                }
                required
              />
            </div>
          </div>
        </div>
        <div className={s.CheckoutModal_orderSummary}>
          <div className={s.CheckoutModal_title}>Order summary</div>
          <div className={s.CheckoutModal_summaryLine}>
            <div>Items</div>
            <div>{`${totalPrice} ETH`}</div>
          </div>
          <div className={s.CheckoutModal_summaryLine}>
            <div>Shipping & handling</div>
            <div className={s.highlight}>FREE</div>
          </div>
          <div className={s.CheckoutModal_summaryLine}>
            <div>Payment Total:</div>
            <div className={s.CheckoutModal_totalPrice}>
              {`${totalPrice} ETH`}
            </div>
          </div>
          <Button
            size="xl"
            className={s.CheckoutModal_submitBtn}
            onClick={placeOrder}
            disabled={!isEnablePaymentBtn}
          >
            Place your order
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default CheckoutModal;
