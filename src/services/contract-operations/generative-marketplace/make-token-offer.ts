import { AbiItem } from 'web3-utils';
import { Contract } from 'web3-eth-contract';
import { TransactionReceipt } from 'web3-eth';
import ContractOperation from '@services/contract-operations/contract-operation';
import ContractABI from '@services/contract-abis/generative-marketplace.json';
import { GENERATIVE_MARKETPLACE_CONTRACT } from '@constants/contract-address';
import { IMakeTokenOfferParams } from '@interfaces/contract-operations/make-token-offer';
import Web3 from 'web3';
import { ErrorMessage } from '@enums/error-message';

class MakeTokenOfferOperation extends ContractOperation<
  IMakeTokenOfferParams,
  TransactionReceipt
> {
  contract: Contract | null = null;
  contractAddress = GENERATIVE_MARKETPLACE_CONTRACT;

  async prepare(): Promise<void> {
    this.contract = await this.walletManager.getContract(
      this.contractAddress,
      ContractABI.abi as Array<AbiItem>
    );
  }

  async call(): Promise<TransactionReceipt> {
    if (!this.contract) {
      throw Error('Contract not found');
    }

    const { collectionAddress, tokenID, durationTime, erc20Token, price } =
      this.params;

    const walletAddress = await this.walletManager.connectedAddress();

    const data = await this.contract.methods
      .makeOffer(
        JSON.parse(
          JSON.stringify({
            _collectionContract: collectionAddress,
            _tokenId: Web3.utils.toHex(tokenID),
            _buyer: walletAddress,
            _price: Web3.utils.toWei(price),
            _erc20Token: erc20Token,
            _closed: false,
            _durationTime: durationTime,
          })
        )
      )
      .send({
        from: walletAddress,
        to: this.contractAddress,
        value: '0',
      });

    return data;
  }

  success(): string {
    return 'OK';
  }

  error(): string {
    return ErrorMessage.DEFAULT;
  }
}

export default MakeTokenOfferOperation;
