import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Booking } from '../models/event.model';
import { MOCK_BOOKINGS } from '../models/mock-data';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  private bookingsSubject = new BehaviorSubject<Booking[]>(MOCK_BOOKINGS);
  public bookings$ = this.bookingsSubject.asObservable();
  private nextId = MOCK_BOOKINGS.length + 1;

  constructor() {}

  getAllBookings(): Observable<Booking[]> {
    return this.bookings$;
  }

  getBookingsByUser(email: string): Observable<Booking[]> {
    const userBookings = this.bookingsSubject.getValue().filter(b => b.email === email);
    return of(userBookings).pipe(delay(300));
  }

  createBooking(booking: Omit<Booking, 'id' | 'status' | 'bookingDate'>): Observable<Booking> {
    const newBooking: Booking = {
      ...booking,
      id: this.nextId++,
      status: 'confirmed',
      bookingDate: new Date().toISOString().split('T')[0]
    };

    const currentBookings = this.bookingsSubject.getValue();
    this.bookingsSubject.next([...currentBookings, newBooking]);

    return of(newBooking).pipe(delay(500));
  }

  cancelBooking(bookingId: number): Observable<boolean> {
    const bookings = this.bookingsSubject.getValue();
    const booking = bookings.find(b => b.id === bookingId);
    
    if (booking) {
      booking.status = 'cancelled';
      this.bookingsSubject.next([...bookings]);
      return of(true).pipe(delay(300));
    }
    
    return of(false).pipe(delay(300));
  }

  updateBooking(bookingId: number, updates: Partial<Booking>): Observable<Booking | null> {
    const bookings = this.bookingsSubject.getValue();
    const booking = bookings.find(b => b.id === bookingId);
    
    if (booking) {
      const updatedBooking = { ...booking, ...updates };
      const index = bookings.indexOf(booking);
      bookings[index] = updatedBooking;
      this.bookingsSubject.next([...bookings]);
      return of(updatedBooking).pipe(delay(300));
    }
    
    return of(null).pipe(delay(300));
  }

  deleteBooking(bookingId: number): Observable<boolean> {
    const bookings = this.bookingsSubject.getValue();
    const index = bookings.findIndex(b => b.id === bookingId);
    
    if (index !== -1) {
      bookings.splice(index, 1);
      this.bookingsSubject.next([...bookings]);
      return of(true).pipe(delay(300));
    }
    
    return of(false).pipe(delay(300));
  }
}
