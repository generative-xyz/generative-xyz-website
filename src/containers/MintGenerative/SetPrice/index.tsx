import s from './styles.module.scss';
import { TransactionReceipt } from 'web3-eth';
import { NETWORK_CHAIN_ID } from '@constants/config';
import { MintGenerativeContext } from '@contexts/mint-generative-context';
import { Formik } from 'formik';
import { useRouter } from 'next/router';
import { useContext, useState } from 'react';
import Button from '@components/ButtonIcon';
import log from '@utils/logger';
import { LogLevel } from '@enums/log-level';
import { WalletContext } from '@contexts/wallet-context';
import MintGenerativeProjectOperation from '@services/contract-operations/generative-project/mint-generative-project';
import { IMintGenerativeProjectParams } from '@interfaces/contract-operations/mint-generative-project';
import useContractOperation from '@hooks/useContractOperation';
import { IGetParameterControlParams } from '@interfaces/contract-operations/get-parameter-control';
import GetParamControlOperation from '@services/contract-operations/parameter-control/get-parameter-control';
import { ParameterControlKey } from '@enums/parameter-key';
import { readSandboxFileContent } from '@utils/sandbox';
import { uploadFile } from '@services/file';
import { CSS_EXTENSION, JS_EXTENSION } from '@constants/file';
import _get from 'lodash/get';
import { createProjectMetadata } from '@services/project';
import { GENERATIVE_PROJECT_CONTRACT } from '@constants/contract-address';
import { isTestnet } from '@utils/chain';
import { WalletManager } from '@services/wallet';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { getUserSelector } from '@redux/user/selector';

const LOG_PREFIX = 'SetPrice';

type ISetPriceFormValue = {
  maxSupply: number;
  mintPrice: number;
  royalty: number;
};

const SetPrice = () => {
  const router = useRouter();
  const user = useSelector(getUserSelector);
  const {
    formValues,
    setFormValues,
    filesSandbox,
    thumbnailFile,
    setMintedProjectID,
    setShowErrorAlert,
  } = useContext(MintGenerativeContext);
  const walletCtx = useContext(WalletContext);
  const { call: mintProject, reset: resetContractOperation } =
    useContractOperation<IMintGenerativeProjectParams, TransactionReceipt>(
      MintGenerativeProjectOperation,
      true
    );
  const { call: getParamControl } = useContractOperation<
    IGetParameterControlParams,
    number
  >(GetParamControlOperation, false);
  const [isMinting, setIsMinting] = useState(false);

  const validateForm = (values: ISetPriceFormValue): Record<string, string> => {
    const errors: Record<string, string> = {};

    // Update data
    setFormValues({
      ...formValues,
      ...{
        maxSupply: values.maxSupply.toString() ? values.maxSupply : 0,
        mintPrice: values.mintPrice.toString()
          ? values.mintPrice.toString()
          : '0',
        royalty: values.royalty.toString() ? values.royalty : 10,
      },
    });

    if (!values.maxSupply.toString()) {
      errors.maxSupply = 'Number of editions is required.';
    } else if (values.maxSupply <= 0) {
      errors.maxSupply = 'Invalid number. Must be greater than 0.';
    }

    if (!values.mintPrice.toString()) {
      errors.mintPrice = 'Price is required.';
    } else if (values.mintPrice < 0) {
      errors.mintPrice = 'Invalid number. Must be equal or greater than 0.';
    }

    if (!values.royalty.toString()) {
      errors.royalty = 'Royalty is required.';
    } else if (values.royalty < 10 || values.royalty > 25) {
      errors.royalty = 'Invalid number. Must be between 10 and 25.';
    }

    return errors;
  };

  const handleSubmit = async (): Promise<void> => {
    // TODO Show error
    if (!filesSandbox) {
      log('No sandbox files', LogLevel.Debug, LOG_PREFIX);
      return;
    }

    if (!walletCtx.walletManager) {
      log('No wallet manager', LogLevel.Debug, LOG_PREFIX);
      return;
    }

    try {
      setIsMinting(true);
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
      } = formValues;

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
        maxSupply: maxSupply ?? 0,
        limitSupply: maxSupply ?? 0,
        mintPrice: mintPrice?.toString() ? mintPrice.toString() : '0',
        name: name ?? '',
        creatorName: '',
        description: description ?? '',
        thumbnail: thumbnailUrl,
        thirdPartyScripts: thirdPartyScripts ?? [],
        scripts: [...fileContents[JS_EXTENSION]] ?? [],
        styles: fileContents[CSS_EXTENSION]
          ? fileContents[CSS_EXTENSION][0]
          : '',
        tokenDescription: tokenDescription ?? '',
        reservationList: [],
        royalty: royalty ? royalty * 100 : 1000,
        socialDiscord: socialDiscord ?? '',
        socialInstagram: socialInstagram ?? '',
        socialMedium: socialMedium ?? '',
        socialTwitter: socialTwitter ?? '',
        socialWeb: socialWeb ?? '',
        license: license ?? 'MIT',
        mintFee: mintFee,
      };

      if (mintFee > 0) {
        const walletManagerInstance = new WalletManager();
        if (walletManagerInstance) {
          const check = await walletManagerInstance.checkInsufficient(
            user.walletAddress,
            '0x0000000000000000000000000000000000000000',
            mintFee.toString()
          );
          if (!check) {
            if (isTestnet()) {
              toast.error(
                'Insufficient funds testnet. Go to profile and get testnet faucet'
              );
            } else {
              toast.error('Insufficient funds.');
            }
            return;
          }
        }
      }

      const mintTx = await mintProject(projectPayload);

      if (!mintTx) {
        setShowErrorAlert({ open: true, message: null });
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

      setMintedProjectID(tokenID);
      await createProjectMetadata({
        tokenID,
        categories: categories ?? [],
        tags: tags ?? [],
        contractAddress: GENERATIVE_PROJECT_CONTRACT,
      });

      router.push('/mint-generative/mint-success', undefined, {
        shallow: true,
      });
    } catch (err: unknown) {
      log(err as Error, LogLevel.Debug, LOG_PREFIX);
      setShowErrorAlert({ open: true, message: null });
    } finally {
      setIsMinting(false);
    }
  };

  return (
    <Formik
      key="setPriceForm"
      initialValues={{
        maxSupply: formValues.maxSupply ?? 0,
        mintPrice: parseFloat(formValues.mintPrice ?? '0'),
        royalty: formValues.royalty ?? 10,
      }}
      validate={validateForm}
      onSubmit={handleSubmit}
      validateOnChange
      enableReinitialize
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
      }) => (
        <form onSubmit={handleSubmit}>
          <div className={s.setPrice}>
            <div className={s.blockInfo}>
              <h3 className={s.descriptionTitle}>
                How will your piece be sold
              </h3>
              <p className={s.description}>Read more pricing guide here.</p>
              <p className={s.description}>
                You will be able to edit these settings after the publication,
                except if stated otherwise on the corresponding fields.
              </p>
            </div>
            <div className={s.divider}></div>
            <div className={s.formWrapper}>
              <div className={s.formItem}>
                <label className={s.label} htmlFor="maxSupply">
                  Number of editions <sup className={s.requiredTag}>*</sup>
                </label>
                <div className={s.inputContainer}>
                  <input
                    id="maxSupply"
                    type="number"
                    name="maxSupply"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.maxSupply}
                    className={s.input}
                    placeholder="Provide a number"
                  />
                  <div className={s.inputPostfix}>Items</div>
                </div>
                {errors.maxSupply && touched.maxSupply && (
                  <p className={s.error}>{errors.maxSupply}</p>
                )}
                <p className={s.inputDesc}>
                  How many NFT can be generated using your Token - can only be
                  decreased after publication
                </p>
              </div>
              <div className={s.formItem}>
                <label className={s.label} htmlFor="mintPrice">
                  Price <sup className={s.requiredTag}>*</sup>
                </label>
                <div className={s.inputContainer}>
                  <input
                    id="mintPrice"
                    type="number"
                    name="mintPrice"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={
                      values.mintPrice
                        ? values.mintPrice
                        : isTestnet()
                        ? 0.0001
                        : values.mintPrice
                    }
                    className={s.input}
                    placeholder="Provide a number"
                  />
                  <div className={s.inputPostfix}>ETH</div>
                </div>
                {errors.mintPrice && touched.mintPrice && (
                  <p className={s.error}>{errors.mintPrice}</p>
                )}
              </div>
              <div className={s.formItem}>
                <label className={s.label} htmlFor="royalty">
                  Royalties <sup className={s.requiredTag}>*</sup>
                </label>
                <div className={s.inputContainer}>
                  <input
                    id="royalty"
                    type="number"
                    name="royalty"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.royalty}
                    className={s.input}
                    placeholder="Provide a number"
                  />
                  <div className={s.inputPostfix}>%</div>
                </div>
                {errors.royalty && touched.royalty && (
                  <p className={s.error}>{errors.royalty}</p>
                )}
                <p className={s.inputDesc}>in %, between 10 - 25</p>
              </div>
            </div>
          </div>

          <div className={s.stepFooterWrapper}>
            <footer className={s.stepFooter}>
              <div className={s.container}>
                <div className={s.actionWrapper}>
                  <Button
                    disabled={isMinting}
                    type="submit"
                    className={s.nextBtn}
                    sizes="medium"
                  >
                    {isMinting ? 'Minting...' : 'Publish project'}
                  </Button>
                </div>
              </div>
            </footer>
          </div>
        </form>
      )}
    </Formik>
  );
};

export default SetPrice;
