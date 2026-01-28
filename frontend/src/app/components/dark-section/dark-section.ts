import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dark-section',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="bg-[#071b2f] py-[80px]">
      <div class="max-w-7xl mx-auto px-8">
        <ng-content></ng-content>
      </div>
    </section>
  `,
})
export class DarkSectionComponent {}
