import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './footer.html',
  styleUrl: './footer.css',
})
export class FooterComponent {
  footerCols = [
    { title: 'For Law Firms', links: ['Research', 'Tracking'] },
    { title: 'For Insurance', links: ['Risk', 'Analytics'] },
    { title: 'Products', links: ['DEEP', 'DART'] },
    { title: 'Resources', links: ['Docs', 'Blog'] },
    { title: 'Legal', links: ['Privacy', 'Terms'] },
    { title: 'Connect', links: ['LinkedIn', 'Twitter'] },
  ];
}
