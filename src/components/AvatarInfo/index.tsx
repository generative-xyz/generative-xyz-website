import Avatar from '@components/Avatar';
import { CSSProperties, ReactNode } from 'react';
import styles from './styles.module.scss';

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
        <Avatar imgSrcs={imgSrc} width={width} height={height} />
      </div>
      {leftContent && <div className={styles.address}>{leftContent}</div>}
    </div>
  );
};

export default AvatarInfo;
