import { AbiItem } from 'web3-utils';
import { Contract } from 'web3-eth-contract';
import ContractOperation from '@services/contract-operations/contract-operation';
import ContractABI from '@services/contract-abis/erc20.json';
import { ErrorMessage } from '@enums/error-message';
import { IGetTokenBalanceParams } from '@interfaces/contract-operations/get-token-balance';

class GetTokenBalanceOperation extends ContractOperation<
  IGetTokenBalanceParams,
  number
> {
  contract: Contract | null = null;

  async prepare(): Promise<void> {
    this.contract = await this.walletManager.getContract(
      this.params.erc20TokenAddress,
      ContractABI.abi as Array<AbiItem>
    );
  }

  async call(): Promise<number> {
    if (!this.contract) {
      throw Error('Contract not found');
    }

    const walletAddress = await this.walletManager.connectedAddress();

    const data = await this.contract.methods.balanceOf(walletAddress).call();

    return data;
  }

  success(): string {
    return 'OK';
  }

  error(): string {
    return ErrorMessage.DEFAULT;
  }
}

export default GetTokenBalanceOperation;
