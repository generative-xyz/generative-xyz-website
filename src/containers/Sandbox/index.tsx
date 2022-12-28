import s from './styles.module.scss';
import React, { useMemo, useRef, useState } from 'react';
import {
  ISandboxRef,
  RawTokenAttributes,
  SandboxFiles,
} from '@interfaces/sandbox';
import { processSandboxZipFile } from '@utils/sandbox';
import log from '@utils/logger';
import { LogLevel } from '@enums/log-level';
import { generateHash } from '@utils/generate-data';
import DropFile from '@components/Input/DropFile';
import Button from '@components/Button';
import SandboxPreview from '@containers/Sandbox/SandboxPreview';

const LOG_PREFIX = 'Sandbox';

const Sandbox: React.FC = (): React.ReactElement => {
  const sandboxRef = useRef<ISandboxRef>(null);
  const [file, setFile] = useState<File | null>(null);
  const [filesSandbox, setFilesSandbox] = useState<SandboxFiles | null>(null);
  const [hash, setHash] = useState<string>(generateHash());
  const [attributes, setAttributes] = useState<RawTokenAttributes | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleIframeLoaded = (): void => {
    if (sandboxRef.current) {
      const iframe = sandboxRef.current.getHtmlIframe();
      if (iframe) {
        // @ts-ignore: Allow read iframe's window object
        if (iframe.contentWindow?.$generativeTraits) {
          // @ts-ignore: Allow read iframe's window object
          setAttributes(iframe.contentWindow?.$generativeTraits);
        } else {
          setAttributes(null);
        }
      }
    }
  };

  const handleGenerateHash = () => {
    setHash(generateHash());
    if (sandboxRef.current && filesSandbox) {
      sandboxRef.current.reloadIframe();
    }
  };

  const processFile = async (newFile: File) => {
    try {
      setError(null);
      const files = await processSandboxZipFile(newFile);
      setFilesSandbox(files);
    } catch (err: unknown) {
      log(err as Error, LogLevel.Error, LOG_PREFIX);
      setError((err as Error).message);
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

  const fileList = useMemo<string[] | null>(
    () => (filesSandbox ? Object.keys(filesSandbox) : null),
    [filesSandbox]
  );

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
        <div className={s.hashContainer}>
          <div>
            <p>hash: {hash}</p>
          </div>
          <Button onClick={handleGenerateHash} borderRounded>
            Generate new hash
          </Button>
        </div>
        <Button onClick={handleProccessFile} borderRounded>
          Test
        </Button>
      </div>
      {error && <div className={s.errorContainer}>{error}</div>}
      {attributes && (
        <div className={s.attributesContainer}>
          <p>Attributes:</p>
          {Object.entries(attributes).map(([key, value]) => (
            <p key={key}>
              key: {key}, val: {`${value}`}
            </p>
          ))}
        </div>
      )}
      <div className={s.previewContainer}>
        <SandboxPreview
          ref={sandboxRef}
          hash={hash}
          sandboxFiles={filesSandbox}
          onLoaded={handleIframeLoaded}
        />
      </div>
    </section>
  );
};

export default Sandbox;
