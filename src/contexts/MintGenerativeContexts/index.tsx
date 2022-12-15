import React, { createContext, useContext, useState } from 'react';

type Props = {
  children: React.ReactNode;
};

export type MintGenerativeContextTypes = {
  currentStep: number;
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
};

export const MintGenerativeContext =
  createContext<MintGenerativeContextTypes | null>(null);

export const MintGenerativeContextProvider = ({ children }: Props) => {
  const [currentStep, setCurrentStep] = useState(1);

  return (
    <MintGenerativeContext.Provider value={{ currentStep, setCurrentStep }}>
      {children}
    </MintGenerativeContext.Provider>
  );
};

export const useMintGenerativeContext = () => {
  const context = useContext(MintGenerativeContext);

  if (!context)
    throw new Error(
      'MintGenerativeContext must be called from within the MintGenerativeContextProvider'
    );

  return context;
};
