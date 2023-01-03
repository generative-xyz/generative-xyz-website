import React, { CSSProperties, ReactNode } from 'react';
import styles from './styles.module.scss';
import Image from 'next/image';
import SvgInset from '@components/SvgInset';
import { CDN_URL } from '@constants/config';
import { convertIpfsToHttp } from '@utils/image';

type Props = {
  imgSrc: string;
  leftContent?: string | ReactNode;
  width?: number;
  height?: number;
  wrapperStyle?: CSSProperties;
  onClick?: () => void;
};

const AvatarInfo = ({
  imgSrc,
  leftContent,
  width = 56,
  height = 56,
  wrapperStyle,
  onClick,
}: Props) => {
  return (
    <div className="horizontalStack" style={wrapperStyle} onClick={onClick}>
      <div className={styles.avatar}>
        {imgSrc ? (
          <Image
            src={convertIpfsToHttp(imgSrc)}
            alt="user avatar"
            width={width}
            height={height}
          />
        ) : (
          <div className={styles.defaultAvatar} style={{ width, height }}>
            <SvgInset
              svgUrl={`${CDN_URL}/images/default-avatar.svg`}
            ></SvgInset>
          </div>
        )}
      </div>
      {leftContent && <div className={styles.address}>{leftContent}</div>}
    </div>
  );
};

export default AvatarInfo;
