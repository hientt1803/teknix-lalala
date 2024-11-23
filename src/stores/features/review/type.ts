interface Review {
   id: number;
   review_plus: string;
   review_minus: string;
   created: string; // ISO date string
   author: string;
   adults: number;
   children: number;
   room_name: string;
   nights: number;
   images: string[]; // Array of image URLs
   detailed: DetailedRatings;
   traveller_type?: string; // "unspecified" or other values
   trip_type: string;
   rating: number;
}

export interface DetailedRatings {
   cleanness: number;
   location: number;
   price: number;
   services: number;
   room?: number;
   meal?: number;
   wifi?: number;
   hygiene?: number;
}

export interface IStayReivew {
   id: string;
   rating: number;
   detailed_ratings: DetailedRatings;
   reviews: Review[];
}
