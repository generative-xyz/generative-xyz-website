import s from './styles.module.scss';
import React, { useContext, useEffect, useRef } from 'react';
import { TransactionReceipt } from 'web3-eth';
import { WalletContext } from '@contexts/wallet-context';
import useContractOperation from '@hooks/useContractOperation';
import MintGenerativeProjectOperation from '@services/contract-operations/generative-project/mint-generative-project';
import { IMintGenerativeProjectParams } from '@interfaces/contract-operations/mint-generative-project';
import { NETWORK_CHAIN_ID } from '@constants/config';
import GetParamControlOperation from '@services/contract-operations/parameter-control/get-parameter-control';
import { IGetParameterControlParams } from '@interfaces/contract-operations/get-parameter-control';
import { ParameterControlKey } from '@enums/parameter-key';
import MintGenerativeNFTOperation from '@services/contract-operations/generative-nft/mint-generative-nft';
import { IMintGenerativeNFTParams } from '@interfaces/contract-operations/mint-generative-nft';

const Profile: React.FC = (): React.ReactElement => {
  const walletCtx = useContext(WalletContext);
  const mintFee = useRef(0);
  const {
    call: getParamControl,
    data: mintProjectFee,
    errorMessage,
  } = useContractOperation<IGetParameterControlParams, number>(
    GetParamControlOperation,
    false
  );
  const { call: mintProject } = useContractOperation<
    IMintGenerativeProjectParams,
    TransactionReceipt
  >(MintGenerativeProjectOperation, true);
  const { call: mintNFT } = useContractOperation<
    IMintGenerativeNFTParams,
    TransactionReceipt
  >(MintGenerativeNFTOperation, true);

  const handleConnectWallet = async () => {
    await walletCtx.connect();
  };

  const handleTestMintProject = async () => {
    try {
      mintProject({
        chainID: NETWORK_CHAIN_ID,
        maxSupply: 100,
        limitSupply: 100,
        mintPrice: '0.002',
        name: 'Test',
        creatorName: 'dev team',
        description: 'ABCDE',
        thumbnail: 'ipfs://QmZha95v86iME98rpxrJWbHerK3JjEHKkiGpdS4NgZKjdb',
        thirdPartyScripts: ['p5js@1.5.0', 'tonejs@14.8.49'],
        scripts: [
          `<script type="text/javascript">const rand=mathRand();function T1(n){return n>.5}window.$generativeTraits={T1:T1(rand)},console.log(window.$generativeTraits);const container=document.createElement("div");container.innerHTML="<span>tokenId: "+tokenId+"</span><br><span>tokenMintNumber: "+tokenMintNumber+"</span><br><span>project: "+projectNumber+"</span><br><span>seed: "+seed+"</span><br>",document.body.prepend(container);</script>`,
        ],
        reservationList: [],
        mintFee: mintFee.current,
      });
    } catch (err: unknown) {
      // console.log(err);
    }
  };

  const handleTestMintNFT = async () => {
    try {
      mintNFT({
        projectAddress: '0x7e9b3d83a65c996c1b8df775cffd929350e0b428',
        mintFee: 0.002,
        chainID: NETWORK_CHAIN_ID,
      });
    } catch (err: unknown) {
      // console.log(err);
    }
  };

  useEffect(() => {
    if (walletCtx.walletManager) {
      getParamControl({
        key: ParameterControlKey.CREATE_PROJECT_FEE,
        chainID: NETWORK_CHAIN_ID,
      });
    }
  }, [walletCtx]);

  useEffect(() => {
    if (mintProjectFee !== null) {
      mintFee.current = mintProjectFee;
    }
  }, [mintProjectFee]);

  return (
    <section className={s.profile}>
      <p>{mintProjectFee}</p>
      <p>{errorMessage}</p>
      <button onClick={handleConnectWallet}>connect wallet</button>
      <button onClick={handleTestMintProject}>Test mint project</button>
      <button onClick={handleTestMintNFT}>Test mint token</button>
    </section>
  );
};

export default Profile;
