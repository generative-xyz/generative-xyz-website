import Button from '@components/Button';
import Checkbox from '@components/Checkbox';
import DropFile from '@components/Input/DropFile';
import Link from '@components/Link';
import {
  MintGenerativeContext,
  TMintGenerativeContext,
} from '@contexts/mint-generative-context';
import { LogLevel } from '@enums/log-level';
import { MintGenerativeStep } from '@enums/mint-generative';
import { ISandboxRef } from '@interfaces/sandbox';
import { generateHash } from '@utils/generate-data';
import log from '@utils/logger';
import { processSandboxZipFile, readSandboxFileContent } from '@utils/sandbox';
import { prettyPrintBytes } from '@utils/units';
import cs from 'classnames';
import Image from 'next/image';
import { useRouter } from 'next/router';
import CheckIcon from 'public/assets/icons/check-circle.svg';
import { useContext, useEffect, useMemo, useRef, useState } from 'react';
import styles from './styles.module.scss';
import { EXTERNAL_LINK } from '@constants/external-link';

const LOG_PREFIX = 'MintGenerativeStep1';

const Step1 = () => {
  const {
    filesSandbox,
    setCurrentStep,
    setFilesSandbox,
    zipFile,
    setZipFile,
    hash,
    setHash,
  } = useContext(MintGenerativeContext) as TMintGenerativeContext;
  const router = useRouter();
  const [keepHash, setKeepHash] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const sandboxRef = useRef<ISandboxRef>(null);

  const processFile = async (file: File) => {
    try {
      const files = await processSandboxZipFile(file);
      readSandboxFileContent(files);
      setFilesSandbox(files);
    } catch (err: unknown) {
      log(err as Error, LogLevel.Error, LOG_PREFIX);
    }
  };

  const handleChangeFile = (files: File[] | null): void => {
    setZipFile(files && files.length > 0 ? files[0] : null);
  };

  const handleProccessFile = (): void => {
    if (zipFile) {
      processFile(zipFile);
    }
  };

  const handleReupload = (): void => {
    setZipFile(null);
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
            {zipFile?.name} ({prettyPrintBytes(zipFile?.size || 0)})
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
            onClick={() => setKeepHash(!keepHash)}
          />
          <Checkbox
            id="confirm"
            label="My Generative Token works properly"
            onClick={() => setConfirm(!confirm)}
          />
        </div>
        <Button
          className="wFull"
          disabled={!keepHash || !confirm}
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
              <Link href={EXTERNAL_LINK.GUIDE} target="_blank" rel="noopener">
                Guide to build a Generative Token.
              </Link>
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
              files={zipFile ? [zipFile] : null}
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
