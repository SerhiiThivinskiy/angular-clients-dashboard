import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { AppState } from '../../../../app.state';
import { NgRedux } from '@angular-redux/store';
import { Client } from '../../../../models/client';
import { BirthdayDate } from '../../../../models/birthday-date';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription[] = [];
  clients: Array<Client>;
  client: Client;

  constructor(private route: ActivatedRoute,
              private ngRedux: NgRedux<AppState>) {
  }

  ngOnInit() {
    this.subscriptions.push(this.subscribeOnClientsChanges());
    this.subscriptions.push(this.subscribeOnRouteParams());
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  getBirthdayDate(): BirthdayDate {
    return new BirthdayDate(this.client.birthDay, this.client.birthMonth, this.client.birthYear);
  }

  private subscribeOnRouteParams(): Subscription {
    return this.route.params.subscribe(
      (params: Params) => {
        this.client = this.clients.find((client: Client) => client.id == params['id']);
      }
    );
  }

  private subscribeOnClientsChanges(): Subscription {
    return this.ngRedux.select('clients').subscribe((clients: Array<Client>) => {
      this.clients = clients;
    });
  }

}
