import { AbiItem } from 'web3-utils';
import { Contract } from 'web3-eth-contract';
import ContractOperation from '@services/contract-operations/contract-operation';
import ContractABI from '@services/contract-abis/parameter-control.json';
import { IGetParameterControlParams } from '@interfaces/contract-operations/get-parameter-control';
import { PARAM_CONTROL_CONTRACT } from '@constants/contract-address';
import { ErrorMessage } from '@enums/error-message';

class GetParamControlOperation extends ContractOperation<
  IGetParameterControlParams,
  number
> {
  contract: Contract | null = null;
  contractAddress: string = PARAM_CONTROL_CONTRACT;

  async prepare(): Promise<void> {
    this.contract = await this.walletManager.getContract(
      this.contractAddress,
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
    return ErrorMessage.DEFAULT;
  }
}

export default GetParamControlOperation;
