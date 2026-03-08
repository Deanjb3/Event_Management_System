export interface Event {
  id: number;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  category: string;
  price: number;
  availableTickets: number;
  totalTickets: number;
  image: string;
  speaker?: string;
  featured?: boolean;
}

export interface Booking {
  id: number;
  eventId: number;
  eventTitle: string;
  userName: string;
  email: string;
  phoneNumber: string;
  ticketCount: number;
  totalPrice: number;
  bookingDate: string;
  status: 'confirmed' | 'pending' | 'cancelled';
}

export interface User {
  id: number;
  name: string;
  email: string;
  phoneNumber: string;
}
