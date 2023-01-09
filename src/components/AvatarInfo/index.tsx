import Avatar from '@components/Avatar';
import { convertIpfsToHttp } from '@utils/image';
import { CSSProperties, ReactNode } from 'react';
import styles from './styles.module.scss';

type Props = {
  imgSrc: string;
  leftContent?: string | ReactNode;
  width?: number;
  height?: number;
  wrapperStyle?: CSSProperties;
  onClick?: () => void;
  theme?: 'light' | 'dark';
};

const AvatarInfo = ({
  imgSrc,
  leftContent,
  width = 56,
  height = 56,
  wrapperStyle,
  onClick,
  theme = 'light',
}: Props) => {
  return (
    <div
      className={`horizontalStack ${styles[theme]}`}
      style={wrapperStyle}
      onClick={onClick}
    >
      <div className={`${styles.avatar}`}>
        <Avatar
          imgSrcs={convertIpfsToHttp(imgSrc)}
          width={width}
          height={height}
        />
      </div>
      {leftContent && <div className={styles.address}>{leftContent}</div>}
    </div>
  );
};

export default AvatarInfo;
