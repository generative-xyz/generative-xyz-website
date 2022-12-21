import { ContractOperationRequiredParams } from '@interfaces/contract';

export interface IMintGenerativeProjectParams
  extends ContractOperationRequiredParams {
  maxSupply: number;
  limitSupply: number;
  mintPrice: string;
  name: string;
  creatorName: string;
  description: string;
  thumbnail: string;
  thirdPartyScripts: Array<string>;
  scripts: Array<string>;
  reservationList: Array<string>;
  mintFee: number;
  openMintUnixTimestamp?: number;
  tokenDescription?: string;
  styles?: string;
  royalty?: number;
  socialWeb?: string;
  socialTwitter?: string;
  socialDiscord?: string;
  socialMedium?: string;
  socialInstagram?: string;
  license?: string;
  mintTokenAddress?: string;
}
