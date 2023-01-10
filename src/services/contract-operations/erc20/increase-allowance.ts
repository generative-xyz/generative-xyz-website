import { AbiItem } from 'web3-utils';
import { Contract } from 'web3-eth-contract';
import { TransactionReceipt } from 'web3-eth';
import ContractOperation from '@services/contract-operations/contract-operation';
import ContractABI from '@services/contract-abis/erc20.json';
import { IIncreaseAllowanceParams } from '@interfaces/contract-operations/increase-allowance';
import Web3 from 'web3';

class IncreaseAllowanceOperation extends ContractOperation<
  IIncreaseAllowanceParams,
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

    const { consumerAddress, amount, contractAddress } = this.params;

    const walletAddress = await this.walletManager.connectedAddress();

    const data = await this.contract.methods
      .increaseAllowance(consumerAddress, Web3.utils.toWei(amount))
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
    return 'Oops, banana!';
  }
}

export default IncreaseAllowanceOperation;
