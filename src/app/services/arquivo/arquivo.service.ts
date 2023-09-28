import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ArquivoService {

  apiUrl = environment.apiUrl;

  usuario = 'andre.nunes';



  httpOptions = {
    headers:  new HttpHeaders({
      'Content-type': 'application/json'
    })
  }


  constructor( private http: HttpClient) { }

  public getArquivo() {
    return  this.http.get<any>( this.apiUrl+'/files');
  }

  public postArquivo(files:any) {

    return  this.http.post<any>( this.apiUrl+'/send/file', files);

  }

  processarArquivo(id: string, fileName: string): Observable <any>  {
    const headers = { "Content-Type": "application/json"}
    const body=JSON.stringify({id: id, name: fileName});

    console.log('body:',body)

    return this.http.post<any>( this.apiUrl+'/process/file', body,  {headers: headers});

  }

}
