import { AbiItem } from 'web3-utils';
import { Contract } from 'web3-eth-contract';
import { TransactionReceipt } from 'web3-eth';
import dayjs from 'dayjs';
import ContractOperation from '@services/contract-operations/contract-operation';
import ContractABI from '@services/contract-abis/generative-project.json';
import { IMintGenerativeProjectParams } from '@interfaces/contract-operations/mint-generative-project';
import {
  GENERATIVE_PROJECT_CONTRACT,
  ROOT_ADDRESS,
} from '@constants/contract-address';
import { ErrorMessage } from '@enums/error-message';

class MintGenerativeProjectOperation extends ContractOperation<
  IMintGenerativeProjectParams,
  TransactionReceipt
> {
  contract: Contract | null = null;
  contractAddress: string = GENERATIVE_PROJECT_CONTRACT;

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
      maxSupply,
      limitSupply,
      mintPrice,
      mintTokenAddress = ROOT_ADDRESS,
      name,
      creatorName,
      license = 'MIT',
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
    } = this.params;

    const walletAddress = await this.walletManager.connectedAddress();

    // Transform params's shape
    const projectPayload = {
      _maxSupply: maxSupply,
      _limit: limitSupply,
      _mintPrice: this.walletManager
        .getWeb3Provider()
        .utils.toHex(
          this.walletManager.getWeb3Provider().utils.toWei(mintPrice, 'ether')
        ),
      _mintPriceAddr: mintTokenAddress,
      _name: name,
      _creator: creatorName || walletAddress,
      _creatorAddr: walletAddress,
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
      _scriptType: JSON.parse(JSON.stringify(thirdPartyScripts)),
      _scripts: scripts,
      _styles: styles,
      _completeTime: 0,
      _genNFTAddr: ROOT_ADDRESS,
      _itemDesc: tokenDescription,
      _reserves: reservationList,
      _royalty: royalty,
    };

    const data = await this.contract.methods
      .mint(
        JSON.parse(JSON.stringify(projectPayload)),
        false,
        openMintUnixTimestamp
      )
      .send({
        from: walletAddress,
        to: this.contractAddress,
        value: mintFee,
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

export default MintGenerativeProjectOperation;
