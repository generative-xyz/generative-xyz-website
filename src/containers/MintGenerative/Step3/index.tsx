import FormikController from '@components/Formik/Controller';
import Link from '@components/Link';
import {
  MintGenerativeContext,
  MintGenerativeContextTypes,
} from '@contexts/mint-generative-context';
import { MintGenerativeStep } from '@enums/mint-generative';
import { useContext, useEffect } from 'react';

import styles from './styles.module.scss';
import { useFormikContext } from 'formik';

// const enum TABS {
//   FIXED,
//   AUCTION,
// }

const Step3 = () => {
  const { setCurrentStep } = useContext(
    MintGenerativeContext
  ) as MintGenerativeContextTypes;

  // const [tabActive, setTabActive] = useState(TABS.FIXED);
  const formikProps = useFormikContext();

  useEffect(() => {
    setCurrentStep(MintGenerativeStep.SET_PRICE);
  });

  useEffect(() => {
    formikProps.setFieldValue('scripts', ['test']);
  }, []);

  return (
    <div className={styles.wrapper}>
      <div className={styles.form}>
        <label>How will your piece be sold</label>
        <p className="textSecondary mb8">
          Read more pricing guide <Link href="#">here</Link>
        </p>
        <p className="textSecondary mb8">
          You will be able to edit these settings after the publication, except
          if stated otherwise on the corresponding fields.
        </p>
        <div className={styles.inputGroup}>
          <FormikController
            control="input"
            type="number"
            name="maxSupply"
            label="Number of editions *"
            // placeholder="Provide a detailed description of your item."
            // required
          />

          <FormikController
            control="input"
            type="number"
            name="mintPrice"
            label="Price"
            // placeholder="Provide a detailed description of your item."
            // required
          />
          <FormikController
            control="input"
            type="number"
            name="royalty"
            label="Royalties*"
            // placeholder="Provide a detailed description of your item."
            // required
          />
        </div>
      </div>
    </div>
  );
};

export default Step3;
