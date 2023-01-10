import { AbiItem } from 'web3-utils';
import { Contract } from 'web3-eth-contract';
import { TransactionReceipt } from 'web3-eth';
import ContractOperation from '@services/contract-operations/contract-operation';
import ContractABI from '@services/contract-abis/generative-nft.json';
import { ErrorMessage } from '@enums/error-message';
import { ITransferTokenParams } from '@interfaces/contract-operations/transfer-token';

class TransferTokenOperation extends ContractOperation<
  ITransferTokenParams,
  TransactionReceipt
> {
  contract: Contract | null = null;

  async prepare(): Promise<void> {
    this.contract = await this.walletManager.getContract(
      this.params.collectionAddress,
      ContractABI.abi as Array<AbiItem>
    );
  }

  async call(): Promise<TransactionReceipt> {
    if (!this.contract) {
      throw Error('Contract not found');
    }

    const { collectionAddress, toAddress, tokenID } = this.params;

    const walletAddress = await this.walletManager.connectedAddress();

    const data = await this.contract.methods
      .safeTransferFrom(
        walletAddress, // From
        toAddress, // To
        tokenID // Token ID
      )
      .send({
        from: walletAddress,
        to: collectionAddress,
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

export default TransferTokenOperation;
