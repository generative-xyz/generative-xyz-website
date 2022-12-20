export interface IAATrackingConfig {
  clientSecret: string;
  debugMode: boolean;
}

export interface ITrackEventPayload {
  eventName: string;
  eventParams: Array<{
    key: string;
    value: unknown;
  }>;
}

export interface ITrackPageViewPayload {
  [key: string]: unknown;
}
