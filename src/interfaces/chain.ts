export type Chain = {
  name: string;
  shortName: string;
  chainID: number;
  testnet: boolean;
  currency: string;
  scanUrl: string;
  rpcUrl: string;
  openseaAssetUrl: string;
  iconUrl: string;
  faucet: string;
};

export interface IExplore {
  name: string;
  standard: string;
  url: string;
}

export interface INativeCurrency {
  decimals: number;
  name: string;
  symbol: string;
}

export interface IEns {
  registry: string;
}
export interface IResourceChain {
  name: string;
  title?: string;
  chain: string;
  icon: string;
  rpc: string[];
  faucets: string[];
  nativeCurrency: INativeCurrency;
  infoURL: string;
  shortName: string;
  chainId: number;
  networkId: number;
  slip44: number;
  ens: IEns;
  explorers: IExplore[];
}
