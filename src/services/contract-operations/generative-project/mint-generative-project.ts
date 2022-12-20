import { AbiItem } from 'web3-utils';
import { Contract } from 'web3-eth-contract';
import { TransactionReceipt } from 'web3-eth';
import dayjs from 'dayjs';
import ContractOperation from '@services/contract-operations/contract-operation';
import ContractABI from '@services/contract-abis/generative-project.json';
import { IMintGenerativeProjectParams } from '@interfaces/contract-operations/mint-generative-project';
import { ROOT_ADDRESS } from '@constants/contract-address';

class MintGenerativeProjectOperation extends ContractOperation<
  IMintGenerativeProjectParams,
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

    const {
      maxSupply,
      limitSupply,
      mintPrice,
      mintTokenAddress = ROOT_ADDRESS,
      name,
      creatorName,
      creatorAddress,
      license = '',
      description,
      thumbnail,
      socialWeb = '',
      socialTwitter = '',
      socialDiscord = '',
      socialMedium = '',
      socialInstagram = '',
      thirdPartyScripts = [],
      scripts,
      styles = '',
      tokenDescription = '',
      reservationList = [],
      openMintUnixTimestamp = dayjs().unix(),
      royalty = 100, // 1%
      mintFee, // In ETH Wei
      fromWalletAddress,
      contractAddress,
    } = this.params;

    // Transform params's shape
    const projectPayload = {
      _maxSupply: maxSupply,
      _limit: limitSupply,
      _mintPrice: this.walletManager.getWeb3Provider().utils.toWei(mintPrice),
      _mintPriceAddr: mintTokenAddress,
      _name: name,
      _creator: creatorName,
      _creatorAddr: creatorAddress,
      _license: license,
      _desc: description,
      _image: thumbnail,
      _social: JSON.parse(
        JSON.stringify({
          _web: socialWeb,
          _twitter: socialTwitter,
          _discord: socialDiscord,
          _medium: socialMedium,
          _instagram: socialInstagram,
        })
      ),
      _scriptType: thirdPartyScripts,
      _scripts: scripts,
      _styles: styles,
      _completeTime: 0,
      _genNFTAddr: ROOT_ADDRESS,
      _itemDesc: tokenDescription,
    };

    const data = await this.contract.methods
      .mint(
        JSON.stringify(projectPayload),
        reservationList,
        false,
        openMintUnixTimestamp,
        royalty
      )
      .send({
        from: fromWalletAddress,
        to: contractAddress,
        value: mintFee,
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

export default MintGenerativeProjectOperation;
