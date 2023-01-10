export interface IPagingResponse {
  page: number;
  pageSize: number;
  total: number;
}

export interface IPagingParams {
  limit?: number;
  page?: number;
}
