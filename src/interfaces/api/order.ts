import { IShippingInfo } from '@containers/CheckoutModal';

export interface ICreateOrderResponse {
  status: number;
  data: {
    order_id: string;
    created_at: string;
    master_address: string;
    total: string;
  };
}

export type ICreateOrderPayload = IShippingInfo;
