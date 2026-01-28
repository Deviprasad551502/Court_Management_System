import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-section',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './section.html',
})
export class SectionComponent {
  @Input() label = '';
  @Input() heading = '';
  @Input() bgVariant: 'white' | 'gray' = 'white';
  @Input() headingMaxWidth = '820px';
  @Input() contentMarginBottom = '80px';
}
