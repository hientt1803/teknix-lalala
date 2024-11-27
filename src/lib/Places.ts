import {LatLngExpression} from "leaflet";

import {Category} from "./MarkerCategories";

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
        id: "1",
        position: [52.051977014580125, 8.531494086782844],
        category: Category.HOTEL,
        title: "Some Title 1",
        image: [
            "https://images.pexels.com/photos/28704263/pexels-photo-28704263/free-photo-of-outdoor-book-market-at-saint-sulpice-paris.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
        ],
        address: "Another Adress 123, Test City",
        price: 50000,
        star: 4,
    },
    {
        id: "2",
        position: [52.02022592597971, 8.530780645829076],
        category: Category.HOTEL,
        title: "Some Title 2",
        image: [
            "https://images.pexels.com/photos/28704263/pexels-photo-28704263/free-photo-of-outdoor-book-market-at-saint-sulpice-paris.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
        ],
        address: "Some Adress 56, Test City",
        price: 50000,
        star: 4,
    },
    {
        id: "3",
        position: [52.022468698328275, 8.50583167463131],
        category: Category.HOTEL,
        title: "Some Title 3",

        image: [
            "https://images.pexels.com/photos/28704263/pexels-photo-28704263/free-photo-of-outdoor-book-market-at-saint-sulpice-paris.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
        ],
        address: "Another Adress 789, Test City",
        price: 50000,
        star: 4,
    },
    {
        id: "4",
        position: [51.99739839338658, 8.59544834428681],
        category: Category.HOTEL,
        title: "Some Title 4",

        image: [
            "https://images.pexels.com/photos/28704263/pexels-photo-28704263/free-photo-of-outdoor-book-market-at-saint-sulpice-paris.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
        ],
        address: "Another Adress 101112, Test City",
        price: 50000,
        star: 4,
    },
    {
        id: "5",
        position: [52.01219274931668, 8.599568218099812],
        category: Category.HOTEL,
        title: "Some Title 5",

        image: [
            "https://images.pexels.com/photos/28704263/pexels-photo-28704263/free-photo-of-outdoor-book-market-at-saint-sulpice-paris.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
        ],
        address: "Another Adress 131415, Test City",
        price: 50000,
        star: 4,
    },
    {
        id: "6",
        position: [52.0119, 8.563032],
        category: Category.HOTEL,
        title: "Some Title 6",

        image: [
            "https://images.pexels.com/photos/28704263/pexels-photo-28704263/free-photo-of-outdoor-book-market-at-saint-sulpice-paris.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
        ],
        address: "Another Adress 161718, Test City",
        price: 50000,
        star: 4,
    },
    {
        id: "7",
        position: [52.02022192326546, 8.583775371420124],
        category: Category.HOTEL,
        title: "Some Title 7",

        image: [
            "https://images.pexels.com/photos/28704263/pexels-photo-28704263/free-photo-of-outdoor-book-market-at-saint-sulpice-paris.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
        ],
        address: "Another Adress 192021, Test City",
        price: 50000,
        star: 4,
    },
    {
        id: "8",
        position: [51.99494772863581, 8.560429425686753],
        category: Category.HOTEL,
        title: "Some Title 8",

        image: [
            "https://images.pexels.com/photos/28704263/pexels-photo-28704263/free-photo-of-outdoor-book-market-at-saint-sulpice-paris.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
        ],
        address: "Another Adress 222324, Test City",
        price: 50000,
        star: 4,
    },
    {
        id: "9",
        position: [51.99274772863586, 8.560429425686753],
        category: Category.HOTEL,
        title: "Some Title 9",

        image: [
            "https://images.pexels.com/photos/28704263/pexels-photo-28704263/free-photo-of-outdoor-book-market-at-saint-sulpice-paris.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load",
        ],
        address: "Another Adress 252627, Test City",
        price: 50000,
        star: 4,
    },
];
