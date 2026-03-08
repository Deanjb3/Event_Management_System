import { Event, Booking } from './event.model';

export const MOCK_EVENTS: Event[] = [
  {
    id: 1,
    title: 'Angular Advanced Workshop',
    description: 'Learn advanced Angular concepts including RxJS, services, and dependency injection.',
    date: '2026-04-15',
    time: '09:00 AM',
    location: 'Tech Hub, Downtown',
    category: 'Workshop',
    price: 49.99,
    availableTickets: 150,
    totalTickets: 200,
    image: '/assets/events/angular-workshop.png',
    speaker: 'John Developer',
    featured: true
  },
  {
    id: 2,
    title: 'TypeScript Masterclass',
    description: 'Master TypeScript from basics to advanced patterns.',
    date: '2026-04-20',
    time: '02:00 PM',
    location: 'Convention Center',
    category: 'Course',
    price: 39.99,
    availableTickets: 200,
    totalTickets: 200,
    image: '/assets/events/typescript-masterclass.png',
    speaker: 'Sarah Code',
    featured: true
  },
  {
    id: 3,
    title: 'Web Development Summit',
    description: 'Explore the latest trends in web development.',
    date: '2026-04-28',
    time: '10:00 AM',
    location: 'Grand Hall',
    category: 'Conference',
    price: 29.99,
    availableTickets: 50,
    totalTickets: 300,
    image: '/assets/events/web-dev-summit.png',
    speaker: 'Tech Experts Panel',
    featured: false
  },
  {
    id: 4,
    title: 'React & Next.js Bootcamp',
    description: 'Intensive bootcamp covering React and Next.js frameworks.',
    date: '2026-05-10',
    time: '01:00 PM',
    location: 'Innovation Lab',
    category: 'Bootcamp',
    price: 99.99,
    availableTickets: 75,
    totalTickets: 100,
    image: '/assets/events/react-nextjs-bootcamp.png',
    speaker: 'React Masters',
    featured: true
  },
  {
    id: 5,
    title: 'Database Design Seminar',
    description: 'Learn database design principles and optimization techniques.',
    date: '2026-05-20',
    time: '11:00 AM',
    location: 'Tech Hub, Downtown',
    category: 'Seminar',
    price: 34.99,
    availableTickets: 0,
    totalTickets: 150,
    image: '/assets/events/database-design-seminar.png',
    speaker: 'DB Expert',
    featured: false
  },
  {
    id: 6,
    title: 'Cloud Computing Essentials',
    description: 'Introduction to cloud platforms and deployment strategies.',
    date: '2026-06-05',
    time: '03:00 PM',
    location: 'Cloud Center',
    category: 'Workshop',
    price: 44.99,
    availableTickets: 120,
    totalTickets: 150,
    image: '/assets/events/cloud-computing.png',
    speaker: 'Cloud Architect',
    featured: false
  }
];

export const MOCK_BOOKINGS: Booking[] = [
  {
    id: 1,
    eventId: 1,
    eventTitle: 'Angular Advanced Workshop',
    userName: 'John Doe',
    email: 'john@example.com',
    phoneNumber: '555-0101',
    ticketCount: 2,
    totalPrice: 99.98,
    bookingDate: '2026-03-01',
    status: 'confirmed'
  },
  {
    id: 2,
    eventId: 2,
    eventTitle: 'TypeScript Masterclass',
    userName: 'Jane Smith',
    email: 'jane@example.com',
    phoneNumber: '555-0102',
    ticketCount: 1,
    totalPrice: 39.99,
    bookingDate: '2026-03-05',
    status: 'confirmed'
  }
];

