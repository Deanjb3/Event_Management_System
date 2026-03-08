import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatRippleModule } from '@angular/material/core';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, MatIconModule, MatRippleModule],
  template: `
    <nav class="navbar">
      <a routerLink="/" class="brand">
        <mat-icon>event_available</mat-icon>
        <span>EventHub</span>
      </a>
      <div class="nav-links">
        <a routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{ exact: true }" class="nav-link" matRipple>
          <mat-icon>home</mat-icon>
          <span>Home</span>
        </a>
        <a routerLink="/events" routerLinkActive="active" class="nav-link" matRipple>
          <mat-icon>event</mat-icon>
          <span>Events</span>
        </a>
        <a routerLink="/bookings" routerLinkActive="active" class="nav-link" matRipple>
          <mat-icon>book_online</mat-icon>
          <span>My Bookings</span>
        </a>
      </div>
    </nav>
  `,
  styles: [`
    .navbar {
      position: sticky;
      top: 0;
      z-index: 1000;
      display: flex;
      align-items: center;
      height: 64px;
      padding: 0 24px;
      background: #0f172a;
      box-shadow: 0 1px 0 rgba(255,255,255,0.06), 0 4px 20px rgba(0,0,0,0.35);
    }

    .brand {
      display: flex;
      align-items: center;
      gap: 10px;
      text-decoration: none;
      color: #ffffff;
      font-size: 19px;
      font-weight: 700;
      letter-spacing: 0.3px;
    }

    .brand mat-icon {
      font-size: 24px;
      width: 24px;
      height: 24px;
      color: #a78bfa;
    }

    .nav-links {
      display: flex;
      align-items: center;
      gap: 4px;
      margin-left: auto;
    }

    .nav-link {
      display: flex;
      align-items: center;
      gap: 6px;
      padding: 8px 16px;
      border-radius: 8px;
      text-decoration: none;
      color: rgba(255,255,255,0.6);
      font-size: 14px;
      font-weight: 500;
      transition: color 0.2s, background 0.2s;
      cursor: pointer;
    }

    .nav-link mat-icon {
      font-size: 18px;
      width: 18px;
      height: 18px;
      transition: color 0.2s;
    }

    .nav-link:hover {
      color: #ffffff;
      background: rgba(255,255,255,0.08);
    }

    .nav-link.active {
      color: #a78bfa;
      background: rgba(167,139,250,0.12);
    }

    .nav-link.active mat-icon {
      color: #a78bfa;
    }

    @media (max-width: 600px) {
      .navbar {
        padding: 0 16px;
      }

      .brand span {
        display: none;
      }

      .nav-link span {
        display: none;
      }

      .nav-link {
        padding: 8px 10px;
      }
    }
  `]
})
export class NavbarComponent {}
