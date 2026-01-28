import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { DarkSectionComponent } from '../dark-section/dark-section';
import { ButtonComponent } from '../../ui/button/button';

@Component({
  selector: 'app-cta-strip',
  standalone: true,
  imports: [CommonModule, DarkSectionComponent, ButtonComponent],
  templateUrl: './cta-strip.component.html',
})
export class CtaStripComponent {
  constructor(private router: Router) {}

  onContactClick(): void {
    this.router.navigate(['/contact']);
  }
}
