import s from './styles.module.scss';
import cs from 'classnames';
import { useCallback, useMemo, useState } from 'react';
import { Accept, ErrorCode, useDropzone } from 'react-dropzone';
import { prettyPrintBytes } from '@utils/units';
import { APP_MAX_FILESIZE, CDN_URL } from '@constants/config';
import SvgInset from '@components/SvgInset';

const getPrettyError = (code: ErrorCode): string => {
  switch (code) {
    case ErrorCode.FileInvalidType:
      return 'Invalid format';
    case ErrorCode.FileTooLarge:
      return 'File is too large';
    case ErrorCode.FileTooSmall:
      return 'File is too small';
    case ErrorCode.TooManyFiles:
      return 'There are too many files';
    default:
      return 'Unknown error';
  }
};

export interface IProps {
  acceptedFileType?: Accept;
  files?: File[] | null;
  onChange: (files: File[] | null) => void;
  className?: string;
  onClick?: () => void;
  maxSizeMb?: number;
}

const DropFile: React.FC<IProps> = ({
  acceptedFileType,
  files,
  onChange,
  onClick,
  className,
  maxSizeMb = parseInt(APP_MAX_FILESIZE),
}: IProps) => {
  const [error, setError] = useState<string | null>(null);

  const onDrop = useCallback(
    (acceptedFiles: Array<File>) => {
      if (acceptedFiles.length > 0) {
        onChange(acceptedFiles);
        setError(null);
      } else {
        onChange(null);
        setError('Format is not supported');
      }
    },
    [onChange]
  );

  const { getRootProps, getInputProps, isDragActive, fileRejections } =
    useDropzone({
      onDrop,
      accept: acceptedFileType,
      maxFiles: 1,
      multiple: false,
      maxSize: maxSizeMb * 1024 * 1024,
    });

  const rootProps = useMemo(() => {
    const props = getRootProps();
    if (onClick) {
      props.onClick = onClick;
    }
    return props;
  }, [getRootProps, onClick]);

  return (
    <div
      {...rootProps}
      className={cs(s.dropFile, className, {
        [s.dropFile__drag]: isDragActive,
        [s.dropFile__error]: !!error,
      })}
      contentEditable={false}
    >
      <input {...getInputProps()} />
      <div>
        <div className={s.dropZone}>
          <SvgInset
            size={100}
            className={s.dropZoneThumbnail}
            url={`${CDN_URL}/images/docs.svg`}
          ></SvgInset>
          {files ? (
            <p className={s.dropZoneDescription}>
              {files
                .map(f => `${f.name} (${prettyPrintBytes(f.size)})`)
                .join(', ')}
            </p>
          ) : (
            <>
              {error ? (
                <>
                  {fileRejections?.length > 0 ? (
                    fileRejections.map(({ file, errors }) => (
                      <p
                        key={file.name}
                        className={cs(s.dropZoneDescription, s.errorText)}
                      >
                        {file.name}:{' '}
                        {errors
                          .map(e => getPrettyError(e.code as ErrorCode))
                          .join(',')}
                        {'.'}
                      </p>
                    ))
                  ) : (
                    <p className={cs(s.dropZoneDescription, s.errorText)}>
                      {error}
                    </p>
                  )}
                </>
              ) : (
                <p className={s.dropZoneDescription}>
                  {isDragActive
                    ? 'Dragging'
                    : "Drag 'n' drop your ZIP file here."}
                </p>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default DropFile;
