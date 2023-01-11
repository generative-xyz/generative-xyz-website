import { AbiItem } from 'web3-utils';
import { Contract } from 'web3-eth-contract';
import ContractOperation from '@services/contract-operations/contract-operation';
import ContractABI from '@services/contract-abis/erc20.json';
import { IApproveTokenAmountParams } from '@interfaces/contract-operations/approve-token-amount';
import { ErrorMessage } from '@enums/error-message';

class GetAllowanceAmountOperation extends ContractOperation<
  IApproveTokenAmountParams,
  number
> {
  contract: Contract | null = null;

  async prepare(): Promise<void> {
    this.contract = await this.walletManager.getContract(
      this.params.contractAddress,
      ContractABI.abi as Array<AbiItem>
    );
  }

  async call(): Promise<number> {
    if (!this.contract) {
      throw Error('Contract not found');
    }

    const { consumerAddress } = this.params;

    const walletAddress = await this.walletManager.connectedAddress();

    const data = await this.contract.methods
      .allowance(walletAddress, consumerAddress)
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

export default GetAllowanceAmountOperation;
