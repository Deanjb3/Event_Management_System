import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { EventService } from '../../services/event.service';
import { Event } from '../../models/event.model';
import { FeaturedEventDirective, HoverEffectDirective } from '../../directives/custom.directives';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    CurrencyPipe,
    DatePipe,
    FeaturedEventDirective,
    HoverEffectDirective
  ],
  template: `
    <div class="home-container">

      <!-- Hero -->
      <section class="hero">
        <div class="hero-content">
          <div class="hero-badge">
            <mat-icon>stars</mat-icon>
            <span>Discover &amp; Book Events</span>
          </div>
          <h1>Your Gateway to<br><span class="accent">Unforgettable Events</span></h1>
          <p>Find workshops, conferences, bootcamps, and more — all in one place.</p>
          <div class="hero-ctas">
            <a routerLink="/events" class="btn-primary">
              <mat-icon>search</mat-icon>
              Browse Events
            </a>
            <a routerLink="/bookings" class="btn-ghost">My Bookings</a>
          </div>
        </div>
      </section>

      <!-- Featured Events -->
      <section class="section">
        <div class="section-head">
          <h2>Featured Events</h2>
          <p>Hand-picked highlights you don't want to miss</p>
        </div>

        <div class="events-grid" *ngIf="(featuredEvents$ | async) as events">
          <div
            *ngFor="let event of events"
            class="event-card"
            [appFeaturedEvent]="true"
            appHoverEffect
          >
            <div class="card-img-wrap">
              <img [src]="event.image" alt="{{ event.title }}" class="card-img" />
              <span class="badge-featured"><mat-icon>star</mat-icon> Featured</span>
            </div>
            <div class="card-body">
              <span class="card-category">{{ event.category }}</span>
              <h3 class="card-title">{{ event.title }}</h3>
              <div class="card-meta">
                <span><mat-icon>calendar_today</mat-icon>{{ event.date | date: 'MMM d, yyyy' }}</span>
                <span><mat-icon>location_on</mat-icon>{{ event.location }}</span>
              </div>
              <div class="card-footer">
                <span class="card-price">{{ event.price | currency }}</span>
                <a [routerLink]="['/event', event.id]" class="btn-card">View Details →</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Stats -->
      <section class="stats-band">
        <div class="stat">
          <span class="stat-num" id="eventCount">6</span>
          <span class="stat-label">Events</span>
        </div>
        <div class="stat-divider"></div>
        <div class="stat">
          <span class="stat-num">500+</span>
          <span class="stat-label">Users</span>
        </div>
        <div class="stat-divider"></div>
        <div class="stat">
          <span class="stat-num">2000+</span>
          <span class="stat-label">Bookings</span>
        </div>
        <div class="stat-divider"></div>
        <div class="stat">
          <span class="stat-num">98%</span>
          <span class="stat-label">Satisfaction</span>
        </div>
      </section>

      <!-- Features -->
      <section class="section features-section">
        <div class="section-head">
          <h2>Why Choose EventHub?</h2>
        </div>
        <div class="features-grid">
          <div class="feature-card">
            <div class="feature-icon"><mat-icon>search</mat-icon></div>
            <h3>Easy Search</h3>
            <p>Filter events by category, price range, and date</p>
          </div>
          <div class="feature-card">
            <div class="feature-icon"><mat-icon>security</mat-icon></div>
            <h3>Secure Booking</h3>
            <p>Safe and reliable ticket booking every time</p>
          </div>
          <div class="feature-card">
            <div class="feature-icon"><mat-icon>notifications_active</mat-icon></div>
            <h3>Instant Confirmation</h3>
            <p>Get immediate confirmation with a downloadable receipt</p>
          </div>
          <div class="feature-card">
            <div class="feature-icon"><mat-icon>support_agent</mat-icon></div>
            <h3>24/7 Support</h3>
            <p>Our team is always available to help you</p>
          </div>
        </div>
      </section>

    </div>
  `,
  styles: [`
    .home-container { width: 100%; }

    /* ── Hero ── */
    .hero {
      background: #0f172a;
      color: #fff;
      padding: 110px 24px 100px;
      text-align: center;
      position: relative;
      overflow: hidden;
    }

    .hero::after {
      content: '';
      position: absolute;
      inset: 0;
      background: radial-gradient(ellipse 80% 60% at 50% 0%, rgba(124,58,237,0.25), transparent 70%);
      pointer-events: none;
    }

    .hero-content {
      position: relative;
      z-index: 1;
      max-width: 680px;
      margin: 0 auto;
      animation: fadeUp 0.6s ease both;
    }

    @keyframes fadeUp {
      from { opacity: 0; transform: translateY(28px); }
      to   { opacity: 1; transform: translateY(0); }
    }

    .hero-badge {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      background: rgba(167,139,250,0.15);
      border: 1px solid rgba(167,139,250,0.35);
      border-radius: 50px;
      padding: 6px 16px;
      font-size: 13px;
      color: #c4b5fd;
      margin-bottom: 28px;
    }

    .hero-badge mat-icon { font-size:15px; width:15px; height:15px; }

    .hero-content h1 {
      font-size: 52px;
      font-weight: 800;
      line-height: 1.13;
      margin: 0 0 18px;
      letter-spacing: -1.5px;
      color: #fff;
    }

    .accent { color: #a78bfa; }

    .hero-content p {
      font-size: 17px;
      opacity: 0.7;
      margin: 0 0 36px;
      line-height: 1.65;
    }

    .hero-ctas {
      display: flex;
      gap: 14px;
      justify-content: center;
      flex-wrap: wrap;
    }

    .btn-primary {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      background: #7c3aed;
      color: #fff;
      padding: 12px 28px;
      border-radius: 10px;
      font-size: 15px;
      font-weight: 600;
      text-decoration: none;
      transition: background 0.2s, transform 0.15s;
    }

    .btn-primary:hover { background: #6d28d9; transform: translateY(-1px); }
    .btn-primary mat-icon { font-size:18px; width:18px; height:18px; }

    .btn-ghost {
      display: inline-flex;
      align-items: center;
      padding: 12px 28px;
      border-radius: 10px;
      font-size: 15px;
      font-weight: 500;
      color: rgba(255,255,255,0.75);
      border: 1px solid rgba(255,255,255,0.15);
      text-decoration: none;
      transition: background 0.2s, color 0.2s;
    }

    .btn-ghost:hover { background: rgba(255,255,255,0.08); color: #fff; }

    /* ── Section ── */
    .section {
      max-width: 1200px;
      margin: 0 auto;
      padding: 80px 24px;
    }

    .section-head { text-align: center; margin-bottom: 48px; }

    .section-head h2 {
      font-size: 32px;
      font-weight: 700;
      color: #0f172a;
      margin: 0 0 8px;
    }

    .section-head p {
      color: #64748b;
      font-size: 15px;
      margin: 0;
    }

    /* ── Event cards ── */
    .events-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
      gap: 24px;
    }

    .event-card {
      background: #fff;
      border-radius: 14px;
      overflow: hidden;
      border: 1px solid #e2e8f0;
      transition: transform 0.22s, box-shadow 0.22s;
    }

    .event-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 12px 32px rgba(15,23,42,0.12);
    }

    .card-img-wrap { position: relative; }

    .card-img {
      width: 100%;
      height: 185px;
      object-fit: cover;
      display: block;
    }

    .badge-featured {
      position: absolute;
      top: 12px;
      left: 12px;
      display: inline-flex;
      align-items: center;
      gap: 4px;
      background: #fff;
      color: #7c3aed;
      padding: 4px 10px;
      border-radius: 50px;
      font-size: 11px;
      font-weight: 700;
      box-shadow: 0 2px 8px rgba(0,0,0,0.15);
    }

    .badge-featured mat-icon { font-size:12px; width:12px; height:12px; }

    .card-body { padding: 18px; }

    .card-category {
      display: inline-block;
      background: #ede9fe;
      color: #6d28d9;
      padding: 2px 10px;
      border-radius: 50px;
      font-size: 11px;
      font-weight: 700;
      text-transform: uppercase;
      margin-bottom: 8px;
    }

    .card-title {
      font-size: 16px;
      font-weight: 700;
      color: #0f172a;
      margin: 0 0 10px;
      line-height: 1.3;
    }

    .card-meta {
      display: flex;
      flex-direction: column;
      gap: 5px;
      font-size: 12px;
      color: #64748b;
      margin-bottom: 14px;
    }

    .card-meta span {
      display: flex;
      align-items: center;
      gap: 6px;
    }

    .card-meta mat-icon { font-size:14px; width:14px; height:14px; }

    .card-footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-top: 1px solid #f1f5f9;
      padding-top: 14px;
    }

    .card-price {
      font-size: 18px;
      font-weight: 800;
      color: #7c3aed;
    }

    .btn-card {
      font-size: 13px;
      font-weight: 600;
      color: #7c3aed;
      text-decoration: none;
      transition: gap 0.2s;
    }

    .btn-card:hover { text-decoration: underline; }

    /* ── Stats band ── */
    .stats-band {
      background: #0f172a;
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 0;
      padding: 48px 24px;
      flex-wrap: wrap;
    }

    .stat {
      text-align: center;
      padding: 0 48px;
    }

    .stat-num {
      display: block;
      font-size: 38px;
      font-weight: 800;
      color: #a78bfa;
      letter-spacing: -1px;
    }

    .stat-label {
      font-size: 13px;
      color: rgba(255,255,255,0.5);
      text-transform: uppercase;
      letter-spacing: 1px;
      margin-top: 4px;
      display: block;
    }

    .stat-divider {
      width: 1px;
      height: 48px;
      background: rgba(255,255,255,0.1);
    }

    /* ── Features ── */
    .features-section { background: #fff; border-radius: 0; padding-top: 80px; padding-bottom: 80px; }

    .features-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
      gap: 24px;
    }

    .feature-card {
      background: #f7f8fc;
      border: 1px solid #e2e8f0;
      border-radius: 14px;
      padding: 32px 24px;
      text-align: center;
      transition: transform 0.2s, box-shadow 0.2s;
    }

    .feature-card:hover {
      transform: translateY(-4px);
      box-shadow: 0 8px 28px rgba(15,23,42,0.08);
    }

    .feature-icon {
      width: 52px;
      height: 52px;
      border-radius: 14px;
      background: #ede9fe;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto 18px;
    }

    .feature-icon mat-icon {
      font-size: 26px;
      width: 26px;
      height: 26px;
      color: #7c3aed;
    }

    .feature-card h3 {
      font-size: 15px;
      font-weight: 700;
      color: #0f172a;
      margin: 0 0 6px;
    }

    .feature-card p {
      font-size: 13px;
      color: #64748b;
      line-height: 1.55;
      margin: 0;
    }

    @media (max-width: 768px) {
      .hero-content h1 { font-size: 34px; letter-spacing: -0.5px; }
      .hero { padding: 70px 20px; }
      .section-head h2 { font-size: 26px; }
      .stats-band { gap: 24px; flex-direction: column; }
      .stat-divider { display: none; }
      .stat { padding: 12px 0; }
    }
  `]
})
export class HomeComponent implements OnInit {
  private eventService = inject(EventService);
  featuredEvents$ = this.eventService.getFeaturedEvents();

  ngOnInit(): void {
    this.eventService.getAllEvents().subscribe(events => {
      const el = document.getElementById('eventCount');
      if (el) el.textContent = events.length.toString();
    });
  }
}
