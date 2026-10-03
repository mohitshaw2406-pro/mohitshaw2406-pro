export interface Flight {
  id: string;
  flightNumber: string;
  origin: string;
  destination: string;
  departureTime: string;
  arrivalTime: string;
  price: number;
  totalSeats: number;
  bookedSeats: number[];
  status: 'Scheduled' | 'Boarding' | 'On Time' | 'Delayed';
}

export interface Booking {
  bookingId: string;
  flightNumber: string;
  passengerName: string;
  seatNumber: number;
  bookingDate: string;
  status: 'Confirmed' | 'Cancelled';
}

export interface SkillItem {
  name: string;
  category: 'Languages' | 'Frontend' | 'Backend & DB' | 'Tools & Workflow';
  icon: string;
  highlight?: boolean;
}
