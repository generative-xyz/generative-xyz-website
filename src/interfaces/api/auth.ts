export interface IGenerativeNonceMessagePayload {
  address: string;
}

export interface IGenerativeNonceMessageResponse {
  message: string;
}

export interface IVerifyNonceMessagePayload {
  address: string;
  signature: string;
}

export interface IVerifyNonceMessageResponse {
  accessToken: string;
  refreshToken: string;
}
