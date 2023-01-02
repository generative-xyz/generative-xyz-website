import s from './styles.module.scss';
import React from 'react';
import Button from '@components/ButtonIcon';

const MintSuccess = () => {
  return (
    <div className={s.mintSuccess}>
      <h2 className={s.title}>Your Generative NFT is now on the Blockchain.</h2>
      <div className={s.actionWrapper}>
        <Button>go to project page</Button>
      </div>
    </div>
  );
};

export default MintSuccess;
