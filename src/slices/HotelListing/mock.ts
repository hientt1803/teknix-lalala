import { FilterType } from '@/features/hotel/filters/list-filter';

export const FILTER_MOCK: FilterType[] = [
    {
       sectionName: 'Hotel Type',
       filters: [
          { id: 1, name: 'All' },
          { id: 2, name: 'Hotel' },
          { id: 3, name: 'Apartment' },
          { id: 4, name: 'Resort' },
          { id: 5, name: 'Villa' },
          { id: 6, name: 'Lodge' },
          { id: 7, name: 'Guest House' },
          { id: 8, name: 'Cottage' },
          { id: 9, name: 'Beach Hut' },
          { id: 10, name: 'Farm house' },
       ],
    },
    {
       sectionName: 'Price range',
       filters: [
          { id: 1, name: 'Up to $500' },
          { id: 2, name: '$500 - $1000' },
          { id: 3, name: '$1000 - $1500' },
          { id: 4, name: '$1500 - $2000' },
          { id: 5, name: '$2000+' },
       ],
    },
    {
       sectionName: 'Popular Type',
       filters: [
          { id: 1, name: 'Free Breakfast Included' },
          { id: 2, name: 'Pay At Hotel Available' },
          { id: 3, name: 'Free Cancellation Available' },
       ],
    },
    {
       sectionName: 'Customer Rating',
       filters: [
          { id: 1, name: '3+' },
          { id: 2, name: '3.5+' },
          { id: 3, name: '4+' },
          { id: 4, name: '4.5+' },
       ],
    },
    {
       sectionName: 'Rating Star',
       filters: [
          { id: 1, name: '1' },
          { id: 2, name: '2' },
          { id: 3, name: '3' },
          { id: 4, name: '4' },
          { id: 5, name: '5' },
       ],
    },
    {
       sectionName: 'Amenities',
       filters: [
          { id: 1, name: 'All' },
          { id: 2, name: 'Air Conditioning' },
          { id: 3, name: 'Bar' },
          { id: 4, name: 'Bonfire' },
          { id: 5, name: 'Business Services' },
          { id: 6, name: 'Caretaker' },
          { id: 7, name: 'Dining' },
          { id: 8, name: 'Free Internet' },
          { id: 9, name: 'Hair nets' },
          { id: 10, name: 'Masks' },
       ],
    },
 ];