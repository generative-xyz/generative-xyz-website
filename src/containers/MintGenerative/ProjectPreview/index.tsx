import s from './styles.module.scss';
import SandboxPreview from '@containers/Sandbox/SandboxPreview';
import { MintGenerativeContext } from '@contexts/mint-generative-context';
import { ISandboxRef } from '@interfaces/sandbox';
import { generateHash } from '@utils/generate-data';
import { useContext, useMemo, useRef, useState } from 'react';
import Button from '@components/ButtonIcon';
import Image from 'next/image';
import { CDN_URL } from '@constants/config';
import { PreviewDisplayMode } from '@enums/mint-generative';

const ProjectPreview = () => {
  const { filesSandbox, thumbnailFile } = useContext(MintGenerativeContext);
  const sandboxRef = useRef<ISandboxRef>(null);
  const [displayMode, _] = useState<PreviewDisplayMode>(
    PreviewDisplayMode.Animation
  );
  const [hash] = useState<string>(generateHash());

  const handleIframeLoaded = (): void => {
    if (sandboxRef.current) {
      const iframe = sandboxRef.current.getHtmlIframe();
      if (iframe) {
        // @ts-ignore: Allow read iframe's window object
        if (iframe.contentWindow?.$generativeTraits) {
          // @ts-ignore: Allow read iframe's window object
        }
      }
    }
  };

  const reloadIframe = (): void => {
    if (sandboxRef.current) {
      sandboxRef.current.reloadIframe();
    }
  };

  const canPlay = useMemo(() => {
    return !!filesSandbox && displayMode === PreviewDisplayMode.Thumbnail;
  }, [filesSandbox]);

  const canPause = useMemo(() => {
    return !!thumbnailFile && displayMode === PreviewDisplayMode.Animation;
  }, [thumbnailFile]);

  return (
    <div className={s.projectPreview}>
      <div className={s.wrapper}>
        <div className={s.sandboxWrapper}>
          <SandboxPreview
            rawHtml={null}
            ref={sandboxRef}
            hash={hash}
            sandboxFiles={filesSandbox}
            onLoaded={handleIframeLoaded}
          />
        </div>
        <div className={s.actionWrapper}>
          <div className={s.uploadPreviewWrapper}></div>
          <div className={s.sandboxControls}>
            {canPlay && (
              <Button className={s.actionBtn} sizes="small" variants="outline">
                <Image
                  alt="play icon"
                  width={14}
                  height={14}
                  src={`${CDN_URL}/icons/ic-play-14x14.svg`}
                ></Image>
              </Button>
            )}
            {canPause && (
              <Button className={s.actionBtn} sizes="small" variants="outline">
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
              ></Image>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectPreview;
