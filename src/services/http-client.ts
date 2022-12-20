import { APIVersion } from '@enums/api-version';
import { HttpMethod } from '@enums/http-method';
import { RequestConfig } from '@interfaces/api/http-method';
import { getAccessToken } from '@utils/auth';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? '';

const getRequestEndpoint = (
  url: string,
  externalResource = false,
  version = APIVersion.V1
): string => {
  if (!externalResource) {
    return `${API_BASE_URL}${version}${url}`;
  }

  return url;
};

const handleResponse = async <T>(response: Response): Promise<T> => {
  return response.text().then((text: string) => {
    const data = text && JSON.parse(text);

    if (!response.ok) {
      const error = (data && data.message) || response.statusText;
      return Promise.reject(error);
    }

    return data as T;
  });
};

const getHeader = (configHeader?: HeadersInit): HeadersInit => {
  const defaultHeader = configHeader ?? {};

  const headers: Record<string, string> = {
    ...Object(defaultHeader),
    Accept: 'application/json',
    'Content-Type': 'application/json',
  };

  const accessToken = getAccessToken();
  if (accessToken) {
    headers['Authentication'] = `Bearer ${accessToken}`;
  }

  return headers;
};

export const get = async <R>(
  url: string,
  config?: RequestConfig
): Promise<R> => {
  const requestOptions = {
    method: HttpMethod.GET,
    ...config,
    headers: getHeader(config?.headers),
  } as RequestInit;

  const requestUrl = getRequestEndpoint(
    url,
    !!config?.externalResource,
    config?.version
  );
  const response = await fetch(requestUrl, requestOptions);
  return handleResponse(response);
};

export const post = async <P, R>(
  url: string,
  body: P,
  config?: RequestConfig
): Promise<R> => {
  const requestOptions = {
    method: HttpMethod.POST,
    ...config,
    headers: getHeader(config?.headers),
    body: JSON.stringify(body),
  } as RequestInit;

  const requestUrl = getRequestEndpoint(
    url,
    !!config?.externalResource,
    config?.version
  );
  const response = await fetch(requestUrl, requestOptions);
  return handleResponse(response);
};

export const put = async <P, R>(
  url: string,
  body: P,
  config?: RequestConfig
): Promise<R> => {
  const requestOptions = {
    method: HttpMethod.PUT,
    ...config,
    headers: getHeader(config?.headers),
    body: JSON.stringify(body),
  } as RequestInit;

  const requestUrl = getRequestEndpoint(
    url,
    !!config?.externalResource,
    config?.version
  );
  const response = await fetch(requestUrl, requestOptions);
  return handleResponse(response);
};

export const del = async <R>(
  url: string,
  config?: RequestConfig
): Promise<R> => {
  const requestOptions = {
    method: HttpMethod.DELETE,
    ...config,
    headers: getHeader(config?.headers),
  } as RequestInit;

  const requestUrl = getRequestEndpoint(
    url,
    !!config?.externalResource,
    config?.version
  );
  const response = await fetch(requestUrl, requestOptions);
  return handleResponse(response);
};
