import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-hero-layout',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="bg-white">
      <div class="max-w-[1280px] mx-auto px-8 py-[120px] grid grid-cols-[520px_1fr] gap-[120px]">
        <ng-content></ng-content>
      </div>
    </section>
  `,
})
export class HeroLayoutComponent {}
