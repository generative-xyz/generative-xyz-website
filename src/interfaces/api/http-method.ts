export type RequestConfig = Omit<RequestInit, 'method' | 'body'> & {
  externalResource?: boolean;
};
