import FormikController from '@components/Formik/Controller';
import Link from '@components/Link';
import styles from './styles.module.scss';

const Step3 = () => {
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
            label="Royalties(%)*"
            // placeholder="Provide a detailed description of your item."
            // required
          />
        </div>
      </div>
    </div>
  );
};

export default Step3;
