export interface IGetProductResponse {
  status: number;
  data: {
    products: IProductList[];
    total: number;
  };
}

export interface IProductList {
  email_url: string;
  eth_price: string;
  id: string;
  name: string;
  options: string;
  slug: string;
}
