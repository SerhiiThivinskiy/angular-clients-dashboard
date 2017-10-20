import { RouterModule, Routes } from '@angular/router';
import { ClientComponent } from './components/client/client.component';
import { ClientCreateComponent } from './components/client-create/client-create.component';
import { ClientsComponent } from './components/clients/clients.component';

const CLIENTS_ROUTES: Routes = [
  { path: '', component: ClientsComponent },
  { path: 'new', component: ClientCreateComponent },
  { path: ':id', component: ClientComponent },
];

export const clientsRoutes = RouterModule.forChild(CLIENTS_ROUTES);
