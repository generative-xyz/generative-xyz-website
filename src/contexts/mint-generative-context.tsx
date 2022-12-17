import { SandboxFiles } from '@interfaces/sandbox';
import React, {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from 'react';

type Props = {
  children: React.ReactNode;
};

export type MintGenerativeContextTypes = {
  currentStep: number;
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
  filesSandbox: SandboxFiles | null;
  setFilesSandbox: Dispatch<SetStateAction<SandboxFiles | null>>;
};

export const MintGenerativeContext =
  createContext<MintGenerativeContextTypes | null>(null);

export const MintGenerativeContextProvider = ({ children }: Props) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [filesSandbox, setFilesSandbox] = useState<SandboxFiles | null>(null);

  return (
    <MintGenerativeContext.Provider
      value={{ currentStep, setCurrentStep, filesSandbox, setFilesSandbox }}
    >
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
