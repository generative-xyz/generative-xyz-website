import Button from '@components/Button';
import Checkbox from '@components/Checkbox';
import Input from '@components/Input/TextInput';
import {
  MintGenerativeContext,
  MintGenerativeContextTypes,
} from '@contexts/mint-generative-context';
import { MintGenerativeStep } from '@enums/mint-generative';
import React, { useContext, useEffect } from 'react';
import PreviewInfo from '../PreviewInfo';
import styles from './styles.module.scss';
import { useRouter } from 'next/router';

// type Props = {};

const Step2 = () => {
  const { setCurrentStep } = useContext(
    MintGenerativeContext
  ) as MintGenerativeContextTypes;

  const router = useRouter();

  const categoryList = [
    {
      label: 'Cate 1',
      id: 'cate-1',
    },
    {
      label: 'Cate 2',
      id: 'cate-2',
    },
    {
      label: 'Cate 3',
      id: 'cate-3',
    },
    {
      label: 'Cate 4',
      id: 'cate-4',
    },
  ];

  useEffect(() => {
    setCurrentStep(MintGenerativeStep.PRODUCT_DETAIL);
  }, [setCurrentStep]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.form}>
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
        <div>
          <label>Labels</label>
          <div className={styles.categories}>
            {categoryList?.map(category => (
              <Checkbox
                id={category.id}
                key={category.id}
                label={category.label}
              />
            ))}
          </div>
        </div>
        <Button
          className="wFull"
          onClick={() => router.push('/mint-generative/set-price')}
        >
          Next Step
        </Button>
      </div>
      <PreviewInfo />
    </div>
  );
};

export default Step2;
