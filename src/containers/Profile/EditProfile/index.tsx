import Avatar from '@components/Avatar';
import ButtonIcon from '@components/ButtonIcon';
import Heading from '@components/Heading';
import Text from '@components/Text';
import { ProfileContext } from '@contexts/profile-context';
import { WalletContext } from '@contexts/wallet-context';
import { LogLevel } from '@enums/log-level';
import { formatAddress } from '@utils/format';
import log from '@utils/logger';
import { Formik } from 'formik';
import { useContext } from 'react';
import { Container } from 'react-bootstrap';
import FormEditProfile from './FormEditProfile';
import s from './styles.module.scss';

const LOG_PREFIX = 'EditProfile';

const EditProfile = () => {
  const { currentUser } = useContext(ProfileContext);
  const walletCtx = useContext(WalletContext);

  const handleConnectWallet = async (): Promise<void> => {
    try {
      await walletCtx.connect();
    } catch (err: unknown) {
      log(err as Error, LogLevel.Debug, LOG_PREFIX);
    }
  };

  const validateForm = (): Record<string, string> => {
    const errors: Record<string, string> = {};
    return errors;
  };

  const handleSubmit = async (): Promise<void> => {
    return;
  };

  return (
    <Container className={s.wrapper}>
      <div className={s.setting}>
        <Heading as="h4" fontWeight="bold">
          Setting
        </Heading>
        <Text size="18" fontWeight="bold">
          Edit profile
        </Text>
      </div>
      <div className="h-divider"></div>
      <div className={s.account}>
        <div className={s.account_avatar}>
          <Avatar
            imgSrcs={currentUser?.avatar || ''}
            width={300}
            height={300}
          />
        </div>
        <div className={s.account_form}>
          <Heading as="h4" fontWeight="bold">
            Account Info
          </Heading>
          <Formik
            key="editProfileForm"
            initialValues={{
              nickname: currentUser?.displayName ?? 0,
              bio: currentUser?.bio ?? '',
              social: {},
            }}
            validate={validateForm}
            onSubmit={handleSubmit}
            validateOnChange
            enableReinitialize
          >
            {() => (
              //     {
              //   values,
              //   errors,
              //   touched,
              //   handleChange,
              //   handleBlur,
              //   handleSubmit,
              // }
              <FormEditProfile />
            )}
          </Formik>
        </div>
        <div className={s.account_wallet}>
          <Heading as="h4" fontWeight="bold">
            Wallet
          </Heading>
          <Text style={{ marginBottom: '6px' }}>
            Your wallet address{' '}
            {formatAddress(currentUser?.walletAddress || '')}
          </Text>
          {currentUser?.walletAddress ? (
            <ButtonIcon onClick={() => walletCtx.disconnect()}>
              Disconnect wallet
            </ButtonIcon>
          ) : (
            <ButtonIcon onClick={handleConnectWallet}>
              Connect wallet
            </ButtonIcon>
          )}
        </div>
      </div>
    </Container>
  );
};

export default EditProfile;
