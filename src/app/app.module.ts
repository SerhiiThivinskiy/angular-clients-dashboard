import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgReduxModule, NgRedux } from '@angular-redux/store';

import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { ClientsService } from './services/clients.service';
import { HttpModule } from '@angular/http';
import { rootReducer } from './store/root.reducer';
import { createStore } from 'redux';
import { AppState } from './app.state';
import { IndexComponent } from './components/index/index.component';
import { HeaderComponent } from './components/header/header.component';
import { APP_ROUTES } from './app.routes';


@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    NgReduxModule,
    RouterModule.forRoot(APP_ROUTES)
  ],
  providers: [
    ClientsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

  constructor(ngRedux: NgRedux<AppState>) {
    const store = createStore(rootReducer);
    ngRedux.provideStore(store);
  }
}
