import { AbiItem } from 'web3-utils';
import { Contract } from 'web3-eth-contract';
import { TransactionReceipt } from 'web3-eth';
import ContractOperation from '@services/contract-operations/contract-operation';
import ContractABI from '@services/contract-abis/generative-marketplace.json';
import { IListingTokenParams } from '@interfaces/contract-operations/list-to-sale-token';
import {
  GENERATIVE_MARKETPLACE_CONTRACT,
  ROOT_ADDRESS,
} from '@constants/contract-address';
import Web3 from 'web3';
import { ErrorMessage } from '@enums/error-message';

class ListingToSaleTokenOperation extends ContractOperation<
  IListingTokenParams,
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

    const {
      collectionAddress, // Collection contract address, example generative project, generative token...
      tokenID, // Token ID
      price, // In ETH  string
      erc20Token,
      durationTime,
    } = this.params;

    const walletAddress = await this.walletManager.connectedAddress();

    const data = await this.contract.methods
      .listToken(
        JSON.parse(
          JSON.stringify({
            _collectionContract: collectionAddress,
            _tokenId: Web3.utils.toHex(tokenID),
            _price: Web3.utils.toWei(price),
            _erc20Token: erc20Token ?? ROOT_ADDRESS,
            _closed: false,
            _seller: walletAddress,
            _durationTime: durationTime,
          })
        )
      )
      .send({
        from: walletAddress,
        to: this.contractAddress,
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

export default ListingToSaleTokenOperation;
