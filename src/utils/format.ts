export const formatContractAddress = (contractAddress: string): string => {
  if (contractAddress.length < 14) return contractAddress;
  return `${contractAddress.substring(0, 7)}...${contractAddress.substring(
    contractAddress.length - 7,
    contractAddress.length
  )}`;
};
