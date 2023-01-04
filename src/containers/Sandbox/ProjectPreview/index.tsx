import s from './styles.module.scss';
import SandboxPreview from '@containers/Sandbox/SandboxPreview';
import { ISandboxRef, SandboxFiles } from '@interfaces/sandbox';
import { generateHash } from '@utils/generate-data';
import { useMemo, useRef, useState } from 'react';
import Button from '@components/ButtonIcon';
import Image from 'next/image';
import { CDN_URL } from '@constants/config';
import { PreviewDisplayMode } from '@enums/mint-generative';
import ClientOnly from '@components/Utils/ClientOnly';
import { DEFAULT_ART_THUMBNAIL } from '@constants/common';

interface IProps {
  filesSandbox: SandboxFiles | null;
}

const ProjectPreview = ({ filesSandbox }: IProps) => {
  const [previewSrc, setPreviewSrc] = useState('');
  const sandboxRef = useRef<ISandboxRef>(null);
  const [displayMode, setDisplayMode] = useState<PreviewDisplayMode>(
    PreviewDisplayMode.Animation
  );
  const [hash, setHash] = useState<string>(generateHash());

  const handleVariation = (): void => {
    setHash(generateHash());
  };

  const openPreview = (): void => {
    window.open(previewSrc);
  };

  const handleIframeLoaded = (): void => {
    if (sandboxRef.current) {
      const iframe = sandboxRef.current.getHtmlIframe();
      if (iframe) {
        // @ts-ignore: Allow read iframe's window object
        if (iframe.contentWindow?.$generativeTraits) {
          // @ts-ignore: Allow read iframe's window object
          setPreviewSrc(iframe.src);
        }
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

  const canPlay = useMemo(() => {
    return !!filesSandbox && displayMode === PreviewDisplayMode.Thumbnail;
  }, [filesSandbox, displayMode]);

  const canPause = useMemo(() => {
    return displayMode === PreviewDisplayMode.Animation;
  }, [displayMode]);

  return (
    <div className={s.projectPreview}>
      <div className={s.wrapper}>
        <div className={s.sandboxWrapper}>
          <ClientOnly>
            <SandboxPreview
              showIframe={displayMode === PreviewDisplayMode.Animation}
              rawHtml={null}
              ref={sandboxRef}
              hash={hash}
              sandboxFiles={filesSandbox}
              onLoaded={handleIframeLoaded}
            />
          </ClientOnly>
          {displayMode === PreviewDisplayMode.Thumbnail && (
            <Image fill src={DEFAULT_ART_THUMBNAIL} alt="thumbnail"></Image>
          )}
        </div>
        <div className={s.actionWrapper}>
          <div className={s.sandboxControls}>
            <Button
              onClick={handleVariation}
              className={s.actionBtn}
              sizes="small"
              variants="outline"
            >
              <Image
                alt="play icon"
                width={14}
                height={14}
                src={`${CDN_URL}/icons/ic-shuffle-24x24.svg`}
              />
            </Button>
            {canPlay && (
              <Button
                onClick={handlePlay}
                className={s.actionBtn}
                sizes="small"
                variants="outline"
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
            >
              <Image
                alt="refresh icon"
                width={14}
                height={14}
                src={`${CDN_URL}/icons/ic-refresh-14x14.svg`}
              />
            </Button>
            {previewSrc && (
              <Button
                onClick={openPreview}
                className={s.actionBtn}
                sizes="small"
                variants="outline"
              >
                <Image
                  alt="refresh icon"
                  width={14}
                  height={14}
                  src={`${CDN_URL}/icons/ic-expand.svg`}
                />
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectPreview;
