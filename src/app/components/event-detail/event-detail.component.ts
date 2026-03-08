import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink, RouterOutlet, RouterLinkActive } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { EventService } from '../../services/event.service';
import { Event } from '../../models/event.model';
import { BookingFormComponent } from '../booking-form/booking-form.component';
import { FeaturedEventDirective, SoldOutDirective } from '../../directives/custom.directives';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-event-detail',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    CurrencyPipe,
    DatePipe,
    FeaturedEventDirective,
    SoldOutDirective,
    RouterOutlet,
    RouterLinkActive
  ],
  template: `
    <div class="page-wrap">
      <a routerLink="/events" class="back-link">
        <mat-icon>arrow_back</mat-icon> Back to Events
      </a>

      <div *ngIf="event$ | async as event" class="detail-card" [appFeaturedEvent]="!!event.featured">
        <!-- Header -->
        <div class="detail-header">
          <img [src]="event.image" alt="{{ event.title }}" class="detail-img" />
          <div class="detail-meta">
            <div class="meta-badges">
              <span class="tag">{{ event.category }}</span>
              <span *ngIf="event.featured" class="tag-feat"><mat-icon>star</mat-icon> Featured</span>
              <span *ngIf="event.availableTickets === 0" class="tag-sold">Sold Out</span>
            </div>
            <h1>{{ event.title }}</h1>
            <p *ngIf="event.speaker" class="speaker">
              <mat-icon>person</mat-icon>
              Presented by <strong>{{ event.speaker }}</strong>
            </p>
          </div>
        </div>

        <!-- Content -->
        <div class="detail-body">

          <section class="info-section">
            <h2>About This Event</h2>
            <p class="desc">{{ event.description }}</p>
          </section>

          <!-- Nested Router Outlet for Schedule/Speakers -->
          <section class="info-section nested-section">
            <div class="nested-tabs">
              <a routerLink="schedule" routerLinkActive="active-tab" class="tab-link">Schedule</a>
              <a routerLink="speakers" routerLinkActive="active-tab" class="tab-link">Speakers</a>
            </div>
            <div class="nested-content">
              <router-outlet></router-outlet>
            </div>
          </section>

          <section class="info-section">
            <h2>Event Details</h2>
            <div class="details-grid">
              <div class="detail-tile">
                <mat-icon>calendar_today</mat-icon>
                <div>
                  <span class="tile-label">Date</span>
                  <span class="tile-val">{{ event.date | date: 'EEEE, MMMM d, yyyy' }}</span>
                </div>
              </div>
              <div class="detail-tile">
                <mat-icon>access_time</mat-icon>
                <div>
                  <span class="tile-label">Time</span>
                  <span class="tile-val">{{ event.time }}</span>
                </div>
              </div>
              <div class="detail-tile">
                <mat-icon>location_on</mat-icon>
                <div>
                  <span class="tile-label">Location</span>
                  <span class="tile-val">{{ event.location }}</span>
                </div>
              </div>
              <div class="detail-tile">
                <mat-icon>confirmation_number</mat-icon>
                <div>
                  <span class="tile-label">Tickets</span>
                  <span class="tile-val" *ngIf="event.availableTickets > 0">
                    {{ event.availableTickets }} / {{ event.totalTickets }} available
                  </span>
                  <span class="tile-val sold" *ngIf="event.availableTickets === 0">Sold Out</span>
                </div>
              </div>
            </div>
          </section>

          <section class="info-section pricing-section">
            <h2>Pricing</h2>
            <div class="price-box">
              <span class="price-amount">{{ event.price | currency }}</span>
              <span class="price-per">per ticket</span>
            </div>
          </section>

          <div *ngIf="event.featured" class="featured-banner">
            <mat-icon>star</mat-icon>
            <span>Featured Event — highly recommended by EventHub</span>
          </div>

        </div>

        <!-- Actions -->
        <div class="detail-actions">
          <button
            class="btn-book"
            (click)="openBookingDialog(event)"
            [disabled]="event.availableTickets === 0"
            [appSoldOut]="event.availableTickets === 0"
          >
            <mat-icon>shopping_cart</mat-icon>
            {{ event.availableTickets > 0 ? 'Book Now' : 'Sold Out' }}
          </button>
          <button class="btn-share" (click)="shareEvent(event)">
            <mat-icon>share</mat-icon>
            Share
          </button>
        </div>
      </div>

      <div *ngIf="!(event$ | async)" class="loading-state">
        <mat-icon class="spin">hourglass_empty</mat-icon>
        <p>Loading event details...</p>
      </div>
    </div>
  `,
  styles: [`
    .page-wrap {
      max-width: 900px;
      margin: 0 auto;
      padding: 40px 24px;
    }

    .back-link {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      color: #64748b;
      text-decoration: none;
      font-size: 14px;
      font-weight: 500;
      margin-bottom: 28px;
      transition: color 0.15s;
    }

    .back-link:hover { color: #7c3aed; }
    .back-link mat-icon { font-size:18px; width:18px; height:18px; }

    /* Card */
    .detail-card {
      background: #fff;
      border: 1px solid #e2e8f0;
      border-radius: 16px;
      overflow: hidden;
      box-shadow: 0 4px 24px rgba(15,23,42,0.07);
    }

    /* Header */
    .detail-header {
      display: flex;
      gap: 0;
    }

    .detail-img {
      width: 320px;
      height: 280px;
      object-fit: cover;
      flex-shrink: 0;
    }

    .detail-meta {
      flex: 1;
      padding: 32px;
      display: flex;
      flex-direction: column;
      gap: 12px;
      justify-content: center;
      background: #f7f8fc;
    }

    .meta-badges {
      display: flex;
      gap: 8px;
      flex-wrap: wrap;
    }

    .tag {
      background: #ede9fe;
      color: #6d28d9;
      font-size: 11px;
      font-weight: 700;
      text-transform: uppercase;
      padding: 3px 12px;
      border-radius: 50px;
    }

    .tag-feat {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      background: #fef3c7;
      color: #92400e;
      font-size: 11px;
      font-weight: 700;
      padding: 3px 12px;
      border-radius: 50px;
    }

    .tag-feat mat-icon { font-size:12px; width:12px; height:12px; }

    .tag-sold {
      background: #fee2e2;
      color: #991b1b;
      font-size: 11px;
      font-weight: 700;
      padding: 3px 12px;
      border-radius: 50px;
    }

    .detail-meta h1 {
      font-size: 28px;
      font-weight: 800;
      color: #0f172a;
      margin: 0;
      line-height: 1.2;
    }

    .speaker {
      display: flex;
      align-items: center;
      gap: 6px;
      font-size: 14px;
      color: #64748b;
      margin: 0;
    }

    .speaker mat-icon { font-size:16px; width:16px; height:16px; color:#a78bfa; }

    /* Body */
    .detail-body {
      padding: 36px 36px 28px;
    }

    .info-section {
      margin-bottom: 32px;
    }

    .info-section h2 {
      font-size: 16px;
      font-weight: 700;
      color: #0f172a;
      margin: 0 0 16px;
      padding-bottom: 10px;
      border-bottom: 2px solid #ede9fe;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .desc {
      font-size: 15px;
      color: #475569;
      line-height: 1.7;
      margin: 0;
    }

    .details-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(190px, 1fr));
      gap: 14px;
    }

    /* Nested Tabs */
    .nested-section {
      margin-top: 24px;
    }
    .nested-tabs {
      display: flex;
      gap: 16px;
      border-bottom: 2px solid #e2e8f0;
      margin-bottom: 16px;
    }
    .tab-link {
      padding: 8px 16px;
      color: #64748b;
      font-weight: 600;
      text-decoration: none;
      border-bottom: 3px solid transparent;
      margin-bottom: -2px;
      transition: all 0.2s;
    }
    .tab-link:hover {
      color: #7c3aed;
    }
    .active-tab {
      color: #7c3aed;
      border-bottom-color: #7c3aed;
    }
    .nested-content {
      padding: 10px 0;
    }

    .detail-tile {
      display: flex;
      gap: 14px;
      align-items: flex-start;
      background: #f7f8fc;
      border: 1px solid #e2e8f0;
      border-radius: 10px;
      padding: 14px;
    }

    .detail-tile mat-icon {
      color: #7c3aed;
      margin-top: 2px;
      flex-shrink: 0;
      font-size: 20px;
      width: 20px;
      height: 20px;
    }

    .tile-label {
      display: block;
      font-size: 10px;
      text-transform: uppercase;
      letter-spacing: 0.6px;
      color: #94a3b8;
      margin-bottom: 4px;
    }

    .tile-val {
      display: block;
      font-size: 14px;
      font-weight: 600;
      color: #0f172a;
    }

    .tile-val.sold { color: #ef4444; }

    /* Pricing */
    .price-box {
      display: inline-flex;
      align-items: baseline;
      gap: 8px;
      background: #f7f8fc;
      border: 2px solid #ede9fe;
      border-radius: 12px;
      padding: 18px 28px;
    }

    .price-amount {
      font-size: 40px;
      font-weight: 900;
      color: #7c3aed;
      letter-spacing: -1px;
    }

    .price-per {
      font-size: 14px;
      color: #94a3b8;
    }

    /* Featured banner */
    .featured-banner {
      display: flex;
      align-items: center;
      gap: 10px;
      background: #fef3c7;
      border-left: 4px solid #f59e0b;
      padding: 14px 18px;
      border-radius: 8px;
      font-size: 14px;
      font-weight: 600;
      color: #92400e;
      margin-top: 8px;
    }

    .featured-banner mat-icon { color: #f59e0b; }

    /* Actions */
    .detail-actions {
      display: flex;
      gap: 12px;
      padding: 20px 36px 28px;
      border-top: 1px solid #f1f5f9;
    }

    .btn-book {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      background: #7c3aed;
      color: #fff;
      border: none;
      border-radius: 10px;
      padding: 12px 28px;
      font-size: 15px;
      font-weight: 700;
      cursor: pointer;
      transition: background 0.18s, transform 0.15s;
    }

    .btn-book:hover:not(:disabled) { background: #6d28d9; transform: translateY(-1px); }
    .btn-book:disabled { background: #cbd5e1; cursor: not-allowed; }
    .btn-book mat-icon { font-size:18px; width:18px; height:18px; }

    .btn-share {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      background: transparent;
      color: #475569;
      border: 1.5px solid #e2e8f0;
      border-radius: 10px;
      padding: 12px 22px;
      font-size: 14px;
      font-weight: 600;
      cursor: pointer;
      transition: border-color 0.18s, color 0.18s;
    }

    .btn-share:hover { border-color: #7c3aed; color: #7c3aed; }
    .btn-share mat-icon { font-size:17px; width:17px; height:17px; }

    /* Loading */
    .loading-state {
      text-align: center;
      padding: 100px 20px;
      color: #94a3b8;
    }

    .spin {
      font-size: 52px !important;
      width: 52px !important;
      height: 52px !important;
      display: block;
      margin: 0 auto 16px;
      animation: spin 1.5s linear infinite;
    }

    @keyframes spin { to { transform: rotate(360deg); } }

    @media (max-width: 768px) {
      .detail-header { flex-direction: column; }
      .detail-img { width: 100%; height: 220px; }
      .detail-meta { padding: 20px; }
      .detail-meta h1 { font-size: 22px; }
      .detail-body { padding: 24px 20px; }
      .detail-actions { padding: 16px 20px 24px; flex-wrap: wrap; }
      .price-amount { font-size: 32px; }
    }
  `]
})
export class EventDetailComponent implements OnInit {
  private eventService = inject(EventService);
  event$: Observable<Event | undefined> = of(undefined);
  eventId: number = 0;

  constructor(private route: ActivatedRoute, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.eventId = +params['id'];
      this.event$ = this.eventService.getEventById(this.eventId);
    });
  }

  openBookingDialog(event: Event): void {
    this.dialog.open(BookingFormComponent, {
      width: '540px',
      data: { event }
    });
  }

  shareEvent(event: Event): void {
    const message = `${event.title} — ${new Date(event.date).toLocaleDateString('en-IN', { month: 'long', day: 'numeric', year: 'numeric' })} at ${event.location}`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(message).then(() => alert('Event details copied to clipboard!'));
    } else {
      alert('Share: ' + message);
    }
  }
}
