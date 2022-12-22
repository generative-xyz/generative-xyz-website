export type StepProps = {
  item: {
    id: number;
    label: string;
  };
};

export interface IFormValue {
  maxSupply: number;
  mintPrice: string;
  name: string;
  description: string;
  thirdPartyScripts: Array<string>;
  tokenDescription: string;
  royalty: number;
  socialWeb: string;
  socialTwitter: string;
  socialDiscord: string;
  socialMedium: string;
  socialInstagram: string;
  license: string;
  hashtag: string;
}
