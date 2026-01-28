import { Routes } from '@angular/router';
import {HomeComponent} from './pages/home/home';
import { Contact} from './pages/contact/contact';
import { LoginComponent } from './pages/login/login';
import { CoverageComponent } from './pages/coverage/coverage.component';

export const routes: Routes = [
  { path: '', component:HomeComponent},
  { path: 'contact', component: Contact },
  { path: 'login', component: LoginComponent },
  { path: 'coverage', component: CoverageComponent }
];
