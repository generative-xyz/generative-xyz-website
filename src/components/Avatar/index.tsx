import SvgInset from '@components/SvgInset';
import { CDN_URL } from '@constants/config';
import Image from 'next/image';
import React from 'react';
import styles from './styles.module.scss';
import { v4 } from 'uuid';
import { convertIpfsToHttp } from '@utils/image';

type Props = {
  imgSrcs: string | string[];
  width?: number;
  height?: number;
  fill?: boolean;
};

const Avatar = ({ imgSrcs, width = 48, height = 48, fill = false }: Props) => {
  const SingleAvatar = ({ src }: { src: string }) => {
    return (
      <div
        style={
          fill
            ? {
                width: '100%',
                height: '100%',
                position: 'relative',
              }
            : {
                width,
                height,
              }
        }
        className={styles.avatarWrapper}
      >
        {src ? (
          fill ? (
            <Image src={convertIpfsToHttp(src)} alt="user avatar" fill />
          ) : (
            <Image
              src={convertIpfsToHttp(src)}
              alt="user avatar"
              width={width}
              height={height}
            />
          )
        ) : (
          <div className={styles.defaultAvatar}>
            <SvgInset
              size={width}
              svgUrl={`${CDN_URL}/images/default-avatar.svg`}
            ></SvgInset>
          </div>
        )}
      </div>
    );
  };

  if (typeof imgSrcs === 'string') return <SingleAvatar src={imgSrcs} />;

  if (imgSrcs?.length > 0 && typeof imgSrcs === 'object') {
    return (
      <div className={styles.avatarStack}>
        {imgSrcs.map(src => (
          <SingleAvatar src={src} key={`avatar-${v4()}`} />
        ))}
      </div>
    );
  }

  return null;
};

export default Avatar;
