import { Category } from '@interfaces/category';
import { IPagingParams, IPagingResponse } from '@interfaces/paging';

export type IGetCategoryListParams = IPagingParams;

export interface IGetCategoryListResponse extends IPagingResponse {
  result: Array<Category>;
}
