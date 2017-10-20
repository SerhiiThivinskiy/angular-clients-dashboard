import { NgModule } from '@angular/core';
import { clientsRoutes } from './clients.routes';
import { ClientsComponent } from './components/clients/clients.component';
import { ClientCreateComponent } from './components/client-create/client-create.component';
import { ClientComponent } from './components/client/client.component';
import { BirthdayPipe } from '../../pipes/birthday-pipe';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    ClientsComponent,
    ClientCreateComponent,
    ClientComponent,
    BirthdayPipe,
  ],
  imports: [
    SharedModule,
    clientsRoutes
  ]
})
export class ClientsModule {}
