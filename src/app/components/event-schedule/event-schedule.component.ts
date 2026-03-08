import { Component } from '@angular/core';

@Component({
  selector: 'app-event-schedule',
  standalone: true,
  template: `
    <div class="schedule-section">
      <h3>Event Timetable</h3>
      <ul class="timeline">
        <li><strong>09:00 AM</strong> - Registration & Check-in</li>
        <li><strong>10:00 AM</strong> - Keynote Speech</li>
        <li><strong>11:30 AM</strong> - Interactive Session</li>
        <li><strong>01:00 PM</strong> - Networking Lunch</li>
        <li><strong>02:00 PM</strong> - Closing Remarks</li>
      </ul>
    </div>
  `,
  styles: [`
    .schedule-section {
      background: #f8fafc;
      padding: 16px;
      border-radius: 8px;
      border: 1px solid #e2e8f0;
    }
    .timeline {
      list-style-type: none;
      padding-left: 0;
      margin: 0;
    }
    .timeline li {
      padding: 8px 0;
      border-bottom: 1px dashed #cbd5e1;
      font-size: 14px;
      color: #334155;
    }
    .timeline li:last-child {
      border-bottom: none;
    }
    .timeline strong {
      color: #7c3aed;
      margin-right: 12px;
      display: inline-block;
      width: 70px;
    }
  `]
})
export class EventScheduleComponent {}
