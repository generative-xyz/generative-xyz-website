import {
  ISandboxRef,
  RawTokenAttributes,
  SandboxFiles,
} from '@interfaces/sandbox';
import { generateHash } from '@utils/generate-data';
import React, {
  Dispatch,
  RefObject,
  SetStateAction,
  createContext,
  useContext,
  useRef,
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
  attributes: RawTokenAttributes | null;
  setAttributes: Dispatch<SetStateAction<RawTokenAttributes | null>>;
  file: File | null;
  setFile: Dispatch<SetStateAction<File | null>>;
  sandboxRef: RefObject<ISandboxRef>;
  hash: string;
  setHash: Dispatch<SetStateAction<string>>;
};

export const MintGenerativeContext =
  createContext<MintGenerativeContextTypes | null>(null);

export const MintGenerativeContextProvider = ({ children }: Props) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [filesSandbox, setFilesSandbox] = useState<SandboxFiles | null>(null);
  const [attributes, setAttributes] = useState<RawTokenAttributes | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const sandboxRef = useRef<ISandboxRef>(null);
  const [hash, setHash] = useState<string>(generateHash());

  return (
    <MintGenerativeContext.Provider
      value={{
        currentStep,
        setCurrentStep,
        filesSandbox,
        setFilesSandbox,
        attributes,
        setAttributes,
        file,
        setFile,
        sandboxRef,
        hash,
        setHash,
      }}
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
