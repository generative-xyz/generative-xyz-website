import { User } from '@interfaces/user';
import { IProjectDetail } from '@interfaces/api/project';

export type TokenAttribute = {
  trait_type: string;
  value: string;
};

export type Token = {
  name: string;
  description: string;
  image: string;
  animationUrl: string;
  attributes: Array<TokenAttribute>;
  genNFTAddr: string;
  owner: User;
  ownerAddress: string;
  project: IProjectDetail;
  mintedTime: string;
};
