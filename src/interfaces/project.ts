export type ProjectSocial = {
  Web: string;
  Twitter: string;
  Discord: string;
  Medium: string;
  Instagram: string;
};

export type Project = {
  id: string;
  maxSupply: number;
  limit: number;
  mintPrice: string;
  mintPriceAddr: string;
  name: string;
  creator: string;
  creatorAddr: string;
  license: string;
  desc: string;
  image: string;
  scriptType: string[];
  social: ProjectSocial;
  scripts: string[];
  styles: string;
  completeTime: number;
  genNFTAddr: string;
  itemDesc: string;
  status: boolean;
  nftTokenURI: string;
  projectURI: string;
  royalty?: number;
  tokenID: string;
  mintingInfo: {
    index: number;
    indexReserve: number;
  };
};
