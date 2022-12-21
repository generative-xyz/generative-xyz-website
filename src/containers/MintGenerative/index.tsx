import Button from '@components/Button';
import { MintGenerativeStep } from '@constants/mint-generative';
import SandboxPreview from '@containers/Sandbox/SandboxPreview';
import {
  MintGenerativeContext,
  MintGenerativeContextTypes,
} from '@contexts/mint-generative-context';
import { ISandboxRef } from '@interfaces/sandbox';
import { Form, Formik } from 'formik';
import { PropsWithChildren, useContext, useMemo, useRef } from 'react';
import { Stack } from 'react-bootstrap';

import { formInitialValues } from './FormModel/formInitialValues';
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

  const isLastStep = useMemo(
    () => currentStep === MintGenerativeStep.SET_PRICE,
    [currentStep]
  );

  // TODO: Handle Submit form
  const handleSubmit = () => {
    // console.log('🚀 ~ handleSubmit ~ actions', actions);
    // console.log('🚀 ~ handleSubmit ~ values', values);
    return;
  };

  // TODO: Remove disable later
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const renderMetaData = (values: any) => {
    switch (currentStep) {
      case MintGenerativeStep.PRODUCT_DETAIL:
        return (
          <div className="">
            <div className="cursor-pointer">Upload preview image</div>
            <div className="address">Wait for API to show address</div>
          </div>
        );

      case MintGenerativeStep.SET_PRICE:
        return (
          <div className="">
            <div className="cursor-pointer">Upload preview image</div>
            <div className="address">{values?.name}</div>
            <div className="address">Wait for API to show address</div>
            <Stack direction="horizontal" className="justify-between">
              <b>{values?.mintPrice} ETH</b>
              <b>0/{values?.maxSupply} minted</b>
            </Stack>
          </div>
        );

      default:
        return;
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
      <Formik
        initialValues={formInitialValues}
        // validationSchema={currentValidationSchema}
        onSubmit={handleSubmit}
      >
        {({ values }) => (
          <Form
            id={'mint-generative-form'}
            className={`grid ${filesSandbox ? 'grid-cols-2' : ''} }`}
          >
            <div>
              {children}
              {isLastStep && (
                <Button
                  className="wFull"
                  type="submit"
                  //  onClick={handleSubmit}
                  // onClick={() => router.push('/mint-generative/set-price')}
                >
                  Publish project
                </Button>
              )}
            </div>
            <div
              className={styles.previewContainer}
              style={
                filesSandbox
                  ? { visibility: 'visible' }
                  : { visibility: 'hidden' }
              }
            >
              <SandboxPreview
                ref={sandboxRef}
                hash={hash}
                sandboxFiles={filesSandbox}
                onLoaded={handleIframeLoaded}
              />
              {renderMetaData(values)}
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default MintGenerative;
