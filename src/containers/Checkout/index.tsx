import React from 'react';
import { Container } from 'react-bootstrap';
import { Formik } from 'formik';

import Input from '@components/Input';

import s from './Checkout.module.scss';
import Button from '@components/Button';
import InputQuantity from '@components/InputQuantity';

const CheckoutTemplate: React.FC = (): JSX.Element => {
  return (
    <Formik
      initialValues={{
        fullName: '',
        email: '',
        address: '',
        address2: '',
        city: '',
        state: '',
        zip: '',
      }}
      onSubmit={() => {
        //
      }}
    >
      <Container className={s.Checkout}>
        <div>
          <div className={s.Checkout_title}>Shipping information</div>
          <Input
            name="fullName"
            placeholder="Full name"
            className={s.Checkout_input}
            usingFormik
          />
          <Input
            name="email"
            placeholder="Email"
            className={s.Checkout_input}
            usingFormik
          />
          <Input
            name="address"
            placeholder="Street address"
            className={s.Checkout_input}
            usingFormik
          />
          <Input
            name="address2"
            placeholder="Apartment, suite, etc"
            className={s.Checkout_input}
            usingFormik
          />
          <div className={s.Checkout_postalWrapper}>
            <Input
              name="city"
              placeholder="City"
              className={s.Checkout_input}
              usingFormik
            />
            <Input
              name="state"
              placeholder="State"
              className={s.Checkout_input}
              usingFormik
            />
            <Input
              name="zip"
              placeholder="Zip code"
              className={s.Checkout_input}
              usingFormik
            />
          </div>
          <div className={s.Checkout_orderDetailContainer}>
            <div className={s.Checkout_title}>Order detail</div>
            <div className={s.Checkout_orderDetailWrapper}>
              <img
                src="https://cdn.autonomous.ai/static/upload/images/product/image/smartdesk-2-home-1.2474_16.36_17.1881_2.4-1657597559917.jpg"
                alt=""
                className={s.Checkout_productImg}
              />
              <div>
                <div className={s.Checkout_productName}>Gen Frame Standard</div>
                <div className={s.Checkout_productOption}>
                  Frame color: White
                </div>
                <div className={s.Checkout_qtyWrapper}>
                  <InputQuantity className={s.qtyInput} />
                  <div className={s.price}>1 ETH</div>
                </div>
                <div className={s.Checkout_shippingInfo}>
                  Ready to ship from Dec 11, 2022
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className={s.Checkout_title}>Order summary</div>
          <div className={s.Checkout_itemPrice}>
            <span>Items</span>
            <span>1 ETH</span>
          </div>
          <div className={s.Checkout_shippingPrice}>
            <span>Shipping & handling</span>
            <span>0 ETH</span>
          </div>
          <div className={s.Checkout_taxPrice}>
            <span>Tax</span>
            <span>0 ETH</span>
          </div>
          <div className={s.Checkout_totalPrice}>
            <span>Payment Total:</span>
            <span className={s.price}>
              1 ETH
              <br />
              <span className={s.estPrice}>= ~$1,499</span>
            </span>
          </div>
          <Button variant="black" size="xl" className={s.Checkout_submitBtn}>
            Place your order
          </Button>
        </div>
      </Container>
    </Formik>
  );
};

export default CheckoutTemplate;
