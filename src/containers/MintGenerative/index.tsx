import ClientOnly from '@components/Utils/ClientOnly';
import { MintGenerativeContextProvider } from '@contexts/mint-generative-context';
import React from 'react';
import MintGenerativeController from './MintGenerativeController';

const MintGenerative: React.FC = (): React.ReactElement => {
  return (
    <MintGenerativeContextProvider>
      <ClientOnly>
        <MintGenerativeController />
      </ClientOnly>
    </MintGenerativeContextProvider>
  );
};

export default MintGenerative;
