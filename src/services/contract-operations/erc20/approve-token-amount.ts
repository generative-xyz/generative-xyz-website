import { AbiItem } from 'web3-utils';
import { Contract } from 'web3-eth-contract';
import { TransactionReceipt } from 'web3-eth';
import ContractOperation from '@services/contract-operations/contract-operation';
import ContractABI from '@services/contract-abis/erc20.json';
import { IApproveTokenAmountParams } from '@interfaces/contract-operations/approve-token-amount';
import { ErrorMessage } from '@enums/error-message';
import { MAX_HEX_VALUE } from '@constants/contract-address';

class ApproveTokenAmountOperation extends ContractOperation<
  IApproveTokenAmountParams,
  TransactionReceipt
> {
  contract: Contract | null = null;

  async prepare(): Promise<void> {
    this.contract = await this.walletManager.getContract(
      this.params.contractAddress,
      ContractABI.abi as Array<AbiItem>
    );
  }

  async call(): Promise<TransactionReceipt> {
    if (!this.contract) {
      throw Error('Contract not found');
    }

    const { consumerAddress, contractAddress } = this.params;

    const walletAddress = await this.walletManager.connectedAddress();

    const data = await this.contract.methods
      .approve(consumerAddress, MAX_HEX_VALUE)
      .send({
        from: walletAddress,
        to: contractAddress,
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

export default ApproveTokenAmountOperation;
