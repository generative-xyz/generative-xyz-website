import { APIVersion } from '@enums/api-version';

export type RequestConfig = Omit<RequestInit, 'method' | 'body'> & {
  externalResource?: boolean;
  version?: APIVersion;
};
