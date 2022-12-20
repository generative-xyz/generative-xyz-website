import Button from '@components/Button';
import Checkbox from '@components/Checkbox';
import DropFile from '@components/Input/DropFile';
import Link from '@components/Link';
import {
  MintGenerativeContext,
  MintGenerativeContextTypes,
} from '@contexts/mint-generative-context';
import { LogLevel } from '@enums/log-level';
import { MintGenerativeStep } from '@enums/mint-generative';
import { ISandboxRef } from '@interfaces/sandbox';
import { generateHash } from '@utils/generate-data';
import log from '@utils/logger';
import { processSandboxZipFile } from '@utils/sandbox';
import { prettyPrintBytes } from '@utils/units';
import cs from 'classnames';
import Image from 'next/image';
import { useRouter } from 'next/router';
import CheckIcon from 'public/assets/icons/check-circle.svg';
import { useContext, useEffect, useMemo, useRef, useState } from 'react';
import styles from './styles.module.scss';

// type Props = {};

const LOG_PREFIX = 'MintGenerativeStep1';

const Step1 = () => {
  const { filesSandbox, setCurrentStep, setFilesSandbox, file, setFile } =
    useContext(MintGenerativeContext) as MintGenerativeContextTypes;
  const router = useRouter();

  const sandboxRef = useRef<ISandboxRef>(null);

  const [hash, setHash] = useState<string>(generateHash());

  const processFile = async (file: File) => {
    try {
      const files = await processSandboxZipFile(file);
      setFilesSandbox(files);
    } catch (err: unknown) {
      log(err as Error, LogLevel.Error, LOG_PREFIX);
    }
  };

  const handleChangeFile = (files: File[] | null): void => {
    setFile(files && files.length > 0 ? files[0] : null);
  };

  const handleProccessFile = (): void => {
    if (file) {
      processFile(file);
    }
  };

  const handleReupload = (): void => {
    setFile(null);
    setFilesSandbox(null);
  };

  const handleGenerateHash = () => {
    setHash(generateHash());
    if (sandboxRef.current && filesSandbox) {
      sandboxRef.current.reloadIframe();
    }
  };

  useEffect(() => {
    setCurrentStep(MintGenerativeStep.UPLOAD_PROJECT);
  });

  const fileList = useMemo<string[] | null>(
    () => (filesSandbox ? Object.keys(filesSandbox) : null),
    [filesSandbox]
  );

  const renderUploadSuccess = () => {
    return (
      <div>
        <div className={styles.uploadStatus}>
          <Image src={CheckIcon} alt={'check icon'} />
          Upload success
        </div>
        <div className={styles.uploadFiles}>
          <div className="">
            {file?.name} ({prettyPrintBytes(file?.size || 0)})
          </div>
          <ul>
            {fileList?.map((fileName: string) => (
              <li key={fileName}>{fileName}</li>
            ))}
          </ul>
          <Button onClick={handleReupload}>Update zip file</Button>
        </div>
        <div className="mb4">
          <div>
            <p>hash: {hash}</p>
          </div>
          <Button onClick={handleGenerateHash}>Generate new hash</Button>
        </div>
        <div className={styles.checkboxes}>
          <Checkbox
            id="hash"
            label="I want to keep this hash for the preview of project"
          />
          <Checkbox id="confirm" label="My Generative Token works properly" />
        </div>
        <Button
          className="wFull"
          onClick={() => router.push('/mint-generative/product-detail')}
        >
          Next Step
        </Button>
      </div>
    );
  };

  return (
    <div
      className={cs(styles.wrapper, !!filesSandbox && styles.wrapperUploaded)}
    >
      {filesSandbox ? (
        renderUploadSuccess()
      ) : (
        <div className="wrapper">
          <div className={styles.description}>
            <p>
              This is a space in which you can drop a .zip of your project and
              see how it would behave when it will be minted on Generative. If
              your artwork does not behave properly in the setup thumbnail image
              are, it will not work after being minted. If you are new to the
              platform please read our{' '}
              <Link href="#">Guide to build a Generative Token.</Link>
            </p>
            <br />
            <p>
              Please make sure that your project follows our{' '}
              <Link href="#">Code of Conduct</Link>.
            </p>
          </div>
          <div className={styles.uploadWrapper}>
            <DropFile
              acceptedFileType={{
                'application/zip': ['.zip'],
                'application/x-zip-compressed': ['.zip'],
              }}
              onChange={handleChangeFile}
              files={file ? [file] : null}
              className={styles.dropFile}
            />
            <Button className={styles.uploadBtn} onClick={handleProccessFile}>
              Upload Project
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Step1;
