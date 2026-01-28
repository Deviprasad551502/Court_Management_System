import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ButtonComponent } from '../../ui/button/button';
import { CardComponent } from '../../ui/card/card';
import { SectionComponent } from '../section/section';

@Component({
  selector: 'app-industries',
  standalone: true,
  imports: [CommonModule, ButtonComponent, CardComponent, SectionComponent],
  templateUrl: './industries.html',
  styleUrl: './industries.css',
})
export class IndustriesComponent {
  lawFirmCards = [
    'Docket Research',
    'Litigation Strategy',
    'Docket Tracking',
    'Experience Management',
  ];

  insuranceCards = [
    'Litigation Risk and Strategy',
    'Attorney and Law Firm Master Data Management',
  ];
}
