import { MintGenerativeStep } from '@enums/mint-generative';
import { IFormValue } from '@interfaces/mint-generative';
import {
  ISandboxRef,
  RawTokenAttributes,
  SandboxFiles,
} from '@interfaces/sandbox';
import { generateHash } from '@utils/generate-data';
import { useRouter } from 'next/router';
import React, {
  Dispatch,
  RefObject,
  SetStateAction,
  createContext,
  useRef,
  useState,
  useMemo,
} from 'react';

type Props = {
  children: React.ReactNode;
};

export type TMintGenerativeContext = {
  currentStep: number;
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
  formValues: Partial<IFormValue>;
};

const initialValues: TMintGenerativeContext = {
  currentStep: 1,
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
  formValues: {} as IFormValue,
};

export const MintGenerativeContext =
  createContext<TMintGenerativeContext>(initialValues);

export const MintGenerativeContextProvider = ({ children }: Props) => {
  const router = useRouter();
  const { stepParam } = router.query;
  const [filesSandbox, setFilesSandbox] = useState<SandboxFiles | null>(null);
  const [attributes, setAttributes] = useState<RawTokenAttributes | null>(null);
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [zipFile, setZipFile] = useState<File | null>(null);
  const sandboxRef = useRef<ISandboxRef | null>(null);
  const [hash, setHash] = useState<string>(generateHash());
  const [formValues] = useState({} as IFormValue);

  const currentStep = useMemo(() => {
    switch (stepParam) {
      case MintGenerativeStep.UPLOAD_PROJECT:
        return 1;

      case MintGenerativeStep.PROJECT_DETAIL:
        return 2;

      case MintGenerativeStep.SET_PRICE:
        return 3;

      default:
        return 1;
    }
  }, [stepParam]);

  return (
    <MintGenerativeContext.Provider
      value={{
        currentStep,
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
        formValues,
      }}
    >
      {children}
    </MintGenerativeContext.Provider>
  );
};
