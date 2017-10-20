import { Component, OnDestroy, OnInit } from '@angular/core';
import { ClientsService } from '../../../../services/clients.service';
import { Client } from '../../../../models/client';
import { BirthdayDate } from '../../../../models/birthday-date';
import { AppState } from '../../../../app.state';
import { NgRedux } from '@angular-redux/store';
import { Subscription } from 'rxjs/Subscription';
import { SearchParams } from '../../../../models/search-params';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription[] = [];

  private readonly MAX_RECORDS: number = 20;
  clients: Array<Client>;
  filteredClients: Array<Client>;

  filterParams = {
    name: '',
    gender: '',
  };

  searchParams: SearchParams = {
    start: 0,
    limit: this.MAX_RECORDS,
  };

  genders = [
    { key: 'All', value: '' },
    { key: 'Male', value: 'male' },
    { key: 'Female', value: 'female' },
  ];

  constructor(private clientsService: ClientsService,
              private ngRedux: NgRedux<AppState>) {
  }

  ngOnInit() {
    this.fetchUsers();
    this.subscriptions.push(this.subscribeOnClientsChanges());
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  fetchUsers(page: number = 1) {

    this.searchParams.start = (page - 1) * this.MAX_RECORDS;

    this.clientsService.getClients(this.searchParams).subscribe(
      response => {
        this.ngRedux.dispatch({
          type: 'UPDATE_CLIENTS',
          payload: {
            clients: response
          }
        });
      },
      console.log
    );
  }

  filter() {
    this.filteredClients =  this.clients.filter(
      (client: Client) => client.name.toLowerCase().includes(this.filterParams.name.toLowerCase()) &&
        client.gender.includes(this.filterParams.gender)
    );
  }

  getBirthdayDate(client: Client): BirthdayDate {
    return new BirthdayDate(client.birthDay, client.birthMonth, client.birthYear);
  }

  private subscribeOnClientsChanges(): Subscription {
    return this.ngRedux.select('clients').subscribe((clients: Array<Client>) => {
      this.clients = clients;
      this.filter();
    });
  }

}
