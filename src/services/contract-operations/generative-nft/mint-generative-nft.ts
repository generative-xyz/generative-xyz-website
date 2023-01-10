import { AbiItem } from 'web3-utils';
import { Contract } from 'web3-eth-contract';
import { TransactionReceipt } from 'web3-eth';
import ContractOperation from '@services/contract-operations/contract-operation';
import ContractABI from '@services/contract-abis/generative-nft.json';
import { IMintGenerativeNFTParams } from '@interfaces/contract-operations/mint-generative-nft';
import { ErrorMessage } from '@enums/error-message';

class MintGenerativeNFTOperation extends ContractOperation<
  IMintGenerativeNFTParams,
  TransactionReceipt
> {
  contract: Contract | null = null;

  async prepare(): Promise<void> {
    this.contract = await this.walletManager.getContract(
      this.params.projectAddress,
      ContractABI.abi as Array<AbiItem>
    );
  }

  async call(): Promise<TransactionReceipt> {
    if (!this.contract) {
      throw Error('Contract not found');
    }

    const {
      projectAddress,
      mintFee, // In ETH Wei string
    } = this.params;

    const walletAddress = await this.walletManager.connectedAddress();

    const data = await this.contract.methods.mint().send({
      from: walletAddress,
      to: projectAddress,
      value: mintFee,
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

export default MintGenerativeNFTOperation;
