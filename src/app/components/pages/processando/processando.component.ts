import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ArquivoService } from 'src/app/services/arquivo/arquivo.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-processando',
  templateUrl: './processando.component.html',
  styleUrls: ['./processando.component.css']
})
export class ProcessandoComponent implements OnInit {

  id!: string;
  fileName!: string;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    private arquivoService: ArquivoService){}

  ngOnInit(): void {

      this.route.queryParams.subscribe(params => {
      this.id = params['id'];
      this.fileName = params['fileName'];

      console.log(`route:${this.id},${this.fileName}`);
      });

  }

  processar(id: string,fileName: string)  {
   this.arquivoService.processarArquivo(id,fileName).subscribe( response =>
    console.log('Response:', response[0]));

  };

}
