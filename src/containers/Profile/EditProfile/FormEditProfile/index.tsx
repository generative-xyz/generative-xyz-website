import Input from '@components/Formik/Input';
import { Form } from 'formik';
import React from 'react';
import s from './styles.module.scss';
import Text from '@components/Text';
import ButtonIcon from '@components/ButtonIcon';

const FormEditProfile = () => {
  return (
    <Form className={s.wrapper}>
      <div className={s.input_item}>
        <Input
          name={'nickname'}
          label={'nickname'}
          placeholder="Nickname"
          className={s.input_nickname}
        ></Input>
        <Text size="14" className="text-secondary-color">
          Other users will see your nickname instead of your wallet address on
          OG website.
        </Text>
      </div>
      <div className={s.input_item}>
        <Input
          placeholder="Tell us more about yourself"
          name={'bio'}
          label={'bio'}
          className={s.input_bio}
          as="textarea"
        ></Input>
      </div>
      <div className={s.input_item}>
        <Text size="18" fontWeight="bold" style={{ marginBottom: '10px' }}>
          Social Connections
        </Text>
        <div className={s.input_social}>
          <Input
            name={'website'}
            label={'website'}
            placeholder="https://"
            className={s.input_website}
          ></Input>
          <Input
            name={'instagram'}
            label={'instagram'}
            placeholder="Instagram"
            className={s.input_website}
          ></Input>
          <Input
            name={'discord'}
            label={'discord'}
            placeholder="Discord"
            className={s.input_website}
          ></Input>
          <Input
            name={'twitter'}
            label={'twitter'}
            placeholder="Twitter"
            className={s.input_website}
          ></Input>
          <Input
            name={'medium'}
            label={'medium'}
            placeholder="Medium"
            className={s.input_website}
          ></Input>
          <ButtonIcon className={s.submit_btn}>Save changes</ButtonIcon>
        </div>
      </div>
    </Form>
  );
};

export default FormEditProfile;
