import { APIVersion } from '@enums/api-version';

export type RequestConfig = Omit<RequestInit, 'method' | 'body'> & {
  externalResource?: boolean;
  version?: APIVersion;
};

export type HttpResponse<T> = {
  data: T;
  error: {
    code: number;
    message: string;
  };
  status: boolean;
};
