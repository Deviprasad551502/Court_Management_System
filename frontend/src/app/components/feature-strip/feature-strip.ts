import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { DarkSectionComponent } from '../dark-section/dark-section';

@Component({
  selector: 'app-feature-strip',
  standalone: true,
  imports: [CommonModule, DarkSectionComponent],
  templateUrl: './feature-strip.html',
  styleUrl: './feature-strip.css',
})
export class FeatureStripComponent {
  features = [
    {
      title: 'Unmatched Coverage',
      desc: 'Comprehensive coverage across federal and state courts.',
    },
    {
      title: 'AI-Powered Data Extraction',
      desc: 'Advanced AI to structure litigation data.',
    },
    {
      title: 'Docket Data, Where You Need It',
      desc: 'APIs and integrations for seamless workflows.',
    },
  ];
}
