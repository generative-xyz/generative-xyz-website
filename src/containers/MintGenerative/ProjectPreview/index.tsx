import Button from '@components/ButtonIcon';
import Skeleton from '@components/Skeleton';
import ClientOnly from '@components/Utils/ClientOnly';
import { CDN_URL } from '@constants/config';
import SandboxPreview from '@containers/Sandbox/SandboxPreview';
import { MintGenerativeContext } from '@contexts/mint-generative-context';
import { PreviewDisplayMode } from '@enums/mint-generative';
import { ISandboxRef } from '@interfaces/sandbox';
import { getUserSelector } from '@redux/user/selector';
import { formatAddress } from '@utils/format';
import { generateHash } from '@utils/generate-data';
import Image from 'next/image';
import { useContext, useMemo, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import s from './styles.module.scss';

const ProjectPreview = () => {
  const user = useSelector(getUserSelector);
  const {
    filesSandbox,
    thumbnailFile,
    formValues,
    currentStep,
    thumbnailPreviewUrl,
  } = useContext(MintGenerativeContext);
  const sandboxRef = useRef<ISandboxRef>(null);
  const [displayMode, setDisplayMode] = useState<PreviewDisplayMode>(
    PreviewDisplayMode.Animation
  );
  const [hash, setHash] = useState<string>(generateHash());

  const handleVariation = (): void => {
    setHash(generateHash());
  };

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
    return !!thumbnailFile && displayMode === PreviewDisplayMode.Animation;
  }, [thumbnailFile, displayMode]);

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
          {displayMode === PreviewDisplayMode.Thumbnail &&
            thumbnailPreviewUrl && (
              <Image fill src={thumbnailPreviewUrl} alt="thumbnail"></Image>
            )}
        </div>
        <div className={s.actionWrapper}>
          <div className={s.uploadPreviewWrapper}>
            {/* {currentStep > 1 && currentStep < 3 && <UploadThumbnailButton />} */}
          </div>
          <div className={s.sandboxControls}>
            <Button
              onClick={handleVariation}
              className={s.actionBtn}
              sizes="small"
              variants="outline"
            >
              <Image
                alt="variation icon"
                width={14}
                height={14}
                src={`${CDN_URL}/icons/ic-variation.svg`}
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
              ></Image>
            </Button>
          </div>
        </div>
        {currentStep >= 2 && (
          <div className={s.projectInfoWrapper}>
            <div className={s.ownerInfo}>
              <Image
                alt="owner avatar"
                src={`${CDN_URL}/images/default-avatar.svg`}
                width={48}
                height={48}
              ></Image>
              <span className={s.ownerName}>
                {user.displayName || formatAddress(user.walletAddress)}
              </span>
            </div>
            <div className={s.projectInfo}>
              <h3 className={s.projectName}>
                {formValues.name ? (
                  <>{formValues.name}</>
                ) : (
                  <Skeleton width={200} height={30}></Skeleton>
                )}
              </h3>
              <div className={s.mintingInfo}>
                {formValues.mintPrice ? (
                  <span
                    className={s.mintPrice}
                  >{`${formValues.mintPrice} ETH`}</span>
                ) : (
                  <Skeleton width={100} height={30}></Skeleton>
                )}
                {formValues.maxSupply ? (
                  <span
                    className={s.mintCount}
                  >{`0/${formValues.maxSupply}`}</span>
                ) : (
                  <Skeleton width={100} height={30}></Skeleton>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectPreview;
