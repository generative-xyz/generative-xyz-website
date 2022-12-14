import s from './styles.module.scss';
import cs from 'classnames';
import { ReactNode, useCallback, useMemo, useState } from 'react';
import { Accept, ErrorCode, useDropzone } from 'react-dropzone';
import { prettyPrintBytes } from '@utils/units';

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
  defaultInnerHmtl?: ReactNode;
  draggingInnerHtml?: ReactNode;
  className?: string;
  onClick?: () => void;
  maxSizeMb?: number;
}

const DropFile: React.FC<IProps> = ({
  defaultInnerHmtl = (
    <p>Drag &apos;n&apos; drop some files here, or click to select files</p>
  ),
  draggingInnerHtml = <p>Drop the files here ...</p>,
  acceptedFileType,
  files,
  onChange,
  onClick,
  className,
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  maxSizeMb = parseInt(process.env.NEXT_PUBLIC_MAX_FILESIZE!),
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
        [s.drag]: isDragActive,
        [s.error]: !!error,
      })}
      contentEditable={false}
    >
      <input {...getInputProps()} />
      {files ? (
        <div>
          {files.map(f => `${f.name} (${prettyPrintBytes(f.size)})`).join(', ')}
        </div>
      ) : (
        <div>
          {error ? (
            <>
              {fileRejections?.length > 0
                ? fileRejections.map(({ file, errors }) => (
                    <div key={file.name}>
                      {file.name}:{' '}
                      {errors
                        .map(e => getPrettyError(e.code as ErrorCode))
                        .join(',')}
                      {'.'}
                    </div>
                  ))
                : error}
            </>
          ) : isDragActive ? (
            draggingInnerHtml
          ) : (
            defaultInnerHmtl
          )}
        </div>
      )}
    </div>
  );
};

export default DropFile;
