import { IUSerAddress } from './user.model';

export interface IOrderImage {
  thumbnail: string;
  url: string;
}

export interface IOrderItem {
  amount: number;
  id: number;
  images: IOrderImage[];
  product: string;
  quantity: number;
}

export interface IOrder {
  address: IUSerAddress;
  cost: string;
  created_at: string;
  deleted_at: string;
  id: number;
  items: IOrderItem[];
  quantity: number;
  status: number;
  user: any;
}
