import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  apiUrl = environment.apiUrl+'clients';

  httpOptions = {
    headers:  new HttpHeaders({
      'Content-type': 'application/json'
    })
  }

  constructor(
    private httpClient: HttpClient
  ) { }


    public getClient(client : string) {
      return "Andre Souza Nunes";
    }


}
