import { MintGenerativeStep } from '@enums/mint-generative';
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
  useRef,
  useState,
} from 'react';

type Props = {
  children: React.ReactNode;
};

export type TMintGenerativeContext = {
  currentStep: MintGenerativeStep;
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
  filesSandbox: SandboxFiles | null;
  setFilesSandbox: Dispatch<SetStateAction<SandboxFiles | null>>;
  attributes: RawTokenAttributes | null;
  setAttributes: Dispatch<SetStateAction<RawTokenAttributes | null>>;
  zipFile: File | null;
  setZipFile: Dispatch<SetStateAction<File | null>>;
  thumbnailFile: File | null;
  setThumbnailFile: Dispatch<SetStateAction<File | null>>;
  sandboxRef: RefObject<ISandboxRef | null>;
  hash: string;
  setHash: Dispatch<SetStateAction<string>>;
};

const initialValues: TMintGenerativeContext = {
  currentStep: MintGenerativeStep.UPLOAD_PROJECT,
  setCurrentStep: _ => {
    return;
  },
  filesSandbox: null,
  setFilesSandbox: _ => {
    return;
  },
  attributes: null,
  setAttributes: _ => {
    return;
  },
  zipFile: null,
  setZipFile: _ => {
    return;
  },
  thumbnailFile: null,
  setThumbnailFile: _ => {
    return;
  },
  sandboxRef: React.createRef(),
  hash: '',
  setHash: _ => {
    return;
  },
};

export const MintGenerativeContext =
  createContext<TMintGenerativeContext>(initialValues);

export const MintGenerativeContextProvider = ({ children }: Props) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [filesSandbox, setFilesSandbox] = useState<SandboxFiles | null>(null);
  const [attributes, setAttributes] = useState<RawTokenAttributes | null>(null);
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [zipFile, setZipFile] = useState<File | null>(null);
  const sandboxRef = useRef<ISandboxRef | null>(null);
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
        zipFile,
        setZipFile,
        thumbnailFile,
        setThumbnailFile,
        sandboxRef,
        hash,
        setHash,
      }}
    >
      {children}
    </MintGenerativeContext.Provider>
  );
};
