import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { CurrencyPipe } from '@angular/common';
import { BookingService } from '../../services/booking.service';
import { EventService } from '../../services/event.service';
import { Event } from '../../models/event.model';

@Component({
  selector: 'app-booking-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    CurrencyPipe
  ],
  template: `
    <div class="dialog-wrap">
      <!-- Header -->
      <div class="dialog-head">
        <div class="head-icon"><mat-icon>confirmation_number</mat-icon></div>
        <div>
          <h2>Book Tickets</h2>
          <p class="event-name">{{ data.event.title }}</p>
        </div>
        <button class="close-btn" (click)="onCancel()"><mat-icon>close</mat-icon></button>
      </div>

      <!-- Event quick info -->
      <div class="event-bar">
        <span><mat-icon>calendar_today</mat-icon>{{ data.event.date }}</span>
        <span><mat-icon>location_on</mat-icon>{{ data.event.location }}</span>
        <span class="avail"><mat-icon>confirmation_number</mat-icon>{{ data.event.availableTickets }} available</span>
      </div>

      <!-- Form -->
      <form [formGroup]="bookingForm" (ngSubmit)="onSubmit()" class="form">

        <mat-form-field appearance="outline" class="w100">
          <mat-label>Full Name</mat-label>
          <mat-icon matPrefix>person</mat-icon>
          <input matInput formControlName="userName" placeholder="Your full name">
          <mat-error *ngIf="bookingForm.get('userName')?.hasError('required')">Name is required</mat-error>
          <mat-error *ngIf="bookingForm.get('userName')?.hasError('minlength')">Minimum 2 characters</mat-error>
        </mat-form-field>

        <mat-form-field appearance="outline" class="w100">
          <mat-label>Email Address</mat-label>
          <mat-icon matPrefix>email</mat-icon>
          <input matInput formControlName="email" type="email" placeholder="you@example.com">
          <mat-error *ngIf="bookingForm.get('email')?.hasError('required')">Email is required</mat-error>
          <mat-error *ngIf="bookingForm.get('email')?.hasError('email')">Enter a valid email</mat-error>
        </mat-form-field>

        <mat-form-field appearance="outline" class="w100">
          <mat-label>Phone Number</mat-label>
          <mat-icon matPrefix>phone</mat-icon>
          <input matInput formControlName="phoneNumber" placeholder="9876543210 or +91 98765 43210">
          <mat-error *ngIf="bookingForm.get('phoneNumber')?.hasError('required')">Phone is required</mat-error>
          <mat-error *ngIf="bookingForm.get('phoneNumber')?.hasError('pattern')">Enter a valid 10-digit number</mat-error>
        </mat-form-field>

        <mat-form-field appearance="outline" class="w100">
          <mat-label>Number of Tickets</mat-label>
          <mat-icon matPrefix>confirmation_number</mat-icon>
          <mat-select formControlName="ticketCount">
            <mat-option *ngFor="let i of getTicketOptions()" [value]="i">
              {{ i }} {{ i === 1 ? 'Ticket' : 'Tickets' }}
            </mat-option>
          </mat-select>
          <mat-error *ngIf="bookingForm.get('ticketCount')?.hasError('required')">Please select tickets</mat-error>
        </mat-form-field>

        <!-- Price summary -->
        <div class="price-summary">
          <div class="ps-row">
            <span>Price per ticket</span>
            <span>{{ data.event.price | currency }}</span>
          </div>
          <div class="ps-row">
            <span>Quantity</span>
            <span>× {{ bookingForm.get('ticketCount')?.value || 1 }}</span>
          </div>
          <div class="ps-row ps-total">
            <span>Total</span>
            <strong class="ps-total-price">{{ calculateTotal() | currency }}</strong>
          </div>
        </div>

        <!-- Actions -->
        <div class="form-actions">
          <button type="button" class="btn-cancel" (click)="onCancel()">Cancel</button>
          <button type="submit" class="btn-submit" [disabled]="!bookingForm.valid || isSubmitting">
            <mat-icon>{{ isSubmitting ? 'hourglass_empty' : 'shopping_cart' }}</mat-icon>
            {{ isSubmitting ? 'Processing...' : 'Confirm Booking' }}
          </button>
        </div>

        <div *ngIf="successMessage" class="alert alert-success">
          <mat-icon>check_circle</mat-icon> {{ successMessage }}
        </div>

        <div *ngIf="errorMessage" class="alert alert-error">
          <mat-icon>error</mat-icon> {{ errorMessage }}
        </div>
      </form>
    </div>
  `,
  styles: [`
    .dialog-wrap {
      padding: 0;
      min-width: 420px;
      overflow: hidden;
    }

    /* Header */
    .dialog-head {
      display: flex;
      align-items: center;
      gap: 14px;
      padding: 24px 22px 18px;
      border-bottom: 1px solid #f1f5f9;
    }

    .head-icon {
      width: 44px;
      height: 44px;
      border-radius: 12px;
      background: #ede9fe;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }

    .head-icon mat-icon {
      color: #7c3aed;
      font-size: 22px;
      width: 22px;
      height: 22px;
    }

    h2 {
      margin: 0 0 2px;
      font-size: 18px;
      font-weight: 800;
      color: #0f172a;
    }

    .event-name {
      margin: 0;
      font-size: 13px;
      color: #7c3aed;
      font-weight: 500;
    }

    .close-btn {
      margin-left: auto;
      background: none;
      border: none;
      cursor: pointer;
      padding: 6px;
      border-radius: 8px;
      color: #94a3b8;
      display: flex;
    }

    .close-btn:hover { background: #f1f5f9; color: #475569; }

    /* Event bar */
    .event-bar {
      display: flex;
      gap: 16px;
      flex-wrap: wrap;
      padding: 12px 22px;
      background: #f7f8fc;
      font-size: 12px;
      color: #64748b;
      border-bottom: 1px solid #f1f5f9;
    }

    .event-bar span {
      display: flex;
      align-items: center;
      gap: 5px;
    }

    .event-bar mat-icon { font-size:14px; width:14px; height:14px; color:#a78bfa; }

    .avail { color: #16a34a; font-weight: 600; }

    /* Form */
    .form {
      display: flex;
      flex-direction: column;
      gap: 6px;
      padding: 20px 22px 22px;
    }

    .w100 { width: 100%; }

    /* Price summary */
    .price-summary {
      background: #f7f8fc;
      border: 1px solid #e2e8f0;
      border-radius: 10px;
      padding: 14px 16px;
      margin: 4px 0 10px;
    }

    .ps-row {
      display: flex;
      justify-content: space-between;
      font-size: 13px;
      color: #64748b;
      padding: 4px 0;
    }

    .ps-total {
      border-top: 1.5px solid #e2e8f0;
      margin-top: 8px;
      padding-top: 10px;
      font-size: 15px;
      color: #0f172a;
    }

    .ps-total-price {
      color: #7c3aed;
      font-size: 20px;
      font-weight: 900;
    }

    /* Actions */
    .form-actions {
      display: flex;
      gap: 10px;
      justify-content: flex-end;
    }

    .btn-cancel {
      background: transparent;
      border: 1.5px solid #e2e8f0;
      color: #64748b;
      padding: 10px 20px;
      border-radius: 10px;
      font-size: 14px;
      font-weight: 600;
      cursor: pointer;
      transition: border-color 0.18s;
      font-family: inherit;
    }

    .btn-cancel:hover { border-color: #94a3b8; }

    .btn-submit {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      background: #7c3aed;
      color: #fff;
      border: none;
      border-radius: 10px;
      padding: 10px 22px;
      font-size: 14px;
      font-weight: 700;
      cursor: pointer;
      transition: background 0.18s;
      font-family: inherit;
    }

    .btn-submit:hover:not(:disabled) { background: #6d28d9; }
    .btn-submit:disabled { background: #cbd5e1; cursor: not-allowed; }
    .btn-submit mat-icon { font-size:18px; width:18px; height:18px; }

    /* Alerts */
    .alert {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 12px 14px;
      border-radius: 10px;
      font-size: 13px;
      font-weight: 500;
      animation: slideIn 0.25s ease;
    }

    .alert mat-icon { font-size:18px; width:18px; height:18px; }

    .alert-success { background: #f0fdf4; color: #15803d; }
    .alert-error   { background: #fef2f2; color: #dc2626; }

    @keyframes slideIn {
      from { opacity: 0; transform: translateY(-6px); }
      to   { opacity: 1; transform: translateY(0); }
    }

    @media (max-width: 480px) {
      .dialog-wrap { min-width: unset; }
      .form { padding: 16px; }
    }
  `]
})
export class BookingFormComponent implements OnInit {
  bookingForm!: FormGroup;
  isSubmitting = false;
  successMessage = '';
  errorMessage = '';

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<BookingFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { event: Event },
    private bookingService: BookingService,
    private eventService: EventService
  ) {
    this.initializeForm();
  }

  ngOnInit(): void {
    this.bookingForm.get('ticketCount')?.setValue(1);
  }

  private initializeForm(): void {
    this.bookingForm = this.fb.group({
      userName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', [Validators.required, Validators.pattern(/^(\+?\d{1,3}[\s-]?)?\d{10}$/)]],
      ticketCount: [1, [Validators.required, Validators.min(1)]]
    });
  }

  getTicketOptions(): number[] {
    const max = Math.min(this.data.event.availableTickets, 10);
    return Array.from({ length: max }, (_, i) => i + 1);
  }

  calculateTotal(): number {
    return this.data.event.price * (this.bookingForm.get('ticketCount')?.value || 1);
  }

  onSubmit(): void {
    if (this.bookingForm.invalid) {
      this.bookingForm.markAllAsTouched();
      this.errorMessage = 'Please fill in all required fields correctly.';
      return;
    }

    this.isSubmitting = true;
    this.errorMessage = '';
    this.successMessage = '';

    const fv = this.bookingForm.value;
    this.bookingService.createBooking({
      eventId: this.data.event.id,
      eventTitle: this.data.event.title,
      userName: fv.userName,
      email: fv.email,
      phoneNumber: fv.phoneNumber,
      ticketCount: fv.ticketCount,
      totalPrice: this.calculateTotal()
    }).subscribe(
      booking => {
        this.eventService.updateEventTickets(this.data.event.id, fv.ticketCount);
        this.successMessage = `Booking confirmed! ID: #${booking.id}`;
        this.isSubmitting = false;
        setTimeout(() => this.dialogRef.close(booking), 2200);
      },
      () => {
        this.errorMessage = 'Failed to create booking. Please try again.';
        this.isSubmitting = false;
      }
    );
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
