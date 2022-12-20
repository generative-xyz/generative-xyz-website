import React, { CSSProperties } from 'react';
import styles from './styles.module.scss';
import Image from 'next/image';

type Props = {
  imgSrc: string;
  address: string;
  width?: number;
  height?: number;
  wrapperStyle?: CSSProperties;
};

const AvatarInfo = ({
  imgSrc,
  address = '0xDa08dD1c849d8DEC0Da09ec541506CefaD6D8F5c',
  width = 56,
  height = 56,
  wrapperStyle,
}: Props) => {
  return (
    <div className="horizontalStack" style={wrapperStyle}>
      <div className={styles.avatar}>
        {imgSrc ? (
          <Image src={imgSrc} alt="user avatar" width={width} height={height} />
        ) : (
          <div className={styles.defaultAvatar}></div>
        )}
      </div>
      <div className={styles.address}>{address}</div>
    </div>
  );
};

export default AvatarInfo;
