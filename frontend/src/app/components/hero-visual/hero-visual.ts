import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PillComponent, PillData } from '../../ui/pill/pill';

@Component({
  selector: 'app-hero-visual',
  standalone: true,
  imports: [CommonModule, PillComponent],
  templateUrl: './hero-visual.html',
  styleUrl: './hero-visual.css',
})
export class HeroVisualComponent {
  @Input() pills: PillData[] = [];
}
