import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

export interface ConfirmDialogData {
  title: string;
  message: string;
}

@Component({
  selector: 'app-confirm-dialog',
  standalone: true,
  imports: [MatDialogModule, MatIconModule, CommonModule],
  template: `
    <div class="dlg">
      <div class="dlg-icon">
        <mat-icon>warning_amber</mat-icon>
      </div>
      <h2>{{ data.title }}</h2>
      <p>{{ data.message }}</p>
      <div class="dlg-actions">
        <button class="btn-cancel" (click)="onCancel()">Cancel</button>
        <button class="btn-confirm" (click)="onConfirm()">
          <mat-icon>check</mat-icon> Confirm
        </button>
      </div>
    </div>
  `,
  styles: [`
    .dlg {
      padding: 28px 24px;
      min-width: 340px;
      text-align: center;
    }

    .dlg-icon {
      width: 52px;
      height: 52px;
      border-radius: 50%;
      background: #fef3c7;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto 18px;
    }

    .dlg-icon mat-icon {
      font-size: 26px;
      width: 26px;
      height: 26px;
      color: #d97706;
    }

    h2 {
      font-size: 18px;
      font-weight: 700;
      color: #0f172a;
      margin: 0 0 10px;
    }

    p {
      font-size: 14px;
      color: #64748b;
      line-height: 1.6;
      margin: 0;
    }

    .dlg-actions {
      display: flex;
      gap: 10px;
      justify-content: center;
      margin-top: 24px;
    }

    .btn-cancel {
      background: transparent;
      border: 1.5px solid #e2e8f0;
      color: #64748b;
      padding: 9px 20px;
      border-radius: 9px;
      font-size: 14px;
      font-weight: 600;
      cursor: pointer;
      font-family: inherit;
      transition: border-color 0.15s;
    }

    .btn-cancel:hover { border-color: #94a3b8; }

    .btn-confirm {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      background: #dc2626;
      color: #fff;
      border: none;
      border-radius: 9px;
      padding: 9px 20px;
      font-size: 14px;
      font-weight: 700;
      cursor: pointer;
      font-family: inherit;
      transition: background 0.15s;
    }

    .btn-confirm:hover { background: #b91c1c; }
    .btn-confirm mat-icon { font-size:16px; width:16px; height:16px; }
  `]
})
export class ConfirmDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ConfirmDialogData
  ) {}

  onConfirm(): void { this.dialogRef.close(true); }
  onCancel(): void  { this.dialogRef.close(false); }
}
