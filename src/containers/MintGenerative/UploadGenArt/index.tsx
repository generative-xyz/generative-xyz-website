import s from './styles.module.scss';
import Button from '@components/Button';
import Checkbox from '@components/Checkbox';
import DropFile from '@containers/MintGenerative/DropFile';
import Link from '@components/Link';
import { MintGenerativeContext } from '@contexts/mint-generative-context';
import { LogLevel } from '@enums/log-level';
import { ISandboxRef } from '@interfaces/sandbox';
import { generateHash } from '@utils/generate-data';
import log from '@utils/logger';
import { processSandboxZipFile, readSandboxFileContent } from '@utils/sandbox';
import { prettyPrintBytes } from '@utils/units';
import cs from 'classnames';
import Image from 'next/image';
import { useRouter } from 'next/router';
import CheckIcon from 'public/assets/icons/check-circle.svg';
import { ReactElement, useContext, useMemo, useRef, useState } from 'react';
import { EXTERNAL_LINK } from '@constants/external-link';
import SvgInset from '@components/SvgInset';
import { CDN_URL } from '@constants/config';

const LOG_PREFIX = 'UploadGenArt';

const UploadGenArt: React.FC = (): ReactElement => {
  const { filesSandbox, setFilesSandbox, zipFile, setZipFile, hash, setHash } =
    useContext(MintGenerativeContext);
  const router = useRouter();
  const [isConfirm, setIsConfirm] = useState(false);
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

  const fileList = useMemo<string[] | null>(
    () => (filesSandbox ? Object.keys(filesSandbox) : null),
    [filesSandbox]
  );

  const renderUploadSuccess = () => {
    return (
      <div>
        <div className={s.uploadStatus}>
          <Image src={CheckIcon} alt={'check icon'} />
          Upload success
        </div>
        <div className={s.uploadFiles}>
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
        <div className="mb-4">
          <div>
            <p>hash: {hash}</p>
          </div>
          <Button onClick={handleGenerateHash}>Generate new hash</Button>
        </div>
        <div className={s.checkboxes}>
          <Checkbox
            id="confirm"
            label="My Generative Token works properly"
            onClick={() => setIsConfirm(!isConfirm)}
          />
        </div>
        <Button
          className="wFull"
          disabled={!isConfirm}
          onClick={() => router.push('/mint-generative/product-detail')}
        >
          Next Step
        </Button>
      </div>
    );
  };

  return (
    <>
      <div className={cs(s.wrapper, !!filesSandbox && s.wrapperUploaded)}>
        {filesSandbox ? (
          renderUploadSuccess()
        ) : (
          <div className="wrapper">
            <div className={s.description}>
              <p>
                This is a space in which you can drop a .zip of your project and
                see how it would behave when it will be minted on Generative. If
                your artwork does not behave properly in the setup thumbnail
                image are, it will not work after being minted. If you are new
                to the platform please read our{' '}
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
            <div className={s.uploadWrapper}>
              <DropFile
                acceptedFileType={{
                  'application/zip': ['.zip'],
                  'application/x-zip-compressed': ['.zip'],
                }}
                onChange={handleChangeFile}
                files={zipFile ? [zipFile] : null}
                className={s.dropFile}
              />
              <Button className={s.uploadBtn} onClick={handleProccessFile}>
                Upload Project
              </Button>
            </div>
          </div>
        )}
      </div>

      <section className={s.uploadGenArt}>
        <div className={s.wrapper}>
          <h3 className={s.sectionTitle}>
            Upload Genart
            <SvgInset
              size={18}
              className={s.infoIcon}
              url={`${CDN_URL}/icons/ic-info-circle-18x18.svg`}
            ></SvgInset>
          </h3>
          <div className={s.dropZoneWrapper}>
            <DropFile
              className={s.dropZoneContainer}
              acceptedFileType={{
                'application/zip': ['.zip'],
                'application/x-zip-compressed': ['.zip'],
              }}
              onChange={handleChangeFile}
              files={zipFile ? [zipFile] : null}
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default UploadGenArt;
