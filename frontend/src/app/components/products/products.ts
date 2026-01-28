import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CardComponent } from '../../ui/card/card';
import { ButtonComponent } from '../../ui/button/button';
import { SectionComponent } from '../section/section';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, CardComponent, ButtonComponent, SectionComponent],
  templateUrl: './products.html',
  styleUrl: './products.css',
})
export class ProductsComponent {
  products = [
    { title: 'UniCourt DEEP', desc: 'Enterprise litigation data platform.' },
    { title: 'UniCourt DART', desc: 'Advanced analytics and tracking.' },
    { title: 'Integrations', desc: 'APIs powered by UniCourt.' },
  ];
}
