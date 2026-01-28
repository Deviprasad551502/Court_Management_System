import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface PillData {
  icon: string;
  label: string;
  position: string; // e.g., "top-[80px] left-[120px]"
}

@Component({
  selector: 'app-pill',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div [class]="'pill ' + position">
      {{ icon }} <span>{{ label }}</span>
    </div>
  `,
  styles: [`
    .pill {
      position: absolute;
      display: flex;
      align-items: center;
      gap: 8px;
      background: #ffffff;
      padding: 10px 18px;
      border-radius: 9999px;
      font-size: 14px;
      font-weight: 500;
      color: #0a2540;
      box-shadow:
        0 1px 2px rgba(0, 0, 0, 0.04),
        0 6px 18px rgba(0, 0, 0, 0.10);
    }
  `]
})
export class PillComponent {
  @Input() icon = '';
  @Input() label = '';
  @Input() position = '';
}
