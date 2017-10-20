import { Injectable } from '@angular/core';
import { Http, RequestOptions, Response, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { environment } from '../../environments/environment'
import { Client } from 'app/models/client';

@Injectable()
export class ClientsService {
  private static CLIENTS_URN = '/api/clients';

  constructor(private http: Http) { }

  getClients(searchParams: any): Observable<Array<Client>> {
    const params: URLSearchParams = new URLSearchParams();
    params.set('_start', searchParams.start);
    params.set('_limit', searchParams.limit);

    const options: RequestOptions = new RequestOptions({ params: params });
    return this.http.get(this.getUri(), options)
      .map(this.handleResponse)
      .catch(this.handleError);
  }

  createClient(client: Client) {
    return this.http.post(this.getUri(), client)
      .map(this.handleResponse)
      .catch(this.handleError);
  }

  private getUri(): string {
    return environment.apiUrl.replace(/\/$/, '') + ClientsService.CLIENTS_URN;
  }

  private handleResponse = (response: Response): any => {
    console.log('handleResponse ', response);

    const resp: any = response.json();

    if (response.status !== 200) {
      throw response.statusText;
    }
    return resp;
  };


  private handleError = (error: Response | any) => {
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.toString();
    }

    return Observable.throw(errMsg);
  };

}
