import { AbiItem } from 'web3-utils';
import { Contract } from 'web3-eth-contract';
import ContractOperation from '@services/contract-operations/contract-operation';
import ContractABI from '@services/contract-abis/parameter-control.json';
import { IGetParameterControlParams } from '@interfaces/contract-operations/get-parameter-control';

class GetParamControlOperation extends ContractOperation<
  IGetParameterControlParams,
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

    const { key } = this.params;

    const data = await this.contract.methods.getUInt256(key).call();

    return data;
  }

  success(): string {
    return 'OK';
  }

  error(): string {
    return 'Oops, banana!';
  }
}

export default GetParamControlOperation;
