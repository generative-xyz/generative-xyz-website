import { User } from '@interfaces/user';
import { Project } from './project';

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
  project: Project;
  mintedTime: string;
  creatorProfile?: User;
  ownerAddr: string;
  creator: User;
};
