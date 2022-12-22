import { HttpMethod } from '@enums/http-method';
import { HttpResponse, RequestConfig } from '@interfaces/api/http-client';
import { getAccessToken } from '@utils/auth';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? '';

const getRequestEndpoint = (url: string, externalResource = false): string => {
  if (!externalResource) {
    return `${API_BASE_URL}${url}`;
  }

  return url;
};

const handleResponse = async <T>(response: Response): Promise<T> => {
  return response.text().then((text: string) => {
    const json: HttpResponse<T> = text && JSON.parse(text);
    const { data, status, error } = json;
    if (!response.ok || !status) {
      const errorMessage = (error && error.message) || response.statusText;
      return Promise.reject(errorMessage);
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
    headers['Authorization'] = `Bearer ${accessToken}`;
  }

  return headers;
};

const getRequestOptions = (
  method: HttpMethod,
  config?: RequestConfig
): RequestInit => {
  return {
    mode: 'cors',
    credentials: 'same-origin',
    ...config,
    method,
    headers: getHeader(config?.headers),
  };
};

export const get = async <R>(
  url: string,
  config?: RequestConfig
): Promise<R> => {
  const requestOptions: RequestInit = getRequestOptions(HttpMethod.GET, config);
  const requestUrl = getRequestEndpoint(url, !!config?.externalResource);
  const response = await fetch(requestUrl, requestOptions);
  return handleResponse(response);
};

export const post = async <P, R>(
  url: string,
  body: P,
  config?: RequestConfig
): Promise<R> => {
  const requestOptions: RequestInit = {
    ...getRequestOptions(HttpMethod.POST, config),
    body: JSON.stringify(body),
  };
  const requestUrl = getRequestEndpoint(url, !!config?.externalResource);
  const response = await fetch(requestUrl, requestOptions);
  return handleResponse(response);
};

export const put = async <P, R>(
  url: string,
  body: P,
  config?: RequestConfig
): Promise<R> => {
  const requestOptions: RequestInit = {
    ...getRequestOptions(HttpMethod.PUT, config),
    body: JSON.stringify(body),
  };
  const requestUrl = getRequestEndpoint(url, !!config?.externalResource);
  const response = await fetch(requestUrl, requestOptions);
  return handleResponse(response);
};

export const del = async <R>(
  url: string,
  config?: RequestConfig
): Promise<R> => {
  const requestOptions: RequestInit = getRequestOptions(
    HttpMethod.POST,
    config
  );
  const requestUrl = getRequestEndpoint(url, !!config?.externalResource);
  const response = await fetch(requestUrl, requestOptions);
  return handleResponse(response);
};
