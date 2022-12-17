import ClientOnly from '@components/Utils/ClientOnly';
import SandboxPreview from '@containers/Sandbox/SandboxPreview';
import {
  MintGenerativeContext,
  MintGenerativeContextTypes,
} from '@contexts/mint-generative-context';
import Image from 'next/image';
import React, { useContext } from 'react';
import styles from './styles.module.scss';
import PlayIcon from 'public/assets/icons/play-icon.svg';
import AvatarInfo from '@components/AvatarInfo';
import cx from 'classnames';

const PreviewInfo = () => {
  const { filesSandbox } = useContext(
    MintGenerativeContext
  ) as MintGenerativeContextTypes;

  return (
    <div className={styles.wrapper}>
      <ClientOnly>
        <SandboxPreview sandboxFiles={filesSandbox} />
      </ClientOnly>
      <div className="horizontalStack justifyBetween">
        <div className="horizontalStack">
          Run
          <Image src={PlayIcon} alt={'check icon'} />
        </div>
        <div className="horizontalStack">
          Upload preview image
          <Image src={PlayIcon} alt={'check icon'} />
        </div>
      </div>
      <p className={styles.pieceName}>[Piece name]</p>
      <AvatarInfo
        imgSrc=""
        address="0xDa08dD1c849d8DEC0Da09ec541506CefaD6D8F5c"
        wrapperStyle={{ marginBottom: '16px' }}
      />
      <div className={cx('horizontalStack justifyBetween', styles.metaInfo)}>
        <p>0.59 ETH</p>
        <p>0/1 minted</p>
      </div>
    </div>
  );
};

export default PreviewInfo;
