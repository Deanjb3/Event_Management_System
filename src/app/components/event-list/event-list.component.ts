import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { EventService } from '../../services/event.service';
import { Event } from '../../models/event.model';
import { FeaturedEventDirective, SoldOutDirective, HoverEffectDirective } from '../../directives/custom.directives';
import { FilterByCategoryPipe, FilterByPricePipe, SortByPricePipe } from '../../pipes/custom.pipes';

@Component({
  selector: 'app-event-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
    MatFormFieldModule,
    CurrencyPipe,
    DatePipe,
    FeaturedEventDirective,
    SoldOutDirective,
    HoverEffectDirective,
    FilterByCategoryPipe,
    FilterByPricePipe,
    SortByPricePipe
  ],
  template: `
    <div class="page-wrap">
      <div class="page-hero">
        <h1>Browse Events</h1>
        <p>Explore upcoming events and secure your spot today</p>
      </div>

      <div class="filters-bar">
        <mat-form-field appearance="outline" class="filter-field">
          <mat-label>Category</mat-label>
          <mat-select [(ngModel)]="selectedCategory">
            <mat-option value="">All Categories</mat-option>
            <mat-option *ngFor="let cat of categories" [value]="cat">{{ cat }}</mat-option>
          </mat-select>
        </mat-form-field>

        <div class="price-filter">
          <label class="price-label">
            Max Price: <strong>{{ maxPrice === 150 ? 'Any' : (maxPrice | currency: 'USD':'symbol':'1.0-0') }}</strong>
          </label>
          <input type="range" min="0" max="150" step="10" [(ngModel)]="maxPrice" class="slider" />
          <div class="slider-range"><span>$0</span><span>$150+</span></div>
        </div>

        <mat-form-field appearance="outline" class="filter-field">
          <mat-label>Sort by Price</mat-label>
          <mat-select [(ngModel)]="sortAscending">
            <mat-option [value]="true">Low to High</mat-option>
            <mat-option [value]="false">High to Low</mat-option>
          </mat-select>
        </mat-form-field>
      </div>

      <ng-container *ngIf="(events$ | async) as allEvents">
        <ng-container *ngIf="(allEvents | filterByCategory: selectedCategory | filterByPrice: maxPrice | sortByPrice: sortAscending) as filtered">

          <div *ngIf="filtered.length === 0" class="empty-state">
            <mat-icon>search_off</mat-icon>
            <h3>No events found</h3>
            <p>Try adjusting your category or price filter.</p>
          </div>

          <div *ngIf="filtered.length > 0" class="events-grid">
            <div
              *ngFor="let event of filtered"
              class="event-card"
              [appFeaturedEvent]="event.featured || false"
              [appSoldOut]="event.availableTickets === 0"
              appHoverEffect
            >
              <div class="card-img-wrap">
                <img [src]="event.image" alt="{{ event.title }}" class="card-img" />
                <span *ngIf="event.featured" class="badge-featured">
                  <mat-icon>star</mat-icon> Featured
                </span>
                <span *ngIf="event.availableTickets === 0" class="badge-sold-out">Sold Out</span>
              </div>

              <div class="card-body">
                <span class="tag">{{ event.category }}</span>
                <h2 class="card-title">{{ event.title }}</h2>
                <p class="card-desc">{{ event.description | slice: 0:90 }}...</p>

                <div class="card-meta">
                  <span><mat-icon>calendar_today</mat-icon>{{ event.date | date: 'MMM d, yyyy' }}</span>
                  <span><mat-icon>access_time</mat-icon>{{ event.time }}</span>
                  <span><mat-icon>location_on</mat-icon>{{ event.location }}</span>
                  <span *ngIf="event.speaker"><mat-icon>person</mat-icon>{{ event.speaker }}</span>
                </div>

                <div class="card-footer">
                  <div class="price-info">
                    <span class="price">{{ event.price | currency }}</span>
                    <span class="avail" [class.avail-out]="event.availableTickets === 0">
                      {{ event.availableTickets > 0 ? event.availableTickets + ' left' : 'Sold Out' }}
                    </span>
                  </div>
                  <a
                    *ngIf="event.availableTickets > 0"
                    [routerLink]="['/event', event.id]"
                    class="btn-view"
                  >View →</a>
                  <span *ngIf="event.availableTickets === 0" class="btn-disabled">Unavailable</span>
                </div>
              </div>
            </div>
          </div>

        </ng-container>
      </ng-container>
    </div>
  `,
  styles: [`
    /* Page */
    .page-wrap {
      max-width: 1200px;
      margin: 0 auto;
      padding: 48px 24px;
    }

    .page-hero {
      margin-bottom: 36px;
    }

    .page-hero h1 {
      font-size: 34px;
      font-weight: 800;
      color: #0f172a;
      margin: 0 0 6px;
    }

    .page-hero p {
      font-size: 15px;
      color: #64748b;
      margin: 0;
    }

    /* Filters */
    .filters-bar {
      display: flex;
      gap: 20px;
      margin-bottom: 36px;
      flex-wrap: wrap;
      align-items: flex-start;
      background: #fff;
      border: 1px solid #e2e8f0;
      border-radius: 14px;
      padding: 20px 24px;
    }

    .filter-field {
      min-width: 180px;
    }

    .price-filter {
      display: flex;
      flex-direction: column;
      gap: 5px;
      min-width: 200px;
      padding-top: 4px;
    }

    .price-label {
      font-size: 13px;
      color: #64748b;
    }

    .price-label strong {
      color: #7c3aed;
      font-weight: 700;
    }

    .slider {
      width: 100%;
      accent-color: #7c3aed;
      cursor: pointer;
      height: 4px;
    }

    .slider-range {
      display: flex;
      justify-content: space-between;
      font-size: 11px;
      color: #94a3b8;
    }

    /* Grid */
    .events-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(290px, 1fr));
      gap: 20px;
    }

    .event-card {
      background: #fff;
      border-radius: 14px;
      border: 1px solid #e2e8f0;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      transition: transform 0.22s, box-shadow 0.22s;
    }

    .event-card:hover {
      transform: translateY(-4px);
      box-shadow: 0 10px 30px rgba(15,23,42,0.11);
    }

    .card-img-wrap { position: relative; }

    .card-img {
      width: 100%;
      height: 180px;
      object-fit: cover;
      display: block;
    }

    .badge-featured {
      position: absolute;
      top: 10px;
      left: 10px;
      display: inline-flex;
      align-items: center;
      gap: 3px;
      background: #fff;
      color: #7c3aed;
      font-size: 10px;
      font-weight: 800;
      padding: 3px 10px;
      border-radius: 50px;
      box-shadow: 0 2px 6px rgba(0,0,0,0.12);
    }

    .badge-featured mat-icon { font-size:12px; width:12px; height:12px; }

    .badge-sold-out {
      position: absolute;
      top: 10px;
      right: 10px;
      background: #0f172a;
      color: #fff;
      font-size: 10px;
      font-weight: 700;
      padding: 3px 10px;
      border-radius: 50px;
    }

    .card-body {
      padding: 16px 18px 18px;
      display: flex;
      flex-direction: column;
      flex: 1;
    }

    .tag {
      display: inline-block;
      background: #ede9fe;
      color: #6d28d9;
      font-size: 10px;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      padding: 3px 10px;
      border-radius: 50px;
      margin-bottom: 8px;
    }

    .card-title {
      font-size: 16px;
      font-weight: 700;
      color: #0f172a;
      margin: 0 0 6px;
      line-height: 1.3;
    }

    .card-desc {
      font-size: 13px;
      color: #64748b;
      line-height: 1.55;
      margin: 0 0 12px;
      flex: 1;
    }

    .card-meta {
      display: flex;
      flex-direction: column;
      gap: 4px;
      font-size: 12px;
      color: #64748b;
      margin-bottom: 14px;
    }

    .card-meta span {
      display: flex;
      align-items: center;
      gap: 6px;
    }

    .card-meta mat-icon {
      font-size: 14px;
      width: 14px;
      height: 14px;
      color: #a78bfa;
    }

    .card-footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-top: 1px solid #f1f5f9;
      padding-top: 12px;
      margin-top: auto;
    }

    .price-info {
      display: flex;
      flex-direction: column;
    }

    .price {
      font-size: 17px;
      font-weight: 800;
      color: #7c3aed;
    }

    .avail {
      font-size: 11px;
      color: #22c55e;
      font-weight: 600;
    }

    .avail-out {
      color: #ef4444;
    }

    .btn-view {
      font-size: 13px;
      font-weight: 700;
      color: #7c3aed;
      text-decoration: none;
      padding: 6px 14px;
      border: 1.5px solid #7c3aed;
      border-radius: 8px;
      transition: background 0.18s, color 0.18s;
    }

    .btn-view:hover {
      background: #7c3aed;
      color: #fff;
    }

    .btn-disabled {
      font-size: 13px;
      color: #94a3b8;
      font-weight: 500;
    }

    /* Empty state */
    .empty-state {
      text-align: center;
      padding: 80px 20px;
      color: #94a3b8;
    }

    .empty-state mat-icon {
      font-size: 64px;
      width: 64px;
      height: 64px;
      margin-bottom: 16px;
      display: block;
      margin: 0 auto 16px;
    }

    .empty-state h3 {
      font-size: 20px;
      color: #475569;
      margin: 0 0 8px;
    }

    .empty-state p {
      font-size: 14px;
      margin: 0;
    }

    @media (max-width: 768px) {
      .events-grid { grid-template-columns: 1fr; }
      .filters-bar { flex-direction: column; }
      .filter-field, .price-filter { width: 100%; }
    }
  `]
})
export class EventListComponent implements OnInit {
  private eventService = inject(EventService);
  events$ = this.eventService.events$;
  categories: string[] = [];
  selectedCategory: string = '';
  maxPrice: number = 150;
  sortAscending: boolean = true;

  ngOnInit(): void {
    this.categories = this.eventService.getCategories();
  }
}
