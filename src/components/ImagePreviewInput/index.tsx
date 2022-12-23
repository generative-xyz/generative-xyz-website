import s from './styles.module.scss';
import React, { ChangeEvent, useEffect, useState } from 'react';
import cs from 'classnames';
import Image from 'next/image';

interface IProps {
  file: File | null;
  onFileChange: (f: File | null) => void;
  className?: string;
  placeHolderHtml?: JSX.Element;
  previewHtml?: JSX.Element;
}

const ImagePreviewInput: React.FC<IProps> = ({
  file,
  onFileChange,
  className,
  placeHolderHtml,
  previewHtml,
}: IProps): React.ReactElement => {
  const [preview, setPreview] = useState<string | null>(null);

  useEffect(() => {
    if (!file) {
      setPreview(null);
      return;
    }

    const objectUrl = URL.createObjectURL(file);
    setPreview(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [file]);

  const onSelectFile = (evt: ChangeEvent<HTMLInputElement>) => {
    if (!evt.target.files || evt.target.files.length === 0) {
      onFileChange(null);
      return;
    }

    onFileChange(evt.target.files[0]);
  };

  return (
    <div className={cs(s.imagePreviewInput, className)}>
      <label htmlFor="fileInput">
        <>
          {preview ? (
            <>
              {previewHtml ? (
                previewHtml
              ) : (
                <div className={s.previewWrapper}>
                  <Image
                    className={s.previewImage}
                    fill
                    src={preview}
                    alt="preview image"
                  />
                </div>
              )}
            </>
          ) : (
            <>
              {placeHolderHtml ? (
                placeHolderHtml
              ) : (
                <div className={s.placeHolder}>
                  <span>Upload an image</span>
                </div>
              )}
            </>
          )}
        </>
      </label>
      <input
        id="fileInput"
        className={s.fileInput}
        type="file"
        onChange={onSelectFile}
      />
    </div>
  );
};

export default ImagePreviewInput;
