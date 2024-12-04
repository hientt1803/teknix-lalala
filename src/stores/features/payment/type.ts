export interface IPaymentMethod {
  id: string;
  label: string;
  name: string;
  description: string;
  logo: string;
  minium_amount: MiniumAmount[];
  maximum_amount: any[];
  currency: string[];
}

export interface MiniumAmount {
  amount: string;
  currency: string;
}

export interface IPaymentRequest {
  reservation_id: string;
  payment_method: string;
  currency: string;
}

export interface IPaymentResponse {
  id: string;
  user_created: string;
  date_created: string;
  user_updated: string;
  date_updated: string;
  hotel_id: string;
  room_id: string;
  checkin_date: string;
  checkout_date: string;
  num_guests: number;
  meta_data: MetaData;
  special_request: any;
  status: string;
  coupon_code: string;
  match_hash: string;
  payment_method: string;
  total_price: number;
  base_price: number;
  total_discount: number;
  rate_meta_data: RateMetaData;
  book_hash: string;
  is_expired: any;
  payment_id: string;
  payment_link: PaymentLink;
}

export interface MetaData {
  additional: Additional;
  arrival_time: string;
  booking_details: BookingDetails;
  is_main_guest: boolean;
  is_trip_booking: boolean;
}

export interface Additional {
  is_renting_car: boolean;
  is_taxi_booked: boolean;
  special_request: string;
}

export interface BookingDetails {
  country: string;
  email: string;
  first_name: string;
  last_name: string;
  paperless: boolean;
}

export interface RateMetaData {
  allotment: number;
  amenities_data: string[];
  any_residency: boolean;
  book_hash: string;
  daily_prices: string[];
  deposit: any;
  match_hash: string;
  meal: string;
  no_show: any;
  payment_options: PaymentOptions;
  rg_ext: RgExtension;
  room_data_trans: RoomDataTrans;
  room_name: string;
  room_name_info: any;
  sell_price_limits: any;
  serp_filters: string[];
}

export interface PaymentOptions {
  payment_types: PaymentType[];
}

export interface PaymentType {
  amount: string;
  by: any;
  cancellation_penalties: CancellationPenalties;
  commission_info: CommissionInfo2;
  currency_code: string;
  is_need_credit_card_data: boolean;
  is_need_cvc: boolean;
  perks: Perks;
  recommended_price: any;
  show_amount: string;
  show_currency_code: string;
  tax_data: TaxData;
  type: string;
  vat_data: VatData;
}

export interface CancellationPenalties {
  free_cancellation_before: any;
  policies: Policy[];
}

export interface Policy {
  amount_charge: string;
  amount_show: string;
  commission_info: CommissionInfo;
  end_at: any;
  start_at: any;
}

export interface CommissionInfo {
  charge: Charge;
  show: Show;
}

export interface Charge {
  amount_commission: string;
  amount_gross: string;
  amount_net: string;
}

export interface Show {
  amount_commission: string;
  amount_gross: string;
  amount_net: string;
}

export interface CommissionInfo2 {
  charge: Charge2;
  show: Show2;
}

export interface Charge2 {
  amount_commission: string;
  amount_gross: string;
  amount_net: string;
}

export interface Show2 {
  amount_commission: string;
  amount_gross: string;
  amount_net: string;
}

export interface Perks {}

export interface TaxData {
  taxes: Tax[];
}

export interface Tax {
  amount: string;
  currency_code: string;
  included_by_supplier: boolean;
  name: string;
}

export interface VatData {
  amount: string;
  applied: boolean;
  currency_code: string;
  included: boolean;
  value: string;
}

export interface RgExtension {
  balcony: number;
  bathroom: number;
  bedding: number;
  bedrooms: number;
  capacity: number;
  class: number;
  club: number;
  family: number;
  floor: number;
  quality: number;
  sex: number;
  view: number;
}

export interface RoomDataTrans {
  bathroom: any;
  bedding_type: string;
  main_name: string;
  main_room_type: string;
  misc_room_type: string;
}

export interface PaymentLink {
  payment_link: PaymentLink2;
  self: Self;
}

export interface PaymentLink2 {
  href: string;
  type: string;
}

export interface Self {
  href: string;
  type: string;
}
