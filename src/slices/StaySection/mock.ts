export interface Property {
    id: number;
    name: string;
    location: string;
    imageUrl: string[];
    beds: number;
    pricePerNight: number;
    rating: {
        score: number;
        reviews: number;
    };
    promotion?: {
        discount: number;
        label: string;
    };
    isAds?: boolean;
    type: string;
    isFavorite: boolean;
}

export const propertyList: Property[] = [
    {
        id: 1,
        name: "Best Western Cedars Hotel",
        location: "1 Anzinger Court",
        imageUrl: [
            "https://images.pexels.com/photos/28161375/pexels-photo-28161375/free-photo-of-morning-coffee.jpeg?auto=compress&cs=tinysrgb&w=600",
            "https://images.pexels.com/photos/7740160/pexels-photo-7740160.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
            "https://images.pexels.com/photos/739407/pexels-photo-739407.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
            "https://images.pexels.com/photos/460672/pexels-photo-460672.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260",
        ], // Thay bằng URL hình ảnh thực tế
        beds: 10,
        pricePerNight: 26,
        rating: {
            score: 4.8,
            reviews: 28,
        },
        promotion: {
            discount: 10,
            label: "-10% today",
        },
        isAds: true,
        type: "Entire cabin",
        isFavorite: true,
    },
    {
        id: 2,
        name: "Bell By Greene King Inns",
        location: "32923 Judy Hill",
        imageUrl: [
            "https://images.pexels.com/photos/7740160/pexels-photo-7740160.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
            "https://images.pexels.com/photos/28161375/pexels-photo-28161375/free-photo-of-morning-coffee.jpeg?auto=compress&cs=tinysrgb&w=600",
            "https://images.pexels.com/photos/739407/pexels-photo-739407.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
            "https://images.pexels.com/photos/460672/pexels-photo-460672.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260",
        ], // Thay bằng URL hình ảnh thực tế
        beds: 6,
        pricePerNight: 250,
        rating: {
            score: 4.4,
            reviews: 198,
        },
        promotion: {
            discount: 10,
            label: "-10% today",
        },
        type: "Entire cabin",
        isFavorite: false,
    },
    {
        id: 3,
        name: "Holiday Inn Resort",
        location: "456 Maple Street",
        imageUrl: [
            "https://images.pexels.com/photos/739407/pexels-photo-739407.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
            "https://images.pexels.com/photos/28161375/pexels-photo-28161375/free-photo-of-morning-coffee.jpeg?auto=compress&cs=tinysrgb&w=600",
            "https://images.pexels.com/photos/7740160/pexels-photo-7740160.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
            "https://images.pexels.com/photos/460672/pexels-photo-460672.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260",
        ],
        beds: 8,
        pricePerNight: 150,
        rating: {
            score: 4.7,
            reviews: 89,
        },
        promotion: {
            discount: 5,
            label: "-5% today",
        },
        type: "Entire cabin",
        isFavorite: true,
    },
    {
        id: 4,
        name: "Marriott Downtown Hotel",
        location: "789 Elm Drive",
        imageUrl: [
            "https://images.pexels.com/photos/460672/pexels-photo-460672.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260",
            "https://images.pexels.com/photos/28161375/pexels-photo-28161375/free-photo-of-morning-coffee.jpeg?auto=compress&cs=tinysrgb&w=600",
            "https://images.pexels.com/photos/7740160/pexels-photo-7740160.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
            "https://images.pexels.com/photos/739407/pexels-photo-739407.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
        ],
        beds: 12,
        pricePerNight: 300,
        rating: {
            score: 4.9,
            reviews: 340,
        },
        type: "Entire cabin",
        isFavorite: false,
    },
    {
        id: 5,
        name: "Hilton Beachside Resort",
        location: "12 Seaside Avenue",
        imageUrl: [
            "https://images.pexels.com/photos/7740160/pexels-photo-7740160.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
            "https://images.pexels.com/photos/28161375/pexels-photo-28161375/free-photo-of-morning-coffee.jpeg?auto=compress&cs=tinysrgb&w=600",
            "https://images.pexels.com/photos/739407/pexels-photo-739407.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
            "https://images.pexels.com/photos/460672/pexels-photo-460672.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260",
        ],
        beds: 5,
        pricePerNight: 180,
        rating: {
            score: 4.6,
            reviews: 150,
        },
        promotion: {
            discount: 15,
            label: "-15% today",
        },
        type: "Entire cabin",
        isFavorite: true,
    },
];
