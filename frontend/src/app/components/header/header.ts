import { CommonModule } from '@angular/common';
import { Component, ViewChild, ElementRef, HostListener } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ButtonComponent } from '../../ui/button/button';
import { DropdownComponent, DropdownItem } from '../../ui/dropdown/dropdown';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,        // ✅ REQUIRED
    ButtonComponent,
    DropdownComponent,
  ],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class HeaderComponent {
  showSolutions = false;
  showProducts = false;

  @ViewChild('solutionsRef') solutionsRef!: ElementRef;
  @ViewChild('productsRef') productsRef!: ElementRef;

  constructor(private router: Router) {}

  // 🔹 Toggle dropdowns
  toggleSolutions(): void {
    this.showSolutions = !this.showSolutions;
    this.showProducts = false;
  }

  toggleProducts(): void {
    this.showProducts = !this.showProducts;
    this.showSolutions = false;
  }

  // 🔹 Close dropdowns when clicking outside
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    const clickedTarget = event.target as HTMLElement;

    // Check if click is outside Solutions dropdown
    if (this.showSolutions && this.solutionsRef) {
      const clickedInsideSolutions = this.solutionsRef.nativeElement.contains(clickedTarget);
      if (!clickedInsideSolutions) {
        this.showSolutions = false;
      }
    }

    // Check if click is outside Products dropdown
    if (this.showProducts && this.productsRef) {
      const clickedInsideProducts = this.productsRef.nativeElement.contains(clickedTarget);
      if (!clickedInsideProducts) {
        this.showProducts = false;
      }
    }
  }

  // 🔹 Contact button click → ROUTE
  onContactClick(): void {
    this.closeDropdowns();        // ✅ UX improvement
    this.router.navigate(['/contact']);
  }

  // 🔹 Login button click → ROUTE
  onLoginClick(): void {
    this.closeDropdowns();
    this.router.navigate(['/login']);
  }

  private closeDropdowns(): void {
    this.showSolutions = false;
    this.showProducts = false;
  }

  // 🔹 Solutions dropdown data
  solutionsDropdown: DropdownItem[] = [
    {
      icon: '📂',
      title: 'Docket Research',
      description:
        'Find dockets, documents, pleadings, motions, and rulings on cases important to your team.',
    },
    {
      icon: '⚖️',
      title: 'Litigation Strategy',
      description:
        'Assess risks based on opposing counsel and their trial outcomes.',
    },
    {
      icon: '📄',
      title: 'Docket Tracking',
      description:
        'Automate docket tracking to reduce errors, decrease costs, and eliminate manual work.',
    },
    {
      icon: '👥',
      title: 'Experience Management',
      description:
        'Get clean, complete matter and entity data for accurate insights and faster RFPs.',
    },
  ];

  // 🔹 Products dropdown data
  productsDropdown: DropdownItem[] = [
    {
      icon: '🟦',
      title: 'UniCourt DEEP (API, Widgets, and Data Share)',
      description:
        'AI-powered docket extraction and enrichment pipeline extracting insights from billions of dockets.',
    },
    {
      icon: '🟢',
      title: 'UniCourt DART',
      description:
        'Application for docket analytics, research, and seamless case tracking.',
    },
    {
      icon: '🧩',
      title: 'Integrations Powered by UniCourt',
      description:
        'Integrate UniCourt data into warehouses, lakes, docketing apps, and more.',
    },
  ];
}
