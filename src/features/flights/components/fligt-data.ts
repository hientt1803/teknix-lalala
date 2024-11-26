export type TicketType = 'oneWay' | 'roundTrip' | 'multiCity';

export interface Flight {
   ticketType: TicketType;
   airline: {
      name: string;
      code: string;
      logoUrl: string;
   };
   flightNumber: string;
   segments: Array<{
      departure: {
         time: string;
         date: string;
         airport: string;
         terminal: string;
         city: string;
         country: string;
      };
      arrival: {
         time: string;
         date: string;
         airport: string;
         terminal: string;
         city: string;
         country: string;
      };
      duration: string;
   }>;
   price: number;
   refundable: boolean;
   seatsLeft: number;
   travelClass: string;
   additionalInfo: string[];
}

export const flightsData: Flight[] = [
   // Vé một chiều
   {
      ticketType: 'oneWay',
      airline: {
         name: 'Phillippines Airline',
         code: 'PA',
         logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8b/AirAsia_X_Logo.svg/120px-AirAsia_X_Logo.svg.png',
      },
      flightNumber: '5620',
      segments: [
         {
            departure: {
               time: '14:50',
               date: 'Sun, 29 Jan 2023',
               airport: 'BOM',
               terminal: 'Terminal 2',
               city: 'Mumbai',
               country: 'India',
            },
            arrival: {
               time: '07:35',
               date: 'Sun, 30 Jan 2023',
               airport: 'JFK',
               terminal: 'Terminal 2',
               city: 'New York',
               country: 'USA',
            },
            duration: '10h 35m',
         },
      ],
      price: 18500,
      refundable: true,
      seatsLeft: 10,
      travelClass: 'Economy',
      additionalInfo: ['Only 10 Seat Left', 'Refundable'],
   },
   // Vé khứ hồi
   {
      ticketType: 'roundTrip',
      airline: {
         name: 'Blogzine Airline',
         code: 'FFR',
         logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/Wizz_Air_logo.svg/120px-Wizz_Air_logo.svg.png',
      },
      flightNumber: '5682',
      segments: [
         {
            departure: {
               time: '14:50',
               date: 'Sun, 29 Jan 2023',
               airport: 'BOM',
               terminal: 'Terminal 2',
               city: 'Mumbai',
               country: 'India',
            },
            arrival: {
               time: '07:35',
               date: 'Sun, 30 Jan 2023',
               airport: 'JFK',
               terminal: 'Terminal 2',
               city: 'New York',
               country: 'USA',
            },
            duration: '9h 50m',
         },
         {
            departure: {
               time: '04:50',
               date: 'Sun, 19 Feb 2023',
               airport: 'JFK',
               terminal: 'Terminal 2',
               city: 'New York',
               country: 'USA',
            },
            arrival: {
               time: '07:35',
               date: 'Sun, 19 Feb 2023',
               airport: 'BOM',
               terminal: 'Terminal 2',
               city: 'Mumbai',
               country: 'India',
            },
            duration: '10h 35m',
         },
      ],
      price: 18500,
      refundable: true,
      seatsLeft: 10,
      travelClass: 'Economy',
      additionalInfo: ['Only 10 Seat Left', 'Refundable'],
   },
   // Vé nhiều nơi
   {
      ticketType: 'multiCity',
      airline: {
         name: 'Global Express',
         code: 'GX',
         logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9f/Firefly_Logo.svg/120px-Firefly_Logo.svg.png',
      },
      flightNumber: '9987',
      segments: [
         {
            departure: {
               time: '08:45',
               date: 'Sat, 4 Feb 2023',
               airport: 'BOM',
               terminal: 'Terminal 1',
               city: 'Mumbai',
               country: 'India',
            },
            arrival: {
               time: '13:25',
               date: 'Sat, 4 Feb 2023',
               airport: 'SIN',
               terminal: 'Terminal 3',
               city: 'Singapore',
               country: 'Singapore',
            },
            duration: '4h 40m',
         },
         {
            departure: {
               time: '17:00',
               date: 'Mon, 6 Feb 2023',
               airport: 'SIN',
               terminal: 'Terminal 3',
               city: 'Singapore',
               country: 'Singapore',
            },
            arrival: {
               time: '22:45',
               date: 'Mon, 6 Feb 2023',
               airport: 'LHR',
               terminal: 'Terminal 5',
               city: 'London',
               country: 'UK',
            },
            duration: '13h 45m',
         },
      ],
      price: 32500,
      refundable: false,
      seatsLeft: 5,
      travelClass: 'Business',
      additionalInfo: ['Only 5 Seat Left', 'Non-Refundable'],
   },
   // Vé một chiều khác
   {
      ticketType: 'oneWay',
      airline: {
         name: 'Air India',
         code: 'AI',
         logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/Jetex_logo.svg/120px-Jetex_logo.svg.png',
      },
      flightNumber: '7001',
      segments: [
         {
            departure: {
               time: '10:30',
               date: 'Tue, 1 Feb 2023',
               airport: 'DEL',
               terminal: 'Terminal 3',
               city: 'New Delhi',
               country: 'India',
            },
            arrival: {
               time: '20:15',
               date: 'Tue, 1 Feb 2023',
               airport: 'SYD',
               terminal: 'Terminal 1',
               city: 'Sydney',
               country: 'Australia',
            },
            duration: '9h 45m',
         },
      ],
      price: 25000,
      refundable: true,
      seatsLeft: 8,
      travelClass: 'Economy',
      additionalInfo: ['Only 8 Seat Left', 'Refundable'],
   },
   // Vé khứ hồi khác
   {
      ticketType: 'roundTrip',
      airline: {
         name: 'Singapore Airlines',
         code: 'SQ',
         logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/Viva_Air_logo.svg/120px-Viva_Air_logo.svg.png',
      },
      flightNumber: '8002',
      segments: [
         {
            departure: {
               time: '12:50',
               date: 'Wed, 8 Feb 2023',
               airport: 'SIN',
               terminal: 'Terminal 2',
               city: 'Singapore',
               country: 'Singapore',
            },
            arrival: {
               time: '18:30',
               date: 'Wed, 8 Feb 2023',
               airport: 'HND',
               terminal: 'Terminal 1',
               city: 'Tokyo',
               country: 'Japan',
            },
            duration: '5h 40m',
         },
         {
            departure: {
               time: '20:00',
               date: 'Fri, 17 Feb 2023',
               airport: 'HND',
               terminal: 'Terminal 1',
               city: 'Tokyo',
               country: 'Japan',
            },
            arrival: {
               time: '02:40',
               date: 'Sat, 18 Feb 2023',
               airport: 'SIN',
               terminal: 'Terminal 2',
               city: 'Singapore',
               country: 'Singapore',
            },
            duration: '6h 40m',
         },
      ],
      price: 32000,
      refundable: false,
      seatsLeft: 6,
      travelClass: 'Premium Economy',
      additionalInfo: ['Only 6 Seat Left', 'Non-Refundable'],
   },
];
