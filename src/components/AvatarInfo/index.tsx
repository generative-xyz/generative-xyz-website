import React, { CSSProperties, ReactNode } from 'react';
import styles from './styles.module.scss';
import Image from 'next/image';

type Props = {
  imgSrc: string;
  address?: string | ReactNode;
  width?: number;
  height?: number;
  wrapperStyle?: CSSProperties;
};

const AvatarInfo = ({
  imgSrc,
  address,
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
          <div className={styles.defaultAvatar} style={{ width, height }}></div>
        )}
      </div>
      {address && <div className={styles.address}>{address}</div>}
    </div>
  );
};

export default AvatarInfo;
