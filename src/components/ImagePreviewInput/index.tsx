import cs from 'classnames';
import Image from 'next/image';
import React, {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from 'react';
import s from './styles.module.scss';
import Skeleton from '@components/Skeleton';

interface IProps {
  file: any;
  onFileChange: Dispatch<SetStateAction<File | null | undefined>>;
  className?: string;
  placeHolderHtml?: JSX.Element;
  previewHtml?: JSX.Element;
}

const ImagePreviewInput: React.FC<IProps> = ({
  file,
  className,
  placeHolderHtml,
  onFileChange,
  previewHtml,
}: IProps): React.ReactElement => {
  const [preview, setPreview] = useState<string | null>(null);
  const [currentImage, setCurrentImage] = useState<JSX.Element | null>(
    previewHtml || null
  );

  useEffect(() => {
    if (!file) {
      setPreview(null);
      return;
    }

    setPreview(file);

    return () => URL.revokeObjectURL(file);
  }, [file]);

  const onSelectFile = (evt: ChangeEvent<HTMLInputElement>) => {
    if (!evt.target.files || evt.target.files.length === 0) {
      setCurrentImage(previewHtml || null);
      return;
    }
    const newFile = evt.target.files[0];
    onFileChange(newFile);
    setPreview(URL.createObjectURL(newFile));
    setCurrentImage(null);
  };

  return (
    <div className={cs(s.imagePreviewInput, className)}>
      <label htmlFor="fileInput">
        <>
          {preview ? (
            <>
              {currentImage ? (
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
              {placeHolderHtml ? placeHolderHtml : <Skeleton fill></Skeleton>}
            </>
          )}
        </>
      </label>
      <input
        id="fileInput"
        className={s.fileInput}
        type="file"
        accept="image/*"
        onChange={onSelectFile}
      />
      {/* <ButtonIcon
        variants="secondary"
        className={s.change_btn}
        onClick={e => e.stopPropagation()}
      >
        Changes
      </ButtonIcon> */}
    </div>
  );
};

export default ImagePreviewInput;
