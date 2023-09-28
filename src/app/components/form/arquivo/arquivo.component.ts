import { Component, OnInit,  Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

import { Arquivo } from '../../../Arquivo';
import { ArquivoService } from 'src/app/services/arquivo/arquivo.service';

@Component({
  selector: 'app-arquivo',
  templateUrl: './arquivo.component.html',
  styleUrls: ['./arquivo.component.css']
})
export class ArquivoComponent implements OnInit {

  arquivoForm!: FormGroup;

  @Output() onSubmit = new EventEmitter<Arquivo>();
  @Input() btnText!: string;
  @Input() arquivoData: Arquivo | null = null;

  myFiles:string [] = [];
  files: Arquivo [] = [];

  usuario: string = 'andre.nunes';

  myForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    files: new FormControl('', [Validators.required])
  });

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private arquivoService: ArquivoService
  ){}

  ngOnInit(): void {
    if(this.arquivoData) {
      this.arquivoForm = this.fb.group({
        id: new FormControl(this.arquivoData.id),
        files: new FormControl(this.arquivoData.file)
      });
    } else {
      this.arquivoForm = this.fb.group({
        id: new FormControl(''),
        files: new FormControl('', [Validators.required])
      })
    }
    this.getFiles();
  }

  onFileChange(event:any) {

    for (var i = 0; i < event.target.files.length; i++) {

        let size = event.target.files[i].size;
        let file = event.target.files[i];

        if(size > 104857) {
          alert('Arquivo:'+file.name+", maior que o permitido (104857)");
          return
        }


        this.myFiles.push(event.target.files[i]);
    }
}

  submit(){
    const formData = new FormData();

    for (let i = 0; i < this.myFiles.length; i++) {
      formData.append('files', this.myFiles[i]);
      formData.append('usuario', this.usuario);
    }

    //console.log('FormData:'+formData.get(this.files[]))
    // this.myFiles.forEach(file => console.log('FILE:',file));

    this.arquivoService.postArquivo(formData).subscribe((event: any) => {
      this.getFiles();
    });

  }

  getFiles(): any {
    this.arquivoService.getArquivo().subscribe((file: any) => {
      console.log('Fileeeee:',file)
      this.files = file;

    });
  }

}
