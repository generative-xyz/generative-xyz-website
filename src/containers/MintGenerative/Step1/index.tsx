import Button from '@components/Button';
import DropFile from '@components/Input/DropFile';
import Link from '@components/Link';
import { LogLevel } from '@enums/log-level';
import { SandboxFiles } from '@interfaces/sandbox';
import { processSandboxZipFile } from '@utils/sandbox';
import React, { useState } from 'react';
import styles from './styles.module.scss';
import log from '@utils/logger';
import Image from 'next/image';
import CheckIcon from 'public/assets/icons/check-circle.svg';
import { prettyPrintBytes } from '@utils/units';

// type Props = {};

const LOG_PREFIX = 'MintGenerativeStep1';

const Step1 = () => {
  const [file, setFile] = useState<File | null>(null);
  // console.log('🚀 ~ Step1 ~ file', file);
  const [filesSandbox, setFilesSandbox] = useState<SandboxFiles | null>(null);
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
