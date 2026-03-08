import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { EventListComponent } from './components/event-list/event-list.component';
import { EventDetailComponent } from './components/event-detail/event-detail.component';
import { BookingsComponent } from './components/bookings/bookings.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'events', component: EventListComponent },
  { 
    path: 'event/:id', 
    component: EventDetailComponent,
    children: [
      { path: 'schedule', loadComponent: () => import('./components/event-schedule/event-schedule.component').then(m => m.EventScheduleComponent) },
      { path: 'speakers', loadComponent: () => import('./components/event-speakers/event-speakers.component').then(m => m.EventSpeakersComponent) },
      { path: '', redirectTo: 'schedule', pathMatch: 'full' }
    ]
  },
  { 
    path: 'bookings', 
    component: BookingsComponent,
    canActivate: [authGuard]
  },
  { path: '**', redirectTo: '' }
];
