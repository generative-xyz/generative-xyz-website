import { TransactionReceipt } from 'web3-core';
import { AbiItem } from 'web3-utils';
import { Contract } from 'web3-eth-contract';
import ContractOperation from '@services/contract-operations/contract-operation';
import { IMintGenerativeTokenParams } from '@interfaces/contract-operations/mint-generative-token';
import { GENERATIVE_CONTRACT } from '@constants/contract-address';
import ContractABI from '@services/contract-abis/erc20.json';

// WARNING - This file is just example code, please don't use it
class MintGenerativeTokenOperation extends ContractOperation<IMintGenerativeTokenParams> {
  contract: Contract | null = null;

  async prepare(): Promise<void> {
    this.contract = await this.walletManager.getContract(
      GENERATIVE_CONTRACT,
      ContractABI.abi as Array<AbiItem>
    );
  }

  async call(): Promise<TransactionReceipt> {
    if (!this.contract) {
      throw Error('Contract not found');
    }

    const { param1, param2, contractAddress, walletAddress, amount } =
      this.params;

    const transaction = await this.contract.methods
      .exampleCall(param1, param2)
      .send({
        to: contractAddress,
        from: walletAddress,
        value: BigInt(amount).toString(),
      });

    return transaction;
  }

  success(): string {
    return 'OK';
  }

  error(): string {
    return 'Oops, banana!';
  }
}

export default MintGenerativeTokenOperation;
