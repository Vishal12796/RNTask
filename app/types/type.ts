export interface RequestOTP {
  contact_number: string;
  country_code: string;
}

export interface RequestLoginParams {
  contact_number: string;
  country_code: string;
  device_token: number;
  device_type: string;
  otp: number;
}

export interface UserDetails {
  contact_number: number;
  country_code: string;
  email: string;
  first_name: string;
  image: string;
  last_name: string;
  pin: string;
  type: string;
  user_id: number;
  key?: string;
}

export interface ListMain {
  id: number;
  isExpanded: boolean;
  catTitle: string;
  catSub: string;
  image: string;
  subcategory: ListSubData[];
}

export interface ListSubData {
  id: number;
  title: string;
  desc: string;
  image: string;
}
