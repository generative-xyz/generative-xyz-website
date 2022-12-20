import SandboxPreview from '@containers/Sandbox/SandboxPreview';
import {
  MintGenerativeContext,
  MintGenerativeContextTypes,
} from '@contexts/mint-generative-context';
import { ISandboxRef } from '@interfaces/sandbox';
import { PropsWithChildren, useContext, useRef } from 'react';

import styles from './styles.module.scss';

type StepProps = {
  item: {
    id: number;
    label: string;
  };
};

// const LOG_PREFIX = 'MintGenerative';

const MINT_STEPS = [
  {
    id: 1,
    label: 'Upload to IPFS',
  },
  {
    id: 2,
    label: 'Product detail',
  },
  {
    id: 3,
    label: 'Set price & mint',
  },
];

const MintGenerative = ({ children }: PropsWithChildren) => {
  const { currentStep, filesSandbox, setAttributes, hash } = useContext(
    MintGenerativeContext
  ) as MintGenerativeContextTypes;

  const sandboxRef = useRef<ISandboxRef>(null);

  const handleIframeLoaded = (): void => {
    if (sandboxRef.current) {
      const iframe = sandboxRef.current.getHtmlIframe();
      if (iframe) {
        // @ts-ignore: Allow read iframe's window object
        if (iframe.contentWindow?.$generativeTraits) {
          // @ts-ignore: Allow read iframe's window object
          setAttributes(iframe.contentWindow?.$generativeTraits);
        } else {
          setAttributes(null);
        }
      }
    }
  };

  const StepItem = ({ item }: StepProps) => {
    return (
      <div className={currentStep === item.id ? styles.active : ''}>
        {item.id}. {item.label}
      </div>
    );
  };

  return (
    <div className={styles.container}>
      <div className={styles.steps}>
        {MINT_STEPS.map(step => (
          <StepItem item={step} key={`mint-step-${step.id}`} />
        ))}
      </div>
      <div className="grid grid-cols-2">
        {children}
        <div
          className={styles.previewContainer}
          style={
            filesSandbox ? { visibility: 'visible' } : { visibility: 'hidden' }
          }
        >
          <SandboxPreview
            ref={sandboxRef}
            hash={hash}
            sandboxFiles={filesSandbox}
            onLoaded={handleIframeLoaded}
          />
        </div>
      </div>
    </div>
  );
};

export default MintGenerative;
