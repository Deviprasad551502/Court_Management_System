import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

export interface DropdownItem {
  icon: string;
  title: string;
  description: string;
}

@Component({
  selector: 'app-dropdown',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dropdown.html',
})
export class DropdownComponent {
  @Input() items: DropdownItem[] = [];
}
