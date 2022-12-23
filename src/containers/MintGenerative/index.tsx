import { TransactionReceipt } from 'web3-eth';
import Button from '@components/Button';
import { MINT_STEPS } from '@constants/mint-generative';
import { MintGenerativeStep } from '@enums/mint-generative';
import SandboxPreview from '@containers/Sandbox/SandboxPreview';
import {
  MintGenerativeContext,
  TMintGenerativeContext,
} from '@contexts/mint-generative-context';
import { WalletContext } from '@contexts/wallet-context';
import useContractOperation from '@hooks/useContractOperation';
import { IMintGenerativeProjectParams } from '@interfaces/contract-operations/mint-generative-project';
import { ISandboxRef } from '@interfaces/sandbox';
import MintGenerativeProjectOperation from '@services/contract-operations/generative-project/mint-generative-project';
import { Form, Formik } from 'formik';
import { PropsWithChildren, useContext, useMemo, useRef } from 'react';
import { Stack } from 'react-bootstrap';
import { formInitialValues } from './FormModel/formInitialValues';
import styles from './styles.module.scss';
import { IFormValue, StepProps } from '@interfaces/mint-generative';
import log from '@utils/logger';
import { LogLevel } from '@enums/log-level';
import { NETWORK_CHAIN_ID } from '@constants/config';
import { readSandboxFileContent } from '@utils/sandbox';
import { CSS_EXTENSION, JS_EXTENSION } from '@constants/file';
import { IGetParameterControlParams } from '@interfaces/contract-operations/get-parameter-control';
import GetParamControlOperation from '@services/contract-operations/parameter-control/get-parameter-control';
import { ParameterControlKey } from '@enums/parameter-key';
import { uploadFile } from '@services/file';
import _get from 'lodash/get';
import { useRouter } from 'next/router';
import { createProjectMetadata } from '@services/project';
import { GENERATIVE_PROJECT_CONTRACT } from '@constants/contract-address';

const LOG_PREFIX = 'MintGenerative';

const MintGenerative = ({ children }: PropsWithChildren) => {
  const walletCtx = useContext(WalletContext);
  const { currentStep, filesSandbox, setAttributes, hash, thumbnailFile } =
    useContext(MintGenerativeContext) as TMintGenerativeContext;
  const {
    call: mintProject,
    isLoading: isMinting,
    errorMessage,
    reset: resetContractOperation,
  } = useContractOperation<IMintGenerativeProjectParams, TransactionReceipt>(
    MintGenerativeProjectOperation,
    true
  );
  const { call: getParamControl } = useContractOperation<
    IGetParameterControlParams,
    number
  >(GetParamControlOperation, false);
  const sandboxRef = useRef<ISandboxRef>(null);
  const router = useRouter();

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

  const handleSubmit = async (values: IFormValue) => {
    if (!filesSandbox) {
      log('No sandbox files', LogLevel.Debug, LOG_PREFIX);
      return;
    }

    if (!walletCtx.walletManager) {
      log('No wallet manager', LogLevel.Debug, LOG_PREFIX);
      return;
    }

    resetContractOperation();

    const {
      description,
      license,
      maxSupply,
      mintPrice,
      name,
      royalty,
      socialDiscord,
      socialInstagram,
      socialMedium,
      socialTwitter,
      socialWeb,
      thirdPartyScripts,
      tokenDescription,
      categories,
      tags,
    } = values;

    try {
      const mintFee = await getParamControl({
        key: ParameterControlKey.CREATE_PROJECT_FEE,
        chainID: NETWORK_CHAIN_ID,
      });

      if (mintFee === null) {
        log('No mint fee', LogLevel.Debug, LOG_PREFIX);
        return;
      }

      const fileContents = await readSandboxFileContent(filesSandbox);

      let thumbnailUrl = '';
      if (thumbnailFile) {
        const uploadRes = await uploadFile({ file: thumbnailFile });
        thumbnailUrl = uploadRes.url;
      }

      const projectPayload: IMintGenerativeProjectParams = {
        chainID: NETWORK_CHAIN_ID,
        maxSupply,
        limitSupply: maxSupply,
        mintPrice: mintPrice.toString(),
        name,
        creatorName: '',
        description,
        thumbnail: thumbnailUrl,
        thirdPartyScripts,
        scripts: [...fileContents[JS_EXTENSION]] ?? [],
        styles: fileContents[CSS_EXTENSION]
          ? fileContents[CSS_EXTENSION][0]
          : '',
        tokenDescription,
        reservationList: [],
        royalty: royalty * 100,
        socialDiscord,
        socialInstagram,
        socialMedium,
        socialTwitter,
        socialWeb,
        license,
        mintFee: mintFee,
      };

      const mintTx = await mintProject(projectPayload);

      if (!mintTx) {
        return;
      }

      const tokenID: string | null = _get(
        mintTx,
        'events.Transfer.returnValues.tokenId',
        null
      );
      if (tokenID === null) {
        return;
      }

      await createProjectMetadata({
        tokenID,
        categories,
        tags,
        contractAddress: GENERATIVE_PROJECT_CONTRACT,
      });

      router.push(`/generative/${tokenID}`);
    } catch (err: unknown) {
      log(err as Error, LogLevel.Debug, LOG_PREFIX);
    }
  };

  const renderMetaData = (values: IFormValue) => {
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
            className={`grid ${filesSandbox ? 'grid-cols-2' : ''}`}
          >
            <div>
              {children}
              {isLastStep && (
                <>
                  {errorMessage && <span>{errorMessage}</span>}
                  <Button
                    className={styles.submitBtn}
                    type="submit"
                    //  onClick={handleSubmit}
                    // onClick={() => router.push('/mint-generative/set-price')}
                  >
                    {isMinting ? 'Minting...' : 'Publish project'}
                  </Button>
                </>
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
