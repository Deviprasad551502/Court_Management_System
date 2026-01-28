import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonComponent } from '../../ui/button/button';
import { HeroLayoutComponent } from '../hero-layout/hero-layout';
import { HeroVisualComponent } from '../hero-visual/hero-visual';
import { PillData } from '../../ui/pill/pill';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule, ButtonComponent, HeroLayoutComponent, HeroVisualComponent],
  templateUrl: './hero.html',
  styleUrl: './hero.css',
})
export class HeroComponent {
  constructor(private router: Router) {}

  onGetStartedClick(): void {
    this.router.navigate(['/contact']);
  }

  pills: PillData[] = [
    { icon: '🏢', label: 'Law Firms', position: 'top-[80px] left-[120px]' },
    { icon: '📁', label: 'Dockets', position: 'top-[130px] right-[100px]' },
    { icon: '📄', label: 'Documents', position: 'top-[210px] left-[60px]' },
    { icon: '👥', label: 'Parties', position: 'top-[240px] right-[60px]' },
    { icon: '👨‍⚖️', label: 'Attorneys', position: 'top-[310px] left-[180px]' },
    { icon: '🧑‍⚖️', label: 'Judges', position: 'bottom-[90px] left-[100px]' },
    { icon: '📊', label: 'Analytics', position: 'bottom-[120px] right-[120px]' },
  ];
}
