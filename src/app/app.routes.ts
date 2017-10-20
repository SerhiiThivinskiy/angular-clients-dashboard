import { Routes } from '@angular/router';
import { IndexComponent } from './components/index/index.component';

export const APP_ROUTES: Routes = [
  { path: '', component: IndexComponent },
  { path: 'clients',  loadChildren: 'app/modules/clients/clients.module#ClientsModule' },
  { path: '**', redirectTo: '' }
];
