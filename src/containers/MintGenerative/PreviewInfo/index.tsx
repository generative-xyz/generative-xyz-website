import AvatarInfo from '@components/AvatarInfo';
import ClientOnly from '@components/Utils/ClientOnly';
import SandboxPreview from '@containers/Sandbox/SandboxPreview';
import {
  MintGenerativeContext,
  MintGenerativeContextTypes,
} from '@contexts/mint-generative-context';
import { ISandboxRef } from '@interfaces/sandbox';
import { generateHash } from '@utils/generate-data';
import cx from 'classnames';
import Image from 'next/image';
import PlayIcon from 'public/assets/icons/play-icon.svg';
import { useContext, useRef } from 'react';
import styles from './styles.module.scss';

const PreviewInfo = () => {
  const { filesSandbox } = useContext(
    MintGenerativeContext
  ) as MintGenerativeContextTypes;

  const sandboxRef = useRef<ISandboxRef>(null);
  const hash = generateHash();
  // const [attributes, setAttributes] = useState<RawTokenAttributes | null>(null);

  // const handleGenerateHash = () => {
  //   setHash(generateHash());
  //   if (sandboxRef.current && filesSandbox) {
  //     sandboxRef.current.reloadIframe();
  //   }
  // };

  const handleIframeLoaded = (): void => {
    if (sandboxRef.current) {
      const iframe = sandboxRef.current.getHtmlIframe();
      if (iframe) {
        // @ts-ignore: Allow read iframe's window object
        if (iframe.contentWindow?.$generativeTraits) {
          // @ts-ignore: Allow read iframe's window object
          // setAttributes(iframe.contentWindow?.$generativeTraits);
        } else {
          // setAttributes(null);
        }
      }
    }
  };

  return (
    <div className={styles.wrapper}>
      <ClientOnly>
        <SandboxPreview
          ref={sandboxRef}
          hash={hash}
          sandboxFiles={filesSandbox}
          onLoaded={handleIframeLoaded}
        />
      </ClientOnly>
      <div className="horizontalStack justify-between">
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
      <div className={cx('horizontalStack justify-between', styles.metaInfo)}>
        <p>0.59 ETH</p>
        <p>0/1 minted</p>
      </div>
    </div>
  );
};

export default PreviewInfo;
