import { WalletContext } from '@contexts/wallet-context';
import React, { useContext } from 'react';

const Profile: React.FC = (): React.ReactElement => {
  const walletCtx = useContext(WalletContext);

  const handleConnectWallet = async () => {
    await walletCtx.connect();
  };

  return (
    <section>
      <button onClick={handleConnectWallet}>connect wallet</button>
    </section>
  );
};

export default Profile;
