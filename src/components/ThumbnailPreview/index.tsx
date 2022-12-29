import React, { useEffect, useRef, useState } from 'react';
import styles from './styles.module.scss';
import cs from 'classnames';
import SandboxPreview from '@containers/Sandbox/SandboxPreview';
import Image from 'next/image';
import { convertIpfsToHttp } from '@utils/image';
import { Stack } from 'react-bootstrap';
import { ISandboxRef } from '@interfaces/sandbox';
import { base64ToUtf8 } from '@utils/format';
import Link from '@components/Link';
import { generateHash } from '@utils/generate-data';

type Props = {
  data: any;
  allowVariation?: boolean;
};

const ThumbnailPreview = ({ data, allowVariation = false }: Props) => {
  const [startAnimaton, setStartAnimaton] = useState(false);
  const [hash, setHash] = useState('');

  const animationUrl = data?.animationUrl || data?.animation_url || '';

  const [iframeSrc, setIframeSrc] = useState('');

  const sandboxRef = useRef<ISandboxRef>(null);

  const handleAnimationTrigger = () => {
    setStartAnimaton(!startAnimaton);
    if (sandboxRef.current) {
      sandboxRef.current.reloadIframe();
      const iframe = sandboxRef.current.getHtmlIframe() as HTMLIFrameElement;
      setIframeSrc(iframe.src);
    }
  };

  const handleRefreshAnimation = () => {
    if (sandboxRef.current) {
      sandboxRef.current.reloadIframe();
    }
  };

  const handleVariations = () => {
    const seed = generateHash();
    setHash(seed);
  };

  useEffect(() => {
    if (!startAnimaton) {
      setIframeSrc('');
    }
  }, [startAnimaton]);

  useEffect(() => {
    if (sandboxRef.current) {
      const iframe = sandboxRef.current.getHtmlIframe() as HTMLIFrameElement;
      setIframeSrc(iframe.src);
    }
  }, [hash]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.thumbnail}>
        <div
          className={cs(
            startAnimaton ? 'd-block' : 'd-none',
            styles.sandboxContainer
          )}
        >
          <SandboxPreview
            ref={sandboxRef}
            rawHtml={base64ToUtf8(
              animationUrl.replace('data:text/html;base64,', '')
            )}
            hash={hash}
            sandboxFiles={null}
          />
        </div>

        <Image
          src={convertIpfsToHttp(
            data?.image ||
              'ipfs://QmNTU5ctcffhZz5Hphd44yPivh2Y89pDYYG8QQ6yWGY3wn'
          )}
          alt={data?.name || ''}
          fill
          style={{ width: '100%' }}
          className={cs(startAnimaton ? 'd-none' : 'd-block')}
          sizes="(max-width: 768px) 100vw,
(max-width: 1200px) 25vw"
        />
      </div>
      <Stack direction="horizontal" className={styles.actionButtons} gap={5}>
        {allowVariation && <div onClick={handleVariations}>Variations</div>}
        <div onClick={handleAnimationTrigger}>
          {startAnimaton ? 'Stop' : 'Run'}
        </div>
        {startAnimaton && <div onClick={handleRefreshAnimation}>Refresh</div>}
        {iframeSrc && (
          <Link href={iframeSrc} target={`_blank`} rel="noopener">
            Open
          </Link>
        )}
      </Stack>
    </div>
  );
};

export default ThumbnailPreview;
