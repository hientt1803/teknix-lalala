import { RateMetaData } from '../reservation';

export interface ISearchLocationQuery {
   query: string;
   language: string;
}

export interface IHotelSearchLocation {
   id: string;
   name: string;
   region_id: number;
}

export interface IRegionsSearchLocation {
   id: number;
   name: string;
   type: string;
   country_code: string;
}

export interface ISearchLocationByKeyWordResponse {
   hotels: IHotelSearchLocation[];
   regions: IRegionsSearchLocation[];
}

// Hotel search engine
export interface IHotelSearchEngineRequest {
   checkin: string;
   checkout: string;
   language: 'en';
   guests: {
      adults: number;
      children: number[] | any[];
   }[];
   id?: string;
   region_id?: number;
   currency: 'VND';
}

export interface IGetHotelByHotelIdRequest {
   checkin: string;
   checkout: string;
   language: 'en';
   guests: {
      adults: number;
      children: number[] | any[];
   }[];
   id: string;
   currency: 'VND';
   residency: string;
}

interface CommissionInfo {
   amount_gross: string;
   amount_net: string;
   amount_commission: string;
}

interface CancellationPolicy {
   start_at: string | null;
   end_at: string | null;
   amount_charge: string;
   amount_show: string;
   commission_info: {
      show: CommissionInfo;
      charge: CommissionInfo;
   };
}

interface CancellationPenalties {
   policies: CancellationPolicy[];
   free_cancellation_before: string | null;
}

interface TaxData {
   name: string;
   included_by_supplier: boolean;
   amount: string;
   currency_code: string;
}

interface VatData {
   included: boolean;
   applied: boolean;
   amount: string;
   currency_code: string;
   value: string;
}

interface PaymentType {
   amount: string;
   show_amount: string;
   currency_code: string;
   show_currency_code: string;
   by: string | null;
   is_need_credit_card_data: boolean;
   is_need_cvc: boolean;
   type: string;
   vat_data: VatData;
   tax_data: {
      taxes: TaxData[];
   };
   perks: Record<string, any>;
   commission_info: {
      show: CommissionInfo;
      charge: CommissionInfo;
   };
   cancellation_penalties: CancellationPenalties;
   recommended_price: string | null;
}

interface PaymentOptions {
   payment_types: PaymentType[];
}

interface RoomRgExt {
   class: number;
   quality: number;
   sex: number;
   bathroom: number;
   bedding: number;
   family: number;
   capacity: number;
   club: number;
   bedrooms: number;
   balcony: number;
   view: number;
   floor: number;
}

interface RoomDataTrans {
   main_room_type: string;
   main_name: string;
   bathroom: string | null;
   bedding_type: string;
   misc_room_type: string | null;
}

export interface Rate extends RateMetaData {}

export interface IHotelDataHotels {
   hotel_id: string;
   rates: Rate[];
}

export interface IHotelDataMapHotels {
   images: string[];
   address: string;
   latitude: number;
   star_rating: number;
   name: string;
   id: string;
   longitude: number;
}

export interface IHotelSearchRegionResult {
   hotels: IHotelDataHotels[];
   ids: string[];
   map_hotels: IHotelDataMapHotels[];
}

export interface IReviews {
   id: string;
   rating: number;
   detailed_ratings: DetailedRatings;
   reviews: Review[];
}

export interface DetailedRatings {
   cleanness: number;
   location: number;
   price: number;
   services: number;
   room: number;
   meal: number;
   wifi: number;
   hygiene: any;
}

export interface Review {
   id: number;
   review_plus: string;
   review_minus: string;
   created: string;
   author: string;
   adults: number;
   children: number;
   room_name: string;
   nights: number;
   images: any[];
   detailed: Detailed;
   traveller_type: string;
   trip_type: string;
   rating: number;
}

export interface Detailed {
   cleanness: number;
   location: number;
   price: number;
   services: number;
   room: any;
   meal: any;
   wifi: string;
   hygiene: string;
}

// DETAIL
export interface IHotelReservation {
   latitude: number;
   payment_methods: string[];
   front_desk_time_start: string;
   images: string[];
   star_rating: number;
   facts: Facts;
   is_closed: boolean;
   is_gender_specification_required: boolean;
   metapolicy_extra_info: string;
   longitude: number;
   room_groups: RoomGroup[];
   semantic_version: number;
   postal_code: string;
   address: string;
   front_desk_time_end: string;
   phone: string;
   policy_struct: PolicyStruct[];
   region: Region;
   id: string;
   hotel_chain: string;
   kind: string;
   email: string;
   star_certificate: string;
   name: string;
   check_out_time: string;
   check_in_time: string;
   serp_filters: string[];
   description_struct: DescriptionStruct[];
   metapolicy_struct: MetapolicyStruct;
   amenity_groups: AmenityGroup[];
}

interface Facts {
   electricity: Electricity;
   year_built: number;
   year_renovated: number;
   floors_number: number;
   rooms_number: number;
}

interface Electricity {
   sockets: string[];
   frequency: number[];
   voltage: number[];
}

export interface RoomGroup {
   name_struct: NameStruct;
   name: string;
   room_amenities: string[];
   images: string[];
   room_group_id: number;
   rg_ext: RgExt;
}

interface NameStruct {
   bedding_type?: string;
   main_name: string;
   bathroom?: string;
}

export interface RgExt {
   floor: number;
   quality: number;
   sex: number;
   bedrooms: number;
   club: number;
   class: number;
   capacity: number;
   balcony: number;
   view: number;
   bedding: number;
   family: number;
   bathroom: number;
}

export interface PolicyStruct {
   paragraphs: string[];
   title: string;
}

interface Region {
   type: string;
   country_code: string;
   id: number;
   name: string;
   iata: string;
}

export interface DescriptionStruct {
   paragraphs: string[];
   title: string;
}

interface MetapolicyStruct {
   add_fee: AddFee[];
   cot: Cot[];
   children_meal: ChildrenMeal[];
   shuttle: Shuttle[];
   deposit: Deposit[];
   check_in_check_out: any[];
   extra_bed: ExtraBed[];
   meal: Meal[];
   parking: Parking[];
   internet: Internet[];
   children: Children[];
   no_show: NoShow;
   pets: Pet[];
   visa: Visa;
}

interface AddFee {
   price: string;
   fee_type: string;
   currency: string;
   price_unit: string;
}

interface Cot {
   price: string;
   inclusion: string;
   currency: any;
   amount: number;
   price_unit: string;
}

interface ChildrenMeal {
   inclusion: string;
   currency: string;
   age_end: number;
   price: string;
   meal_type: string;
   age_start: number;
}

interface Shuttle {
   price: string;
   inclusion: string;
   currency?: string;
   destination_type: string;
   shuttle_type: string;
}

interface Deposit {
   availability: string;
   currency: string;
   price_unit: string;
   pricing_method: string;
   price: string;
   payment_type: string;
   deposit_type: string;
}

interface ExtraBed {
   price: string;
   inclusion: string;
   currency: string;
   amount: number;
   price_unit: string;
}

interface Meal {
   price: string;
   inclusion: string;
   currency: string;
   meal_type: string;
}

interface Parking {
   price: string;
   inclusion: string;
   currency: string;
   price_unit: string;
   territory_type: string;
}

interface Internet {
   inclusion: string;
   currency?: string;
   price_unit: string;
   price: string;
   work_area: string;
   internet_type: string;
}

interface Children {
   extra_bed: string;
   price: string;
   age_start: number;
   age_end: number;
   currency?: string;
}

interface NoShow {
   availability: string;
   time: string;
   day_period: string;
}

interface Pet {
   price: string;
   inclusion: string;
   currency: string;
   price_unit: string;
   pets_type: string;
}

interface Visa {
   visa_support: string;
}

export interface AmenityGroup {
   amenities: string[];
   group_name: string;
}

// ROOM
export interface IActiveRoom {
   hotels: Hotel[];
   ids: string;
   map_hotels: MapHotel[];
}

export interface Hotel {
   id: string;
   rates: Rate[];
   bar_price_data: any;
}
export interface MapHotel {
   latitude: number;
   payment_methods: string[];
   front_desk_time_start: string;
   images: string[];
   star_rating: number;
   facts: Facts;
   is_closed: boolean;
   is_gender_specification_required: boolean;
   metapolicy_extra_info: string;
   longitude: number;
   room_groups: RoomGroup[];
   semantic_version: number;
   postal_code: string;
   address: string;
   front_desk_time_end: string;
   phone: string;
   policy_struct: PolicyStruct[];
   region: Region;
   id: string;
   hotel_chain: string;
   kind: string;
   email: string;
   star_certificate: string;
   name: string;
   check_out_time: string;
   check_in_time: string;
   serp_filters: string[];
   description_struct: DescriptionStruct[];
   metapolicy_struct: MetapolicyStruct;
   amenity_groups: AmenityGroup[];
}

export interface IReserveForm {
   hotel_id: string;
   room_id: string;
   checkin_date: string;
   checkout_date: string;
   book_hash: string;
   match_hash: string;
   num_guests: number;
   rate?: Rate | undefined;
   meta_data?: MetaData;
   coupon_code?: string;
}

export interface MetaData {
   is_trip_booking?: boolean;
   booking_details?: BookingDetails;
   additional?: any;
   arrival_time?: string;
   is_main_guest?: boolean;
}
export interface BookingDetails {
   first_name?: string;
   last_name?: string;
   email?: string;
   country?: string;
   paperless?: boolean;
   phone?: string;
}

//   HOTEL SLICE
// ************** Hotel slice **************
export interface IHotelSlice {
   listHotelSearch: {
      hotels: IHotelSearchLocation[];
      regions: IRegionsSearchLocation[];
   };
   hotels: IHotelSearchRegionResult | null;
   activeHotel: IActiveRoom | null;
   reserveForm: IReserveForm;
   isTriggerGlobal: boolean;
}

export interface IReserveSlice {
   userInfo: {
      firstName: string;
      lastName: string;
      email: string;
      country: string;
      phone: string;
      isFreePaperConfirm?: boolean;
      whoBooking?: boolean;
      traverForWork?: boolean;
      isRentingCar?: boolean;
      isBookTaxiOrShuttle?: boolean;
      specialRequest?: string;
   };
   hotelInfo: {
      id: number | string;
      name: string;
      location: {
         lat: number;
         lng: number;
      };
      checkInDate: string;
      checkOutDate: string;
      arrivalTime: string;
      totalPrice: number;
      isIncludeTaxesAndFee: boolean;
   };
   roomInfor: {
      id: number | string;
      name: string;
      price: number;
      bedQuantity: number;
      roomQuantity: number;
      isSmokingRoom: boolean;
      lengthOfStay: number;
      discount?: string;
      people?: {
         adults?: number;
         children?: number;
         pet?: boolean;
      };
   };
}

// GEO HOTEL
export interface IHotelSearchGeoResult extends IHotelSearchRegionResult {}

export interface IHotelSearchGeoEngineRequest extends IHotelSearchEngineRequest {
   longitude: number;
   latitude: number;
   radius: number;
}
