import { AbiItem } from 'web3-utils';
import { Contract } from 'web3-eth-contract';
import ContractOperation from '@services/contract-operations/contract-operation';
import ContractABI from '@services/contract-abis/generative-nft.json';
import { IIsApprovedForAllParams } from '@interfaces/contract-operations/is-approved-for-all';
import { ErrorMessage } from '@enums/error-message';

class IsApprrovedForAllOperation extends ContractOperation<
  IIsApprovedForAllParams,
  boolean
> {
  contract: Contract | null = null;

  async prepare(): Promise<void> {
    this.contract = await this.walletManager.getContract(
      this.params.collectionAddress,
      ContractABI.abi as Array<AbiItem>
    );
  }

  async call(): Promise<boolean> {
    if (!this.contract) {
      throw Error('Contract not found');
    }

    const { marketplaceAddress } = this.params;

    const walletAddress = await this.walletManager.connectedAddress();

    const data = await this.contract.methods
      .isApprovedForAll(
        walletAddress, // Owner wallet address
        marketplaceAddress // Marketplace address
      )
      .call();

    return data;
  }

  success(): string {
    return 'OK';
  }

  error(): string {
    return ErrorMessage.DEFAULT;
  }
}

export default IsApprrovedForAllOperation;
