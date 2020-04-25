export interface IOrder {
  address_id: number;
  amount: string;
  created_at: string;
  deleted_at: string;
  id: number;
  products: any[];
  quantity: number;
  status: number;
  user_id: number;
}
