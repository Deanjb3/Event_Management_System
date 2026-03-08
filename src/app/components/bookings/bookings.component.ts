import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { BookingService } from '../../services/booking.service';
import { Booking } from '../../models/event.model';
import { ConfirmDialogComponent, ConfirmDialogData } from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-bookings',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    MatDialogModule,
    MatSnackBarModule,
    MatTableModule,
    CurrencyPipe,
    DatePipe
  ],
  template: `
    <div class="page-wrap">
      <div class="page-hero">
        <h1>My Bookings</h1>
        <p>View and manage all your event bookings</p>
      </div>

      <div class="search-row">
        <div class="search-box">
          <mat-icon>search</mat-icon>
          <input
            type="text"
            [(ngModel)]="searchEmail"
            (ngModelChange)="searchBookings()"
            placeholder="Search by email address..."
            class="search-input"
          />
          <button *ngIf="searchEmail" class="search-clear" (click)="searchEmail = ''; searchBookings()">
            <mat-icon>close</mat-icon>
          </button>
        </div>
      </div>

      <div *ngIf="bookings.length === 0" class="empty-state">
        <mat-icon>event_busy</mat-icon>
        <h3>{{ searchEmail ? 'No results found' : 'No bookings yet' }}</h3>
        <p>{{ searchEmail ? 'Try searching with a different email.' : 'Book an event to get started!' }}</p>
      </div>

      <div *ngIf="bookings.length > 0" class="table-container mat-elevation-z2">
        <table mat-table [dataSource]="bookings" class="mat-table">
          
          <!-- Event Column -->
          <ng-container matColumnDef="eventTitle">
            <th mat-header-cell *matHeaderCellDef> Event </th>
            <td mat-cell *matCellDef="let booking">
              <span class="booking-id">#{{ booking.id }}</span>
              <div class="booking-title">{{ booking.eventTitle }}</div>
            </td>
          </ng-container>

          <!-- User Info Column -->
          <ng-container matColumnDef="userInfo">
            <th mat-header-cell *matHeaderCellDef> Guest info </th>
            <td mat-cell *matCellDef="let booking"> 
              <div class="user-text">{{ booking.userName }}</div>
              <div class="sub-text">{{ booking.email }}</div>
            </td>
          </ng-container>

          <!-- Status Column -->
          <ng-container matColumnDef="status">
            <th mat-header-cell *matHeaderCellDef> Status </th>
            <td mat-cell *matCellDef="let booking"> 
              <span class="status-pill" [ngClass]="'pill-' + booking.status">
                {{ booking.status | titlecase }}
              </span>
            </td>
          </ng-container>

          <!-- Date Column -->
          <ng-container matColumnDef="bookingDate">
            <th mat-header-cell *matHeaderCellDef> Date </th>
            <td mat-cell *matCellDef="let booking"> {{ booking.bookingDate | date: 'MMM d, yyyy' }} </td>
          </ng-container>

          <!-- Price Column -->
          <ng-container matColumnDef="totalPrice">
            <th mat-header-cell *matHeaderCellDef> Total </th>
            <td mat-cell *matCellDef="let booking" class="price-cell"> {{ booking.totalPrice | currency }} </td>
          </ng-container>

          <!-- Actions Column -->
          <ng-container matColumnDef="actions">
            <th mat-header-cell *matHeaderCellDef class="actions-header"> Actions </th>
            <td mat-cell *matCellDef="let booking" class="actions-cell">
              <button class="action-btn" title="Download Receipt" (click)="downloadReceipt(booking)">
                <mat-icon>download</mat-icon>
              </button>
              <button class="action-btn btn-danger" *ngIf="booking.status !== 'cancelled'" title="Cancel Booking" (click)="cancelBooking(booking)">
                <mat-icon>cancel</mat-icon>
              </button>
            </td>
          </ng-container>

          <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
          <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
        </table>
      </div>
    </div>
  `,
  styles: [`
    .page-wrap {
      max-width: 1000px;
      margin: 0 auto;
      padding: 48px 24px;
    }

    .page-hero { margin-bottom: 32px; }

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

    /* Search */
    .search-row { margin-bottom: 32px; }

    .search-box {
      display: flex;
      align-items: center;
      gap: 10px;
      background: #fff;
      border: 1.5px solid #e2e8f0;
      border-radius: 12px;
      padding: 10px 16px;
      max-width: 400px;
      transition: border-color 0.18s;
    }

    .search-box:focus-within {
      border-color: #7c3aed;
      box-shadow: 0 0 0 3px rgba(124,58,237,0.08);
    }

    .search-box mat-icon { color: #94a3b8; font-size:20px; width:20px; height:20px; }

    .search-input {
      flex: 1;
      border: none;
      outline: none;
      font-size: 14px;
      color: #0f172a;
      background: transparent;
      font-family: inherit;
    }

    .search-input::placeholder { color: #94a3b8; }

    .search-clear {
      background: none;
      border: none;
      cursor: pointer;
      padding: 0;
      display: flex;
      color: #94a3b8;
    }

    .search-clear mat-icon { font-size:18px; width:18px; height:18px; }

    /* Empty */
    .empty-state {
      text-align: center;
      padding: 80px 20px;
      color: #94a3b8;
    }

    .empty-state mat-icon {
      font-size: 64px;
      width: 64px;
      height: 64px;
      margin: 0 auto 16px;
      display: block;
      opacity: 0.4;
    }

    .empty-state h3 { font-size: 20px; color: #475569; margin: 0 0 8px; }
    .empty-state p  { font-size: 14px; margin: 0; }

    /* Material Table Overrides */
    .table-container {
      background: #fff;
      border-radius: 12px;
      overflow: hidden;
      border: 1px solid #e2e8f0;
      box-shadow: 0 4px 15px rgba(0,0,0,0.03);
    }
    
    table.mat-table {
      width: 100%;
    }
    
    th.mat-header-cell {
      background: #f8fafc;
      color: #475569;
      font-weight: 700;
      font-size: 13px;
      padding: 16px;
    }

    td.mat-cell {
      padding: 16px;
      vertical-align: middle;
      border-bottom-color: #f1f5f9;
    }

    .booking-id {
      display: block;
      font-size: 11px;
      color: #94a3b8;
      font-family: monospace;
      margin-bottom: 2px;
    }

    .booking-title {
      font-weight: 700;
      color: #0f172a;
      font-size: 14px;
    }

    .user-text { font-weight: 600; color: #334155; font-size: 14px; }
    .sub-text { font-size: 12px; color: #64748b; }

    .price-cell { font-weight: 700; color: #7c3aed; }

    .actions-header { text-align: right; }
    .actions-cell { text-align: right; }

    .action-btn {
      background: transparent;
      border: transparent;
      color: #64748b;
      cursor: pointer;
      padding: 6px;
      border-radius: 6px;
      transition: all 0.2s;
    }

    .action-btn:hover { background: #f1f5f9; color: #7c3aed; }
    
    .btn-danger:hover { background: #fef2f2; color: #dc2626; }
    
    .status-pill {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      padding: 4px 12px;
      border-radius: 50px;
      font-size: 12px;
      font-weight: 700;
      white-space: nowrap;
    }

    .pill-confirmed { background: #f0fdf4; color: #15803d; }
    .pill-pending   { background: #fefce8; color: #a16207; }
    .pill-cancelled { background: #fef2f2; color: #b91c1c; }

    @media (max-width: 768px) {
      .table-container { overflow-x: auto; }
      .search-box { max-width: 100%; }
    }
  `]
})
export class BookingsComponent implements OnInit {
  bookings: Booking[] = [];
  allBookings: Booking[] = [];
  searchEmail: string = '';
  displayedColumns: string[] = ['eventTitle', 'userInfo', 'bookingDate', 'totalPrice', 'status', 'actions'];

  constructor(
    private bookingService: BookingService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadBookings();
  }

  loadBookings(): void {
    this.bookingService.getAllBookings().subscribe(bookings => {
      this.allBookings = bookings;
      if (this.searchEmail) {
        this.searchBookings();
      } else {
        this.bookings = bookings;
      }
    });
  }

  searchBookings(): void {
    if (this.searchEmail.trim() === '') {
      this.bookings = this.allBookings;
    } else {
      this.bookings = this.allBookings.filter(b =>
        b.email.toLowerCase().includes(this.searchEmail.toLowerCase())
      );
    }
  }

  cancelBooking(booking: Booking): void {
    const dialogData: ConfirmDialogData = {
      title: 'Cancel Booking',
      message: `Are you sure you want to cancel your booking for "${booking.eventTitle}"?`
    };

    this.dialog.open(ConfirmDialogComponent, { width: '420px', data: dialogData })
      .afterClosed().subscribe(result => {
        if (result) {
          this.bookingService.cancelBooking(booking.id).subscribe(success => {
            if (success) {
              this.snackBar.open('Booking cancelled.', 'OK', { duration: 3000 });
              this.loadBookings();
            }
          });
        }
      });
  }

  editBooking(booking: Booking): void {
    this.snackBar.open('Edit feature coming soon for Booking #' + booking.id, 'OK', { duration: 4000 });
  }

  downloadReceipt(booking: Booking): void {
    const content = [
      'EventHub — Booking Receipt',
      '===========================',
      `Booking ID:   #${booking.id}`,
      `Event:        ${booking.eventTitle}`,
      `Name:         ${booking.userName}`,
      `Email:        ${booking.email}`,
      `Phone:        ${booking.phoneNumber}`,
      `Tickets:      ${booking.ticketCount}`,
      `Total:        $${booking.totalPrice.toFixed(2)}`,
      `Date:         ${new Date(booking.bookingDate).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })}`,
      `Status:       ${booking.status.toUpperCase()}`,
      '',
      'Thank you for booking with EventHub!'
    ].join('\n');

    const a = document.createElement('a');
    a.href = 'data:text/plain;charset=utf-8,' + encodeURIComponent(content);
    a.download = `event_receipt_${booking.id}.txt`;
    a.style.display = 'none';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    this.snackBar.open('Receipt downloaded!', 'OK', { duration: 2500 });
  }
}
