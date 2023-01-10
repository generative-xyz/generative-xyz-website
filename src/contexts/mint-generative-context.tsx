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
  useEffect,
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
  setFormValues: Dispatch<SetStateAction<Partial<IFormValue>>>;
  thumbnailPreviewUrl: string | null;
  setThumbnailPreviewUrl: Dispatch<SetStateAction<string | null>>;
  mintedProjectID: string | null;
  setMintedProjectID: Dispatch<SetStateAction<string | null>>;
  showErrorAlert: { open: boolean; message: string | null };
  setShowErrorAlert: Dispatch<
    SetStateAction<{ open: boolean; message: string | null }>
  >;
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
  formValues: {},
  setFormValues: _ => {
    return;
  },
  thumbnailPreviewUrl: null,
  setThumbnailPreviewUrl: _ => {
    return;
  },
  mintedProjectID: null,
  setMintedProjectID: _ => {
    return;
  },
  showErrorAlert: { open: false, message: null },
  setShowErrorAlert: _ => {
    return;
  },
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
  const [formValues, setFormValues] = useState<Partial<IFormValue>>({
    mintPrice: '0.0001',
  });
  const [thumbnailPreviewUrl, setThumbnailPreviewUrl] = useState<string | null>(
    null
  );
  const [mintedProjectID, setMintedProjectID] = useState<string | null>(null);
  const [showErrorAlert, setShowErrorAlert] = useState<{
    open: boolean;
    message: string | null;
  }>({ open: false, message: null });

  useEffect(() => {
    if (!thumbnailFile) {
      setThumbnailPreviewUrl(null);
      return;
    }

    const objectUrl = URL.createObjectURL(thumbnailFile);
    setThumbnailPreviewUrl(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [thumbnailFile]);

  const currentStep = useMemo(() => {
    switch (stepParam) {
      case MintGenerativeStep.UPLOAD_PROJECT:
        return 1;

      case MintGenerativeStep.PROJECT_DETAIL:
        return 2;

      case MintGenerativeStep.SET_PRICE:
        return 3;

      case MintGenerativeStep.MINT_SUCCESS:
        return 4;

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
        setFormValues,
        thumbnailPreviewUrl,
        setThumbnailPreviewUrl,
        mintedProjectID,
        setMintedProjectID,
        showErrorAlert,
        setShowErrorAlert,
      }}
    >
      {children}
    </MintGenerativeContext.Provider>
  );
};
