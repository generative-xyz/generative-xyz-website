export type TokenAttribute = {
  trait_type: string;
  value: string;
};

export type Token = {
  name: string;
  description: string;
  image: string;
  animation_url: string;
  attributes: Array<TokenAttribute>;
  genNFTAddr: string;
  owner: string;
  creator: string;
  mintedOn: string;
};
