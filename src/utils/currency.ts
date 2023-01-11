import Web3 from 'web3';
import { formatCurrency } from './format';

export const convertToETH = (value: string): string => {
  return `Ξ ${formatCurrency(Number(Web3.utils.fromWei(value, 'ether')))}`;
};

export const calculateFloorDifference = (
  floor: string,
  amount: string
): string => {
  if (floor === '0') return '-';
  const diff = (Number(amount) - Number(floor)) / Number(amount);
  if (diff === 0) {
    return '0%';
  } else if (diff < 0) {
    return `${(Math.abs(diff) * 100).toFixed(1)}% below`;
  } else {
    return `${(Math.abs(diff) * 100).toFixed(1)}% above`;
  }
};
