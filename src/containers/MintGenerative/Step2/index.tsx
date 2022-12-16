import Button from '@components/Button';
import Input from '@components/Input/TextInput';
import {
  MintGenerativeContext,
  MintGenerativeContextTypes,
} from '@contexts/MintGenerativeContexts';
import { MintGenerativeStep } from '@enums/mint-generative';
import React, { useContext, useEffect } from 'react';
import styles from './styles.module.scss';

// type Props = {};

const Step2 = () => {
  const { setCurrentStep } = useContext(
    MintGenerativeContext
  ) as MintGenerativeContextTypes;

  useEffect(() => {
    setCurrentStep(MintGenerativeStep.PRODUCT_DETAIL);
  }, []);

  return (
    <div className={styles.wrapper}>
      <form className={styles.form}>
        <Input
          name="piece-name"
          placeholder="Piece name"
          label="Name of the piece *"
          desc={'[description]'}
          className={styles.input}
          required
        />
        <Input
          name="piece-desc"
          placeholder="Provide a detailed description of your item."
          label="Generative token description*"
          required
          as="textarea"
        />
        <Input
          name="collected-desc"
          placeholder="Provide a detailed description of your item."
          label="Collected NFTs description"
          desc={'[description]'}
          as="textarea"
        />
        <Input
          name="hashtag"
          placeholder="Hashtag"
          label="Hashtag *"
          desc={'[description]'}
          className={styles.input}
          required
        />
        <Button className="wFull">Next Step</Button>
      </form>
    </div>
  );
};

export default Step2;
