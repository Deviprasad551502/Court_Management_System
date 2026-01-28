import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HeroComponent } from '../../components/hero/hero';
import { FeatureStripComponent } from '../../components/feature-strip/feature-strip';
import { IndustriesComponent } from '../../components/industries/industries';
import { ProductsComponent } from '../../components/products/products';
import { CtaStripComponent } from '../../components/cta-strip/cta-strip.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    HeroComponent,
    FeatureStripComponent,
    IndustriesComponent,
    ProductsComponent,
    CtaStripComponent
  ],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class HomeComponent {}
