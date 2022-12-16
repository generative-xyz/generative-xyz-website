import {
  MintGenerativeContext,
  MintGenerativeContextTypes,
} from '@contexts/MintGenerativeContexts';
import { MintGenerativeStep } from '@enums/mint-generative';
import React, { useContext, useEffect } from 'react';

// type Props = {};

const Step2 = () => {
  const { setCurrentStep } = useContext(
    MintGenerativeContext
  ) as MintGenerativeContextTypes;

  useEffect(() => {
    setCurrentStep(MintGenerativeStep.PRODUCT_DETAIL);
  }, []);

  return <div>Step2</div>;
};

export default Step2;
