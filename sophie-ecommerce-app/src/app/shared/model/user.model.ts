export interface IUSer {
  id?: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
}

export interface IUserReg {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  password: string;
}

export interface IUSerAddress {
  id: number;
  first_name: string;
  last_name: string;
  state_id: number;
  lga_id: number;
  city: string;
  address: string;
  phone: string;
}
