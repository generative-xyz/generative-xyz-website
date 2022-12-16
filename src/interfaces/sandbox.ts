export type SandboxFiles = Record<string, { blob?: Blob; url: string }>;

export interface ISandboxRef {
  reloadIframe: () => void;
  getHtmlIframe: () => HTMLIFrameElement | null;
}

export type RawTokenAttributes = Record<string, string | number | boolean>;
