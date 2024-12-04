export interface Flight {
  airline: string; // Airline name, e.g., 'Korean Air'
  departureTime: string; // Departure time, e.g., '11:00'
  arrivalTime: string; // Arrival time, e.g., '20:00'
  route: string; // Flight route, e.g., 'HND - SIN'
  stops: string; // 'Nonstop' or number of stops with stop locations
  flightDuration: string; // Total flight duration, e.g., '7h 45m'
  price: string; // Flight price, e.g., '4100'
  currency: string; // Currency type, e.g., 'USD'
  flightType: 'round-trip' | 'one-way'; // Type of flight, 'round-trip' or 'one-way'
  imageUrl: string; // URL of the airline logo
  details: FlightSegment[]; // Array of flight segments (outbound, return, or one-way)
}

export interface FlightSegment {
  segmentType: 'outbound' | 'return' | 'one-way'; // Indicates the flight segment
  departureDate: string; // Departure date, e.g., 'Monday, August 12'
  arrivalDate: string; // Arrival date, e.g., 'Monday, August 12'
  departureTime: string; // Departure time, e.g., '10:00'
  arrivalTime: string; // Arrival time, e.g., '17:45'
  departureAirport: string; // Departure airport with IATA code, e.g., 'Tokyo International Airport (HND)'
  arrivalAirport: string; // Arrival airport with IATA code, e.g., 'Singapore Changi Airport (SIN)'
  tripTime: string; // Duration of this segment, e.g., '7h 45m'
  airline: string; // Airline operating this segment, e.g., 'Korean Air'
  cabinClass: string; // Cabin class, e.g., 'Business'
  aircraft: string; // Aircraft model, e.g., 'Boeing 787'
  flightNumber: string; // Flight number, e.g., 'KE847'
  transit?: Transit; // Optional transit information for flights with stopovers
}

export interface Transit {
  stopPoint: string; // Stopover airport, e.g., 'Bangkok Suvarnabhumi Airport (BKK)'
  stopDuration: string; // Duration of stopover, e.g., '1h 30m'
}
export const flights: Flight[] = [
  {
    airline: 'Korean Air',
    departureTime: '11:00',
    arrivalTime: '20:00',
    route: 'HND - SIN',
    stops: 'Nonstop',
    flightDuration: '7h 45m',
    price: '4100',
    currency: 'USD',
    flightType: 'round-trip',
    imageUrl: 'https://www.gstatic.com/flights/airline_logos/70px/KE.png',
    details: [
      {
        segmentType: 'outbound',
        departureDate: 'Monday, August 12',
        arrivalDate: 'Monday, August 12',
        departureTime: '10:00',
        arrivalTime: '17:45',
        departureAirport: 'Tokyo International Airport (HND)',
        arrivalAirport: 'Singapore Changi Airport (SIN)',
        tripTime: '7h 45m',
        airline: 'Korean Air',
        cabinClass: 'Business',
        aircraft: 'Boeing 787',
        flightNumber: 'KE847',
      },
      {
        segmentType: 'return',
        departureDate: 'Friday, August 16',
        arrivalDate: 'Friday, August 16',
        departureTime: '10:00',
        arrivalTime: '17:45',
        departureAirport: 'Singapore Changi Airport (SIN)',
        arrivalAirport: 'Tokyo International Airport (HND)',
        tripTime: '7h 45m',
        airline: 'Korean Air',
        cabinClass: 'Business',
        aircraft: 'Boeing 787',
        flightNumber: 'KE848',
      },
    ],
  },
  {
    airline: 'Singapore Airlines',
    departureTime: '09:00',
    arrivalTime: '18:00',
    route: 'HND - SIN',
    stops: '1 stop',
    flightDuration: '9h 15m',
    price: '3380',
    currency: 'USD',
    flightType: 'round-trip',
    imageUrl: 'https://www.gstatic.com/flights/airline_logos/70px/SQ.png',
    details: [
      {
        segmentType: 'outbound',
        departureDate: 'Monday, August 12',
        arrivalDate: 'Monday, August 12',
        departureTime: '09:00',
        arrivalTime: '18:00',
        departureAirport: 'Tokyo International Airport (HND)',
        arrivalAirport: 'Singapore Changi Airport (SIN)',
        tripTime: '9h 15m',
        airline: 'Singapore Airlines',
        cabinClass: 'Economy',
        aircraft: 'Boeing 777',
        flightNumber: 'SQ633',
        transit: {
          stopPoint: 'Bangkok Suvarnabhumi Airport (BKK)',
          stopDuration: '1h 30m',
        },
      },
      {
        segmentType: 'return',
        departureDate: 'Thursday, August 16',
        arrivalDate: 'Thursday, August 16',
        departureTime: '12:00',
        arrivalTime: '21:15',
        departureAirport: 'Singapore Changi Airport (SIN)',
        arrivalAirport: 'Tokyo International Airport (HND)',
        tripTime: '9h 15m',
        airline: 'Singapore Airlines',
        cabinClass: 'Economy',
        aircraft: 'Boeing 777',
        flightNumber: 'SQ634',
        transit: {
          stopPoint: 'Bangkok Suvarnabhumi Airport (BKK)',
          stopDuration: '1h 30m',
        },
      },
    ],
  },
  {
    airline: 'ANA',
    departureTime: '08:30',
    arrivalTime: '14:30',
    route: 'HND - LAX',
    stops: 'Nonstop',
    flightDuration: '12h 00m',
    price: '2750',
    currency: 'USD',
    flightType: 'one-way',
    imageUrl: 'https://www.gstatic.com/flights/airline_logos/70px/NH.png',
    details: [
      {
        segmentType: 'one-way',
        departureDate: 'Tuesday, September 10',
        arrivalDate: 'Tuesday, September 10',
        departureTime: '08:30',
        arrivalTime: '14:30',
        departureAirport: 'Tokyo International Airport (HND)',
        arrivalAirport: 'Los Angeles International Airport (LAX)',
        tripTime: '12h 00m',
        airline: 'ANA',
        cabinClass: 'First Class',
        aircraft: 'Boeing 777',
        flightNumber: 'NH105',
      },
    ],
  },
  {
    airline: 'Cathay Pacific',
    departureTime: '13:00',
    arrivalTime: '23:00',
    route: 'JFK - HKG',
    stops: '1 stop',
    flightDuration: '16h 30m',

    price: '4100',
    currency: 'USD',
    flightType: 'one-way',
    imageUrl: 'https://www.gstatic.com/flights/airline_logos/70px/CX.png',
    details: [
      {
        segmentType: 'one-way',
        departureDate: 'Thursday, October 5',
        arrivalDate: 'Friday, October 6',
        departureTime: '13:00',
        arrivalTime: '23:00',
        departureAirport: 'John F. Kennedy International Airport (JFK)',
        arrivalAirport: 'Hong Kong International Airport (HKG)',
        tripTime: '16h 30m',
        airline: 'Cathay Pacific',
        cabinClass: 'Business',
        aircraft: 'Airbus A350',
        flightNumber: 'CX841',
        transit: {
          stopPoint: 'Los Angeles International Airport (LAX)',
          stopDuration: '2h 15m',
        },
      },
    ],
  },
];
