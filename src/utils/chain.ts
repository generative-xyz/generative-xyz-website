import { NETWORK_CHAIN_ID } from '@constants/config';
import { EVM_CHAINS } from '@constants/evm-chains';
import { Chain } from '@interfaces/chain';

export const getOpenseaAssetUrl = (): string | null => {
  const chain = EVM_CHAINS.find(
    (item: Chain) => item.chainID === NETWORK_CHAIN_ID
  );
  if (!chain) {
    return null;
  }

  return chain.openseaAssetUrl;
};
