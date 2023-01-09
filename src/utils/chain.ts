import { NETWORK_CHAIN_ID } from '@constants/config';
import { EVM_CHAINS } from '@constants/evm-chains';
import { Chain } from '@interfaces/chain';

export const getChainName = (): string | null => {
  const chain = EVM_CHAINS.find(
    (item: Chain) => item.chainID === NETWORK_CHAIN_ID
  );
  if (!chain) {
    return null;
  }

  return chain.name;
};
export const getOpenseaAssetUrl = (): string | null => {
  const chain = EVM_CHAINS.find(
    (item: Chain) => item.chainID === NETWORK_CHAIN_ID
  );
  if (!chain) {
    return null;
  }

  return chain.openseaAssetUrl;
};

export const getScanUrl = (): string | null => {
  const chain = EVM_CHAINS.find(
    (item: Chain) => item.chainID === NETWORK_CHAIN_ID
  );
  if (!chain) {
    return null;
  }

  return chain.scanUrl;
};

export const getFaucetLink = (): string | null => {
  const chain = EVM_CHAINS.find(
    (item: Chain) => item.chainID === NETWORK_CHAIN_ID
  );
  if (!chain) {
    return null;
  }

  return chain.faucet;
};

export const isTestnet = (): boolean => {
  return NETWORK_CHAIN_ID !== 1;
};
