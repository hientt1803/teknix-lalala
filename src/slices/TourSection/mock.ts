import { Tour } from '@/components/custom/cards/tour-card';
export const filterDatas = [
   {
      name: 'Categories',
      items: [
         {
            name: 'All',
            value: 'all',
         },
         {
            name: 'Attractives',
            value: 'attractives',
         },
         {
            name: 'Active',
            value: 'active',
         },
         {
            name: 'Nature',
            value: 'nature',
         },
      ],
   },

   {
      name: 'Review/Rating',
      items: [
         {
            name: 'All',
            value: 'all',
         },
         {
            name: '4-5',
            value: '4-5',
         },
         {
            name: '5+',
            value: '5',
         },
      ],
   },
   {
      name: 'Price Range',
      items: [
         {
            name: 'Any',
            value: 'any',
         },
         {
            name: '$0 - $50',
            value: '0-50',
         },
         {
            name: '$51 - $100',
            value: '51-100',
         },
         {
            name: '$101 - $150',
            value: '101-150',
         },
         {
            name: '$151+',
            value: '151+',
         },
      ],
   },
];
export const mockTours: Tour[] = [
   {
      id: 1,
      name: 'California Sunset/Twilight Boat Cruise',
      location: 'Bali, Indonesia',
      imageUrl: [
         'https://images.pexels.com/photos/1371360/pexels-photo-1371360.jpeg?auto=compress&cs=tinysrgb&w=400',
         'https://images.pexels.com/photos/2161449/pexels-photo-2161449.jpeg?auto=compress&cs=tinysrgb&w=400',
         'https://images.pexels.com/photos/158398/niagara-falls-waterfall-horseshoe-158398.jpeg?auto=compress&cs=tinysrgb&w=400',
         'https://images.pexels.com/photos/2928024/pexels-photo-2928024.jpeg?auto=compress&cs=tinysrgb&w=400',
      ],
      pricePerPerson: 300,
      rating: {
         score: 4.5,
         reviews: 124,
      },
      promotion: {
         discount: 20,
         label: 'Summer Sale',
      },
      isAds: true,
      type: 'Adventure',
      amenities: [{ label: 'Guided Tour' }],
      isFavorite: false,
   },
   {
      id: 2,
      name: 'NYC: Food Tastings and Culture Tour',
      location: 'Paris, France',
      imageUrl: [
         'https://images.pexels.com/photos/27221292/pexels-photo-27221292/free-photo-of-motorboat-in-town-on-lake-como-in-italy.jpeg?auto=compress&cs=tinysrgb&w=400',
         'https://images.pexels.com/photos/2962595/pexels-photo-2962595.jpeg?auto=compress&cs=tinysrgb&w=400',
         'https://images.pexels.com/photos/7264035/pexels-photo-7264035.jpeg?auto=compress&cs=tinysrgb&w=400',
      ],
      pricePerPerson: 450,
      rating: {
         score: 4.8,
         reviews: 312,
      },
      promotion: {
         discount: 10,
         label: 'Limited Time',
      },
      isAds: false,
      type: 'City',
      amenities: [{ label: 'Evening Cruise' }],
      isFavorite: true,
   },
   {
      id: 3,
      name: 'Grand Canyon Horseshoe Bend 2 days',
      location: 'Maasai Mara, Kenya',
      imageUrl: [
         'https://images.pexels.com/photos/2611686/pexels-photo-2611686.jpeg?auto=compress&cs=tinysrgb&w=400',
         'https://images.pexels.com/photos/3389955/pexels-photo-3389955.jpeg?auto=compress&cs=tinysrgb&w=400',
         'https://images.pexels.com/photos/5405596/pexels-photo-5405596.jpeg?auto=compress&cs=tinysrgb&w=400',
         'https://images.pexels.com/photos/3922943/pexels-photo-3922943.jpeg?auto=compress&cs=tinysrgb&w=400',
      ],
      pricePerPerson: 700,
      rating: {
         score: 4.7,
         reviews: 256,
      },
      type: 'Wildlife',
      amenities: [{ label: 'Luxury Tents' }],
      isFavorite: false,
   },
   {
      id: 4,
      name: 'Tokyo Cherry Blossom Tour',
      location: 'Tokyo, Japan',
      imageUrl: [
         'https://images.pexels.com/photos/21369699/pexels-photo-21369699/free-photo-of-newspaper-on-a-table-in-a-ferry.jpeg?auto=compress&cs=tinysrgb&w=400',
         'https://images.pexels.com/photos/290316/pexels-photo-290316.jpeg?auto=compress&cs=tinysrgb&w=400',
         'https://images.pexels.com/photos/2082103/pexels-photo-2082103.jpeg?auto=compress&cs=tinysrgb&w=400',
      ],
      pricePerPerson: 500,
      rating: {
         score: 4.9,
         reviews: 400,
      },
      promotion: {
         discount: 15,
         label: 'Spring Deal',
      },
      isAds: true,
      type: 'Cultural',
      amenities: [{ label: 'Private Guide' }],
      isFavorite: true,
   },
   {
      id: 5,
      name: 'NYC: Food Tastings and Culture Tour',
      location: 'Swiss Alps, Switzerland',
      imageUrl: [
         'https://images.pexels.com/photos/2082103/pexels-photo-2082103.jpeg?auto=compress&cs=tinysrgb&w=400',
         'https://images.pexels.com/photos/290316/pexels-photo-290316.jpeg?auto=compress&cs=tinysrgb&w=400',
         'https://images.pexels.com/photos/21369699/pexels-photo-21369699/free-photo-of-newspaper-on-a-table-in-a-ferry.jpeg?auto=compress&cs=tinysrgb&w=400',
      ],
      pricePerPerson: 600,
      rating: {
         score: 4.6,
         reviews: 198,
      },
      type: 'Adventure',
      amenities: [{ label: 'Lift Pass' }],
      isFavorite: false,
   },
   {
      id: 6,
      name: 'Grand Canyon Horseshoe Bend 2 days',
      location: 'Swiss Alps, Switzerland',
      imageUrl: [
         'https://images.pexels.com/photos/2108813/pexels-photo-2108813.jpeg?auto=compress&cs=tinysrgb&w=400',
         'https://images.pexels.com/photos/290316/pexels-photo-290316.jpeg?auto=compress&cs=tinysrgb&w=400',
         'https://images.pexels.com/photos/21369699/pexels-photo-21369699/free-photo-of-newspaper-on-a-table-in-a-ferry.jpeg?auto=compress&cs=tinysrgb&w=400',
      ],
      pricePerPerson: 600,
      rating: {
         score: 4.6,
         reviews: 198,
      },
      type: 'Adventure',
      amenities: [{ label: 'Ski Equipment' }, { label: 'Lift Pass' }],
      isFavorite: false,
   },
];
