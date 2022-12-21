import { ContractOperationRequiredParams } from '@interfaces/contract';

export interface IMintGenerativeNFTParams
  extends ContractOperationRequiredParams {
  projectAddress: string;
  mintFee: number;
}
