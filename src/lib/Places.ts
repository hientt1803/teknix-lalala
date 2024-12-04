import { LatLngExpression } from 'leaflet';

import { Category } from './MarkerCategories';

export interface PlaceValues {
  id: string;
  position: LatLngExpression;
  image: string[];
  category: Category;
  title: string;
  address: string;
  price: number;
  star: number;
}
export type PlacesType = PlaceValues[];
export type PlacesClusterType = Record<string, PlaceValues[]>;

export const Places: PlacesType = [
  {
    id: '1',
    position: [52.051_977_014_580_125, 8.531_494_086_782_844],
    category: Category.HOTEL,
    title: 'Some Title 1',
    image: [
      'https://images.pexels.com/photos/28704263/pexels-photo-28704263/free-photo-of-outdoor-book-market-at-saint-sulpice-paris.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load',
    ],
    address: 'Another Adress 123, Test City',
    price: 50_000,
    star: 4,
  },
  {
    id: '2',
    position: [52.020_225_925_979_71, 8.530_780_645_829_076],
    category: Category.HOTEL,
    title: 'Some Title 2',
    image: [
      'https://images.pexels.com/photos/28704263/pexels-photo-28704263/free-photo-of-outdoor-book-market-at-saint-sulpice-paris.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load',
    ],
    address: 'Some Adress 56, Test City',
    price: 50_000,
    star: 4,
  },
  {
    id: '3',
    position: [52.022_468_698_328_275, 8.505_831_674_631_31],
    category: Category.HOTEL,
    title: 'Some Title 3',

    image: [
      'https://images.pexels.com/photos/28704263/pexels-photo-28704263/free-photo-of-outdoor-book-market-at-saint-sulpice-paris.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load',
    ],
    address: 'Another Adress 789, Test City',
    price: 50_000,
    star: 4,
  },
  {
    id: '4',
    position: [51.997_398_393_386_58, 8.595_448_344_286_81],
    category: Category.HOTEL,
    title: 'Some Title 4',

    image: [
      'https://images.pexels.com/photos/28704263/pexels-photo-28704263/free-photo-of-outdoor-book-market-at-saint-sulpice-paris.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load',
    ],
    address: 'Another Adress 101112, Test City',
    price: 50_000,
    star: 4,
  },
  {
    id: '5',
    position: [52.012_192_749_316_68, 8.599_568_218_099_812],
    category: Category.HOTEL,
    title: 'Some Title 5',

    image: [
      'https://images.pexels.com/photos/28704263/pexels-photo-28704263/free-photo-of-outdoor-book-market-at-saint-sulpice-paris.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load',
    ],
    address: 'Another Adress 131415, Test City',
    price: 50_000,
    star: 4,
  },
  {
    id: '6',
    position: [52.0119, 8.563_032],
    category: Category.HOTEL,
    title: 'Some Title 6',

    image: [
      'https://images.pexels.com/photos/28704263/pexels-photo-28704263/free-photo-of-outdoor-book-market-at-saint-sulpice-paris.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load',
    ],
    address: 'Another Adress 161718, Test City',
    price: 50_000,
    star: 4,
  },
  {
    id: '7',
    position: [52.020_221_923_265_46, 8.583_775_371_420_124],
    category: Category.HOTEL,
    title: 'Some Title 7',

    image: [
      'https://images.pexels.com/photos/28704263/pexels-photo-28704263/free-photo-of-outdoor-book-market-at-saint-sulpice-paris.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load',
    ],
    address: 'Another Adress 192021, Test City',
    price: 50_000,
    star: 4,
  },
  {
    id: '8',
    position: [51.994_947_728_635_81, 8.560_429_425_686_753],
    category: Category.HOTEL,
    title: 'Some Title 8',

    image: [
      'https://images.pexels.com/photos/28704263/pexels-photo-28704263/free-photo-of-outdoor-book-market-at-saint-sulpice-paris.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load',
    ],
    address: 'Another Adress 222324, Test City',
    price: 50_000,
    star: 4,
  },
  {
    id: '9',
    position: [51.992_747_728_635_86, 8.560_429_425_686_753],
    category: Category.HOTEL,
    title: 'Some Title 9',

    image: [
      'https://images.pexels.com/photos/28704263/pexels-photo-28704263/free-photo-of-outdoor-book-market-at-saint-sulpice-paris.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load',
    ],
    address: 'Another Adress 252627, Test City',
    price: 50_000,
    star: 4,
  },
];
