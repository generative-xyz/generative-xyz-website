import React, { useContext } from 'react';
import { WalletContext } from '@contexts/wallet-context';
import useContractOperation from '@hooks/useContractOperation';
import GetParamControlOperation from '@services/contract-operations/parameter-control/get-parameter-control';
import { PARAM_CONTROL_CONTRACT } from '@constants/contract-address';

const Profile: React.FC = (): React.ReactElement => {
  const walletCtx = useContext(WalletContext);
  const { call } = useContractOperation(GetParamControlOperation);

  const handleConnectWallet = async () => {
    await walletCtx.connect();
  };

  const handleTest = () => {
    call({
      key: 'CREATE_PROJECT_FEE',
      chainID: 80001,
      contractAddress: PARAM_CONTROL_CONTRACT,
    });
  };

  return (
    <section>
      <button onClick={handleConnectWallet}>connect wallet</button>
      <button onClick={handleTest}>Test</button>
    </section>
  );
};

export default Profile;
