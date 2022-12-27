import cn from 'classnames';
import React, { useEffect, useMemo, useState } from 'react';
import { Modal } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import Web3Utils from 'web3-utils';

import Button from '@components/Button';
import Dropdown from '@components/Dropdown';
import Input from '@components/Input';
import InputQuantity from '@components/InputQuantity';
import Countries from '@constants/country-list.json';
import { FRAME_OPTIONS } from '@constants/frame';
import StateOfUS from '@constants/state-of-us.json';
import { setCheckoutProductId } from '@redux/general/action';
import { checkoutProductId } from '@redux/general/selector';
import { useAppDispatch } from '@redux/index';
import { makeOrder } from '@services/api/order';

import { useRouter } from 'next/router';
import s from './CheckoutModal.module.scss';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// import { faSpinner } from '@fortawesome/pro-regular-svg-icons';

interface IPropState {
  name: any;
  email: any;
  address: any;
  address2: any;
  city: any;
  state: any;
  zip: any;
  country: any;
}

interface ICart extends IFrame {
  qty: number;
}

const CheckoutModal: React.FC = (): JSX.Element => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const checkoutProduct = useSelector(checkoutProductId);
  const isShow = !!checkoutProduct;

  const onHideModal = () => dispatch(setCheckoutProductId(''));
  const [isLoading, setIsLoading] = useState(false);
  const [order, setOrder] = useState({} as any);

  const [cart, setCart] = useState<ICart>({
    id: '',
    name: '',
    price: 0,
    img: '',
    imgLeft: '',
    qty: 0,
  });

  const itemInCart =
    FRAME_OPTIONS.find(item => item.id === checkoutProduct) || cart;

  const [shippingInfo, setShippingInfo] = useState<IPropState>({
    name: '',
    email: '',
    address: '',
    address2: '',
    city: '',
    state: '',
    zip: '',
    country: '',
  });

  const selectedCountry = useMemo(
    () => Countries.find(item => item.key === shippingInfo.country),
    [shippingInfo.country]
  );
  const selectedState = useMemo(
    () =>
      shippingInfo.country === 'US' &&
      StateOfUS.find(item => item.key === shippingInfo.state),
    [shippingInfo.state]
  );

  // const onChangeQty = () => {
  //   return;
  // };

  // const onChangeQty = (qty: number, cartIndex: number) => {
  // cart[cartIndex].qty = qty;
  // setCart([...cart]);
  // };

  const totalPrice = 0;
  // const totalPrice = useMemo(
  //   () =>
  //     Math.round(
  //       cart.reduce((prev, current) => prev + current.price * current.qty, 0) *
  //         10e9
  //     ) / 10e9,
  //   [cart]
  // );

  const processOrder = async () => {
    if (order.order_id) {
      setIsLoading(true);

      if (typeof window.ethereum !== 'undefined') {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const accounts = await window.ethereum.request({
          method: 'eth_requestAccounts',
        });

        const value = Web3Utils.toHex(
          Web3Utils.toWei(totalPrice.toString(), 'ether')
        );

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const txHash = await window.ethereum.request({
          method: 'eth_sendTransaction',
          params: [
            {
              from: accounts[0],
              to: order.master_address,
              value: value,
            },
          ],
        });

        if (txHash) {
          onHideModal();
          router.push(`/order/${order.order_id}`);
        }
      } else {
        onHideModal();
        router.push(`/order/${order.order_id}`);
      }
    }

    setIsLoading(false);
  };

  const placeOrder = async () => {
    if (order.order_id) {
      return await processOrder();
    }

    try {
      setIsLoading(true);

      const { data: newOrder } = await makeOrder({
        details: { id: cart?.id || '', qty: cart?.qty || 0 },
        ...shippingInfo,
      });

      if (!newOrder.order_id) return;

      setOrder(newOrder);
    } catch (e) {
      // eslint-disable-next-line no-console
      console.error(e);
      setIsLoading(false);
    }
  };

  // const fetchProductList = async ()

  const isEnablePaymentBtn =
    totalPrice > 0 &&
    shippingInfo.name &&
    shippingInfo.email &&
    shippingInfo.address &&
    shippingInfo.city &&
    shippingInfo.state &&
    shippingInfo.zip &&
    shippingInfo.country;

  // useEffect(() => {
  //   if (!isShow) {
  //     setCart(
  //       FRAME_OPTIONS.map(option => ({
  //         ...option,
  //         qty: 0,
  //       }))
  //     );
  //   }
  // }, [isShow]);

  useEffect(() => {
    setCart({ ...itemInCart, qty: 0 });
  }, [itemInCart]);

  useEffect(() => {
    setOrder({});
  }, [cart, shippingInfo]);

  useEffect(() => {
    processOrder();
  }, [order]);

  return (
    <Modal show={isShow} onHide={onHideModal} className={s.CheckoutModal}>
      <Modal.Header closeButton />
      <Modal.Body>
        <div>
          <div className={s.CheckoutModal_title}>Buy Gen-Frame</div>
          <div className={s.CheckoutModal_optionsContainer}>
            <div key={cart?.id} className={s.CheckoutModal_optionItem}>
              <img src={cart?.img} alt="" />
              <div className={s.CheckoutModal_optionItemContainer}>
                <div>
                  <div className={s.CheckoutModal_optionItemName}>
                    {cart?.name}
                  </div>
                  <div className={s.CheckoutModal_optionItemPrice}>
                    {`${cart?.price} ETH`}
                  </div>
                </div>
                <InputQuantity
                  defaultValue={cart?.qty}
                  minimumQuantity={0}
                  size="sm"
                  className={s.CheckoutModal_optionItemQty}
                  // onChange={(qty: number) => onChangeQty(qty, i)}
                />
              </div>
            </div>
          </div>
          <div
            className={cn(s.CheckoutModal_title, s.CheckoutModal_shippingTitle)}
          >
            Shipping information
          </div>
          <div>
            <Dropdown
              values={selectedCountry ? [selectedCountry] : []}
              options={Countries}
              labelField="value"
              valueField="key"
              searchable={false}
              multi={false}
              onChange={value => {
                setShippingInfo({
                  ...shippingInfo,
                  country: (value[0] as any)?.key || '',
                });
              }}
              placeholder="Country/Region"
              className={s.CheckoutModal_input}
              required
            />
            <Input
              placeholder="Full name"
              className={s.CheckoutModal_input}
              value={shippingInfo.name}
              onChange={value =>
                setShippingInfo({
                  ...shippingInfo,
                  name: value,
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
                  email: value,
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
                  address: value,
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
                  address2: value,
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
                    city: value,
                  })
                }
                required
              />
              {shippingInfo.country === 'US' ? (
                <Dropdown
                  values={selectedState ? [selectedState] : []}
                  options={StateOfUS}
                  labelField="value"
                  valueField="key"
                  placeholder="State"
                  onChange={value =>
                    setShippingInfo({
                      ...shippingInfo,
                      state: (value[0] as any)?.key,
                    })
                  }
                  required
                />
              ) : (
                <Input
                  placeholder="State"
                  value={shippingInfo.state}
                  onChange={value =>
                    setShippingInfo({
                      ...shippingInfo,
                      state: value,
                    })
                  }
                  required
                />
              )}
              <Input
                placeholder="Zip code"
                value={shippingInfo.zip}
                onChange={value =>
                  setShippingInfo({
                    ...shippingInfo,
                    zip: value,
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
            <div className={s.highlight}>{`${totalPrice} ETH`}</div>
          </div>
          <div className={s.CheckoutModal_summaryLine}>
            <div>
              Shipping
              <div className={s.CheckoutModal_orderShippingDate}>
                Delivery: 14 working days
              </div>
            </div>
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
            disabled={!isEnablePaymentBtn || isLoading}
          >
            {isLoading
              ? `Processing...` //todo ducanh
              : // <FontAwesomeIcon icon={faSpinner} size="2x" pulse />
                'Place your order'}
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default CheckoutModal;
