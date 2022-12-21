import Button from '@components/Button';
import Checkbox from '@components/Checkbox';
import FormikController from '@components/Formik/Controller';
import {
  MintGenerativeContext,
  MintGenerativeContextTypes,
} from '@contexts/mint-generative-context';
import { MintGenerativeStep } from '@enums/mint-generative';
import { useRouter } from 'next/router';
import { useContext, useEffect } from 'react';
import styles from './styles.module.scss';

// type Props = {};

const THIRD_PARTY_SCRIPTS = [
  {
    key: 'p5js',
    value: 'p5js@1.5.0',
  },
  {
    key: 'threejs',
    value: 'threejs@r124',
  },
  {
    key: 'tonejs',
    value: 'tonejs@14.8.49',
  },
];

const Step2 = () => {
  const { setCurrentStep, attributes } = useContext(
    MintGenerativeContext
  ) as MintGenerativeContextTypes;

  const router = useRouter();

  useEffect(() => {
    setCurrentStep(MintGenerativeStep.PRODUCT_DETAIL);
  }, [setCurrentStep]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.form}>
        <FormikController
          control="input"
          label="Name of the piece *"
          name="name"
        />
        <FormikController
          control="textArea"
          name="tokenDescription"
          label="Generative token description*"
          // placeholder="Provide a detailed description of your item."
          // required
        />
        <FormikController
          control="textArea"
          name="description"
          label="Collected NFTs description"
          // placeholder="Provide a detailed description of your item."
          // required
        />
        <FormikController
          control="input"
          name="hashtag"
          label="Hashtag *"
          // placeholder="Provide a detailed description of your item."
          // required
        />
        <FormikController
          control="checkbox"
          name="thirdPartyScripts"
          label="Third Party Scripts"
          options={THIRD_PARTY_SCRIPTS}
          // placeholder="Provide a detailed description of your item."
          // required
        />

        <div>
          <label>Labels</label>

          <div className={styles.categories}>
            {attributes &&
              Object.entries(attributes).length > 0 &&
              Object.entries(attributes).map(([key, value]) => (
                <Checkbox id={key} key={key} label={value} />
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
      {/* <PreviewInfo /> */}
    </div>
  );
};

export default Step2;
