import Button from '@components/ButtonIcon';
import ClientOnly from '@components/Utils/ClientOnly';
import { CDN_URL } from '@constants/config';
import SandboxPreview from '@containers/Sandbox/SandboxPreview';
import { PreviewDisplayMode } from '@enums/mint-generative';
import { ISandboxRef } from '@interfaces/sandbox';
import { base64ToUtf8 } from '@utils/format';
import { generateHash } from '@utils/generate-data';
import { convertIpfsToHttp } from '@utils/image';
import Image from 'next/image';
import Link from 'next/link';
import { useMemo, useRef, useState } from 'react';
import s from './styles.module.scss';

type Props = {
  data?: any;
  allowVariantion?: boolean;
};

const ThumbnailPreview = (props: Props) => {
  const { data, allowVariantion = false } = props;

  const animationUrl = data?.animationUrl || data?.animation_url || '';

  const thumbnailPreviewUrl = data?.image;

  const sandboxRef = useRef<ISandboxRef>(null);
  const [displayMode, setDisplayMode] = useState<PreviewDisplayMode>(
    PreviewDisplayMode.Thumbnail
  );
  const [hash, setHash] = useState<string>(generateHash());

  const [previewSrc, setPreviewSrc] = useState<string | null>(null);

  const rawHtmlFile = base64ToUtf8(
    animationUrl.replace('data:text/html;base64,', '')
  );

  const handleIframeLoaded = (): void => {
    if (sandboxRef.current) {
      const iframe = sandboxRef.current.getHtmlIframe();
      if (iframe) {
        // @ts-ignore: Allow read iframe's window object
        setPreviewSrc(iframe.src);
      }
    }
  };

  const reloadIframe = (): void => {
    if (sandboxRef.current) {
      sandboxRef.current.reloadIframe();
    }
  };

  const handlePlay = (): void => {
    setDisplayMode(PreviewDisplayMode.Animation);
  };

  const handlePause = (): void => {
    setDisplayMode(PreviewDisplayMode.Thumbnail);
  };

  const handleVariation = (): void => {
    setHash(generateHash());
  };

  const canPlay = useMemo(() => {
    return !!rawHtmlFile && displayMode === PreviewDisplayMode.Thumbnail;
  }, [rawHtmlFile, displayMode]);

  const canPause = useMemo(() => {
    return !!rawHtmlFile && displayMode === PreviewDisplayMode.Animation;
  }, [rawHtmlFile, displayMode]);

  const openPreview = useMemo(() => !!previewSrc, [previewSrc]);

  return (
    <div className={s.ThumbnailPreview}>
      <div className={s.wrapper}>
        <div className={s.sandboxWrapper}>
          <div className={s.sandboxContent}>
            <ClientOnly>
              <SandboxPreview
                showIframe={displayMode === PreviewDisplayMode.Animation}
                rawHtml={rawHtmlFile}
                ref={sandboxRef}
                hash={hash}
                sandboxFiles={null}
                onLoaded={handleIframeLoaded}
              />
            </ClientOnly>
            {displayMode === PreviewDisplayMode.Thumbnail &&
              thumbnailPreviewUrl && (
                <Image
                  fill
                  src={convertIpfsToHttp(thumbnailPreviewUrl)}
                  alt="thumbnail"
                ></Image>
              )}
          </div>
        </div>
        <div className={s.actionWrapper}>
          <div className={s.sandboxControls}>
            {allowVariantion &&
              displayMode === PreviewDisplayMode.Animation && (
                <Button
                  onClick={handleVariation}
                  className={s.actionBtn}
                  sizes="small"
                  variants="outline"
                  iconOnly
                >
                  <Image
                    alt="play icon"
                    width={14}
                    height={14}
                    src={`${CDN_URL}/icons/ic-shuffle.svg`}
                  ></Image>
                </Button>
              )}
            {canPlay && (
              <Button
                onClick={handlePlay}
                className={s.actionBtn}
                sizes="small"
                variants="outline"
                iconOnly
              >
                <Image
                  alt="play icon"
                  width={14}
                  height={14}
                  src={`${CDN_URL}/icons/ic-play-14x14.svg`}
                ></Image>
              </Button>
            )}
            {canPause && (
              <Button
                onClick={handlePause}
                className={s.actionBtn}
                sizes="small"
                variants="outline"
                iconOnly
              >
                <Image
                  alt="pause icon"
                  width={14}
                  height={14}
                  src={`${CDN_URL}/icons/ic-pause-14x14.svg`}
                ></Image>
              </Button>
            )}
            <Button
              onClick={reloadIframe}
              className={s.actionBtn}
              sizes="small"
              variants="outline"
              iconOnly
            >
              <Image
                alt="refresh icon"
                width={14}
                height={14}
                src={`${CDN_URL}/icons/ic-refresh-14x14.svg`}
              ></Image>
            </Button>
            {openPreview && previewSrc && (
              <Link href={previewSrc} target="_blank">
                <Button
                  // onClick={}
                  className={s.actionBtn}
                  sizes="small"
                  variants="outline"
                  iconOnly
                >
                  <Image
                    alt="pause icon"
                    width={14}
                    height={14}
                    src={`${CDN_URL}/icons/ic-expand.svg`}
                  ></Image>
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThumbnailPreview;
