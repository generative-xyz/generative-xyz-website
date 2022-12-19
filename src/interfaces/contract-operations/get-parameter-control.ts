import { ParameterControlKey } from '@enums/parameter-key';
import { ContractOperationRequiredParams } from '@interfaces/contract';

export interface IGetParameterControlParams
  extends ContractOperationRequiredParams {
  key: ParameterControlKey;
}
