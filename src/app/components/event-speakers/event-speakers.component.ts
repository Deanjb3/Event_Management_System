import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-event-speakers',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  template: `
    <div class="speakers-section">
      <h3>Featured Speakers</h3>
      <div class="speaker-card">
        <div class="avatar"><mat-icon>person</mat-icon></div>
        <div>
          <h4>{{ speakerName || 'Expert Panel' }}</h4>
          <p>Industry Professional</p>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .speakers-section {
      background: #fdf4ff;
      padding: 16px;
      border-radius: 8px;
      border: 1px solid #fbcfe8;
    }
    .speaker-card {
      display: flex;
      align-items: center;
      gap: 16px;
      margin-top: 12px;
    }
    .avatar {
      width: 48px;
      height: 48px;
      border-radius: 50%;
      background: #fcd34d;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .avatar mat-icon { color: #b45309; }
    h4 { margin: 0 0 4px; font-weight: 700; color: #0f172a; }
    p { margin: 0; font-size: 13px; color: #64748b; }
  `]
})
export class EventSpeakersComponent {
  // Can actually access parent data or route params, we'll keep it simple for mock nested routing
  speakerName = 'Core Presenter'; 
}
