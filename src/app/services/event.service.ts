import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { tap, delay, map } from 'rxjs/operators';
import { Event } from '../models/event.model';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private http = inject(HttpClient);
  private eventsSubject = new BehaviorSubject<Event[]>([]);
  public events$ = this.eventsSubject.asObservable();
  private isLoaded = false;

  constructor() {
    this.loadEvents();
  }

  private loadEvents(): void {
    if (this.isLoaded) return;
    
    // Fetch data asynchronously using Angular’s HttpClient with JSON file
    this.http.get<Event[]>('/api/events.json').pipe(
      delay(500) // Simulate network latency
    ).subscribe({
      next: (events) => {
        this.eventsSubject.next(events);
        this.isLoaded = true;
      },
      error: (err) => {
        console.error('Failed to load events from JSON', err);
        this.eventsSubject.next([]); // Fallback to empty
      }
    });
  }

  getAllEvents(): Observable<Event[]> {
    return this.events$;
  }

  getEventById(id: number): Observable<Event | undefined> {
    return this.events$.pipe(
      map(events => events.find(e => e.id === id))
    );
  }

  getEventsByCategory(category: string): Observable<Event[]> {
    return this.events$.pipe(
      map(events => events.filter(e => e.category.toLowerCase() === category.toLowerCase()))
    );
  }

  getFeaturedEvents(): Observable<Event[]> {
    return this.events$.pipe(
      map(events => events.filter(e => e.featured))
    );
  }

  getAvailableEvents(): Observable<Event[]> {
    return this.events$.pipe(
      map(events => events.filter(e => e.availableTickets > 0))
    );
  }

  updateEventTickets(eventId: number, ticketsBooked: number): void {
    const events = this.eventsSubject.getValue();
    const eventIndex = events.findIndex(e => e.id === eventId);
    if (eventIndex !== -1) {
      // Create a new array and new object reference to trigger Angular change detection properly
      const updatedEvent = { ...events[eventIndex], availableTickets: events[eventIndex].availableTickets - ticketsBooked };
      const newEvents = [...events];
      newEvents[eventIndex] = updatedEvent;
      this.eventsSubject.next(newEvents);
    }
  }

  getCategories(): string[] {
    const events = this.eventsSubject.getValue();
    const categories = new Set(events.map(e => e.category));
    return Array.from(categories);
  }
}
