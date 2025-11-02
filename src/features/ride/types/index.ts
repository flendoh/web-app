export const RideStatus = {
  OPEN: 'OPEN',
  COMPLETED: 'COMPLETED',
  CANCELLED: 'CANCELLED'
} as const;

export type RideStatusType = (typeof RideStatus)[keyof typeof RideStatus];

export interface Ride {
  id: number;
  driverUserId: number;
  passengerUserId?: number;
  origin: string;
  destination: string;
  availableSeats: number;
  departureTime: string; // ISO string format
  rating?: number;
  driverAverageRating?: number;
  status: RideStatusType;
}

export interface CreateRideRequest {
  origin: string;
  destination: string;
  availableSeats: number;
  departureTime: string;
  notes?: string;
}

export interface RideSearchFilters {
  origin?: string;
  destination?: string;
  departureDate?: string;
  minSeats?: number;
  maxPrice?: number;
}

export interface RideBookingRequest {
  rideId: number;
  seatsRequested: number;
}