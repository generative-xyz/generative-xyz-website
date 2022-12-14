import s from './styles.module.scss';
import React, { useMemo, useState } from 'react';
import { SandboxFiles } from '@interfaces/sandbox';
import { processSandboxZipFile } from '@utils/sandbox';
import log from '@utils/logger';
import { LogLevel } from '@enums/log-level';
import DropFile from '@components/Input/DropFile';
import Button from '@components/Button';
import SandboxPreview from '@containers/Sandbox/SandboxPreview';

const LOG_PREFIX = 'Sandbox';

const Sandbox: React.FC = (): React.ReactElement => {
  const [file, setFile] = useState<File | null>(null);
  const [filesSandbox, setFilesSandbox] = useState<SandboxFiles | null>(null);
  // const [error, setError] = useState<string | null>(null);

  const fileList = useMemo<string[] | null>(
    () => (filesSandbox ? Object.keys(filesSandbox) : null),
    [filesSandbox]
  );

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

  return (
    <section className={s.sandbox}>
      <div className={s.actionContainer}>
        <ul>
          {fileList?.map((fileName: string) => (
            <li key={fileName}>{fileName}</li>
          ))}
        </ul>
        <DropFile
          acceptedFileType={{
            'application/zip': ['.zip'],
            'application/x-zip-compressed': ['.zip'],
          }}
          onChange={handleChangeFile}
          files={file ? [file] : null}
        />
        <Button onClick={handleProccessFile}>Test</Button>
      </div>
      <div className={s.previewContainer}>
        <SandboxPreview sandboxFiles={filesSandbox} />
      </div>
    </section>
  );
};

export default Sandbox;
