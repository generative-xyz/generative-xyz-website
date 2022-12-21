import FormikController from '@components/Formik/Controller';
import Link from '@components/Link';
import {
  MintGenerativeContext,
  MintGenerativeContextTypes,
} from '@contexts/mint-generative-context';
import { MintGenerativeStep } from '@enums/mint-generative';
import { useContext, useEffect } from 'react';

import styles from './styles.module.scss';

// const enum TABS {
//   FIXED,
//   AUCTION,
// }

const Step3 = () => {
  const { setCurrentStep } = useContext(
    MintGenerativeContext
  ) as MintGenerativeContextTypes;

  // const [tabActive, setTabActive] = useState(TABS.FIXED);

  useEffect(() => {
    setCurrentStep(MintGenerativeStep.SET_PRICE);
  });

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
          {/* <Input
            name="edition-num"
            placeholder="Number here"
            label="Number of editions *"
            desc={
              'how many NFT can be generated using your Token - can only be decreased after publication'
            }
            className={styles.input}
            type="number"
            required
          /> */}
          <FormikController
            control="input"
            type="number"
            name="maxSupply"
            label="Number of editions *"
            // placeholder="Provide a detailed description of your item."
            // required
          />

          {/* <div className="">
            <label className="block mb1">Pricing method *</label>
            <p className="textSecondary">
              You will not be able to update the pricing method after
              publication, only its pricing settings
            </p>
            <div className={styles.methodOptions}>
              <div
                className={tabActive === TABS.FIXED ? styles.active : ''}
                onClick={() => setTabActive(TABS.FIXED)}
              >
                Fixed price
              </div>
              <div
                className={tabActive === TABS.AUCTION ? styles.active : ''}
                onClick={() => setTabActive(TABS.AUCTION)}
              >
                Dutch auction
              </div>
            </div>
          </div> */}
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
          {/* <Input name="price" placeholder="0.00" label="Price" /> */}
          {/* <Input
            name="royalties"
            placeholder="0"
            label="Royalties*"
            desc={'in %, between 10 - 25'}
            className={styles.input}
            type="number"
            required
          /> */}
          {/* <Button
            className="wFull"
            onClick={handleSubmit}
            // onClick={() => router.push('/mint-generative/set-price')}
          >
            Publish project
          </Button> */}
        </div>
      </div>
      {/* <PreviewInfo /> */}
    </div>
  );
};

export default Step3;
