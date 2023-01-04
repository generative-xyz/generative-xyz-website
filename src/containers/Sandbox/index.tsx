import s from './styles.module.scss';
import Button from '@components/ButtonIcon';
import DropFile from '@containers/MintGenerative/DropFile';
import Link from '@components/Link';
import { LogLevel } from '@enums/log-level';
import log from '@utils/logger';
import { processSandboxZipFile, readSandboxFileContent } from '@utils/sandbox';
import { prettyPrintBytes } from '@utils/units';
import { ReactElement, useMemo, useState } from 'react';
import { EXTERNAL_LINK } from '@constants/external-link';
import SvgInset from '@components/SvgInset';
import { CDN_URL } from '@constants/config';
import Image from 'next/image';
import { SandboxFileError } from '@enums/sandbox';
import { SandboxFiles } from '@interfaces/sandbox';
import { toast } from 'react-hot-toast';
import ProjectPreview from '@containers/Sandbox/ProjectPreview';

const LOG_PREFIX = 'UploadGenArt';

const Sandbox: React.FC = (): ReactElement => {
  const [filesSandbox, setFilesSandbox] = useState<SandboxFiles | null>(null);
  const [zipFile, setZipFile] = useState<File | null>(null);

  const processFile = async (file: File) => {
    try {
      const files = await processSandboxZipFile(file);
      readSandboxFileContent(files);
      setFilesSandbox(files);
    } catch (err: unknown) {
      log(err as Error, LogLevel.Error, LOG_PREFIX);
      let errorMessage =
        'There is a problem with your zip file. Please check and try again. ';
      if ((err as Error).message === SandboxFileError.NO_INDEX_HTML) {
        errorMessage += 'index.html is not found.';
      }
      if (
        (err as Error).message === SandboxFileError.NO_SNIPPET_CONTRACT ||
        (err as Error).message === SandboxFileError.NO_SNIPPET_RANDOM
      ) {
        errorMessage += 'Snippet code is not found.';
      }
      if ((err as Error).message === SandboxFileError.WRONG_FORMAT) {
        errorMessage += 'Invalid file format.';
      }
      toast.error(errorMessage);
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

  const fileList = useMemo<string[] | null>(
    () => (filesSandbox ? Object.keys(filesSandbox) : null),
    [filesSandbox]
  );

  const renderUploadSuccess = () => {
    return (
      <div className={s.mainWrapper}>
        <div className={s.previewWrapper}>
          <ProjectPreview filesSandbox={filesSandbox} />
        </div>
        <div className={s.uploadSuccessWrapper}>
          <div className={s.uploadFiles}>
            <div className={s.zipFileInfo}>
              <Image
                className={s.folderIcon}
                alt="folder icon"
                width={28}
                height={28}
                src={`${CDN_URL}/icons/ic-folder-code-28x28.svg`}
              ></Image>
              <span className={s.zipFileName}>
                {zipFile?.name} ({prettyPrintBytes(zipFile?.size || 0)})
              </span>
            </div>
            <ul className={s.zipFileList}>
              {fileList?.map((fileName: string) => (
                <li key={fileName} className={s.fileItem}>
                  <Image
                    className={s.codeIcon}
                    alt="folder icon"
                    width={18}
                    height={18}
                    src={`${CDN_URL}/icons/ic-code-18x18.svg`}
                  ></Image>
                  <span className={s.fileName}>{fileName}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className={s.actionWrapper}>
            <Button sizes="small" variants="outline" onClick={handleReupload}>
              Update zip file
            </Button>
          </div>
        </div>
      </div>
    );
  };

  const renderUpload = useMemo(
    (): JSX.Element => (
      <>
        <div className={s.uploadWrapper}>
          <h3 className={s.sectionTitle}>
            Upload Genart
            <SvgInset
              size={18}
              className={s.infoIcon}
              svgUrl={`${CDN_URL}/icons/ic-info-circle-18x18.svg`}
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
          <Button
            disabled={!zipFile}
            className={s.uploadBtn}
            onClick={handleProccessFile}
          >
            Upload Project
          </Button>
        </div>
        <div className={s.disclaimerWrapper}>
          <p className={s.disclaimer}>
            This is a space in which you can drop a .zip of your project and see
            how it would behave when it will be minted on Generative. If your
            artwork does not behave properly in the setup thumbnail image are,
            it will not work after being minted. If you are new to the platform
            please read our&nbsp;
            <Link
              className={s.link}
              href={EXTERNAL_LINK.GUIDE}
              target="_blank"
              rel="noopener"
            >
              Guide to build a Generative Token.
            </Link>
          </p>
          <p className={s.disclaimer}>
            Please make sure that your project follows our&nbsp;
            <Link
              className={s.link}
              href={EXTERNAL_LINK.GUIDE}
              target="_blank"
              rel="noopener"
            >
              Code of Conduct.
            </Link>
          </p>
        </div>
      </>
    ),
    [zipFile]
  );

  return (
    <section className={s.uploadGenArt}>
      {filesSandbox ? renderUploadSuccess() : renderUpload}
    </section>
  );
};

export default Sandbox;
