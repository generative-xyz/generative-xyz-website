import React, { useContext, useEffect } from 'react';
import s from './404.module.scss';
import { SimpleLoading } from '@components/SimpleLoading';
import { registerLoading } from '@helpers/anim.helpers';
import Heading from '@components/Heading';
import ButtonIcon from '@components/ButtonIcon';
import { useAppSelector } from '@redux';
import { getUserSelector } from '@redux/user/selector';
import log from '@utils/logger';
import { LogLevel } from '@enums/log-level';
import { WalletContext } from '@contexts/wallet-context';
import { useRouter } from 'next/router';
import { ROUTE_PATH } from '@constants/route-path';
const LOG_PREFIX = 'Marketplace404';

export const Page404 = (): JSX.Element => {
  const user = useAppSelector(getUserSelector);
  const walletCtx = useContext(WalletContext);
  const router = useRouter();

  useEffect(() => {
    registerLoading(1);
    const html = document.querySelector('html');
    if (html) {
      html.classList.add('is-landing');
    }

    return () => {
      if (html) {
        html.classList.remove('is-landing');
      }
    };
  }, []);

  const handleConnectWallet = async (): Promise<void> => {
    try {
      await walletCtx.connect();
    } catch (err: unknown) {
      log(err as Error, LogLevel.Debug, LOG_PREFIX);
    }
  };

  const goHome = () => {
    router.push(ROUTE_PATH.HOME);
  };

  return (
    <div className={s.error404}>
      <SimpleLoading theme={'light'} />
      <div className={s.error404_inner}>
        <Heading
          as="h1"
          animOption={{ screen: 0.1, offset: 0, type: 'heading' }}
        >
          Almost here
        </Heading>
        <Heading
          as="h5"
          animOption={{ screen: 0.1, offset: 0, type: 'random' }}
        >
          To continue you need to connect your wallet.
        </Heading>
        <ul className={s.error404_ctas}>
          {!user.id && (
            <li>
              <ButtonIcon
                sizes="medium"
                variants={'primary'}
                onClick={handleConnectWallet}
              >
                Connect wallet
              </ButtonIcon>
            </li>
          )}
          <li>
            <ButtonIcon sizes="medium" variants={'outline'} onClick={goHome}>
              Take me home
            </ButtonIcon>
          </li>
        </ul>
      </div>
    </div>
  );
};
