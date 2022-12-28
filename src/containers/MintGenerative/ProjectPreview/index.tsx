import s from './styles.module.scss';
import SandboxPreview from '@containers/Sandbox/SandboxPreview';
import { MintGenerativeContext } from '@contexts/mint-generative-context';
import { ISandboxRef } from '@interfaces/sandbox';
import { generateHash } from '@utils/generate-data';
import { useContext, useRef } from 'react';
import Button from '@components/Button';

const ProjectPreview = () => {
  const { filesSandbox } = useContext(MintGenerativeContext);
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
    <div className={s.projectPreview}>
      <div className={s.wrapper}>
        <div className={s.sandboxWrapper}>
          <SandboxPreview
            ref={sandboxRef}
            hash={hash}
            sandboxFiles={filesSandbox}
            onLoaded={handleIframeLoaded}
          />
        </div>
        <div className={s.actionWrapper}>
          <div className={s.uploadPreviewWrapper}></div>
          <div className={s.sandboxControls}>
            <Button>aaaaa</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectPreview;
