// interface Review {
//   id: number;
//   review_plus: string;
//   review_minus: string;
//   created: string; // ISO date string
//   author: string;
//   adults: number;
//   children: number;
//   room_name: string;
//   nights: number;
//   images: string[]; // Array of image URLs
//   detailed: DetailedRatings;
//   traveller_type?: string; // "unspecified" or other values
//   trip_type: string;
//   rating: number;
// }

// export interface DetailedRatings {
//   cleanness: number;
//   location: number;
//   price: number;
//   services: number;
//   room?: number;
//   meal?: number;
//   wifi?: number;
//   hygiene?: number;
// }

// export interface IStayReivew {
//   id: string;
//   rating: number;
//   detailed_ratings: DetailedRatings;
//   reviews: Review[];
// }

export interface IStayReivew {
  data: Review[];
  total: Total;
}

export interface Review {
  id: number;
  review_plus?: string;
  review_minus?: string;
  created: string;
  author: string;
  adults: number;
  children: number;
  room_name: string;
  nights?: number;
  images: any[];
  detailed: DetailedRatings;
  traveller_type: string;
  trip_type: string;
  rating: number;
  hotel_id: string;
}

export interface DetailedRatings {
  cleanness: number;
  location: number;
  price: number;
  services: number;
  room?: number;
  meal?: number;
  wifi: string;
  hygiene: string;
}

export interface Total {
  value: number;
  relation: string;
}
