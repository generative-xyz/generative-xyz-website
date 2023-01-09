import { MintGenerativeContext } from '@contexts/mint-generative-context';
import { prettyPrintBytes } from '@utils/units';
import React, { useContext } from 'react';
import { useDropzone } from 'react-dropzone';
import Image from 'next/image';
import s from './styles.module.scss';
import { CDN_URL } from '@constants/config';
import Button from '@components/ButtonIcon';

const UploadThumbnailButton: React.FC = () => {
  const { thumbnailFile, setThumbnailFile } = useContext(MintGenerativeContext);

  const onDrop = (acceptedFiles: Array<File>) => {
    if (acceptedFiles.length > 0) {
      setThumbnailFile(acceptedFiles[0]);
    } else {
      setThumbnailFile(null);
    }
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      <Button
        variants="secondary"
        sizes="small"
        className={s.uploadThumbnailBtn}
      >
        <Image
          alt="upload icon"
          height={16}
          width={16}
          src={`${CDN_URL}/icons/ic-upload-image-16x16.svg`}
        ></Image>
        <span className={s.fileName}>
          {thumbnailFile
            ? `${thumbnailFile.name} (${prettyPrintBytes(thumbnailFile.size)})`
            : 'Upload preview image'}
        </span>
      </Button>
    </div>
  );
};

export default UploadThumbnailButton;
