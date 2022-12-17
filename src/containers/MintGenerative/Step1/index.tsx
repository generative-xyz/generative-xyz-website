import Button from '@components/Button';
import Checkbox from '@components/Checkbox';
import DropFile from '@components/Input/DropFile';
import Link from '@components/Link';
import ClientOnly from '@components/Utils/ClientOnly';
import SandboxPreview from '@containers/Sandbox/SandboxPreview';
import {
  MintGenerativeContext,
  MintGenerativeContextTypes,
} from '@contexts/mint-generative-context';
import { LogLevel } from '@enums/log-level';
import { MintGenerativeStep } from '@enums/mint-generative';
import log from '@utils/logger';
import { processSandboxZipFile } from '@utils/sandbox';
import { prettyPrintBytes } from '@utils/units';
import cs from 'classnames';
import Image from 'next/image';
import { useRouter } from 'next/router';
import CheckIcon from 'public/assets/icons/check-circle.svg';
import PlayIcon from 'public/assets/icons/play-icon.svg';
import RefreshIcon from 'public/assets/icons/refresh-icon.svg';
import { useContext, useEffect, useMemo, useState } from 'react';
import styles from './styles.module.scss';

// type Props = {};

const LOG_PREFIX = 'MintGenerativeStep1';

const Step1 = () => {
  const { filesSandbox, setCurrentStep, setFilesSandbox } = useContext(
    MintGenerativeContext
  ) as MintGenerativeContextTypes;

  const router = useRouter();

  const [file, setFile] = useState<File | null>(null);
  // const [filesSandbox, setFilesSandbox] = useState<SandboxFiles | null>(null);

  // const [uploadSuccess, setUploadSuccess] = useState(false);

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

  // TODO: Handle play button action
  const handleGenerate = (): void => {
    return;
  };

  // TODO: Handle refresh button action
  const handleRefresh = (): void => {
    return;
  };

  useEffect(() => {
    setCurrentStep(MintGenerativeStep.UPLOAD_PROJECT);
  }, [setCurrentStep]);

  const fileList = useMemo<string[] | null>(
    () => (filesSandbox ? Object.keys(filesSandbox) : null),
    [filesSandbox]
  );

  if (filesSandbox) {
    return (
      <div className={styles.wrapper}>
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
        <div className={styles.previewContainer}>
          <ClientOnly>
            <SandboxPreview sandboxFiles={filesSandbox} />
          </ClientOnly>
          <div className={cs(styles.actionButtons, 'horizontalStack')}>
            <Image src={PlayIcon} alt={'check icon'} onClick={handleGenerate} />
            <Image
              src={RefreshIcon}
              alt={'check icon'}
              onClick={handleRefresh}
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className={styles.description}>
        <p>
          This is a space in which you can drop a .zip of your project and see
          how it would behave when it will be minted on Generative. If your
          artwork does not behave properly in the setup thumbnail image are, it
          will not work after being minted. If you are new to the platform
          please read our{' '}
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
    </>
  );
};

export default Step1;
