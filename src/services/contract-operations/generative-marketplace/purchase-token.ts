import { AbiItem } from 'web3-utils';
import { Contract } from 'web3-eth-contract';
import { TransactionReceipt } from 'web3-eth';
import ContractOperation from '@services/contract-operations/contract-operation';
import ContractABI from '@services/contract-abis/generative-marketplace.json';
import { GENERATIVE_MARKETPLACE_CONTRACT } from '@constants/contract-address';
import { IPurchaseTokenParams } from '@interfaces/contract-operations/purchase-token';

class PurchaseTokenOperation extends ContractOperation<
  IPurchaseTokenParams,
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

    const { offerId, price } = this.params;

    const walletAddress = await this.walletManager.connectedAddress();

    const data = await this.contract.methods.purchaseToken(offerId).send({
      from: walletAddress,
      to: this.contractAddress,
      value: price,
    });

    return data;
  }

  success(): string {
    return 'OK';
  }

  error(): string {
    return 'Oops, banana!';
  }
}

export default PurchaseTokenOperation;
