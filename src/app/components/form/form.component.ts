import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { Cliente } from 'src/app/Cliente'
import { ClientService } from 'src/app/services/client/client.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  clientForm!: FormGroup;
  clientPrevious!: Cliente;

  @Output() onSubmit = new EventEmitter<Cliente>();

  @Input() clientData: Cliente | null = null;
  @Input() btnText!: string;

  constructor(
    private fb: FormBuilder,
    private clientService: ClientService,
  ){}

  ngOnInit(): void {
    if(this.clientData) {
      this.clientForm = this.fb.group({
        id: new FormControl(this.clientData.id),
        cliente: new FormControl(this.clientData.cliente)
      });
    } else {
      this.clientForm = this.fb.group({
        id: new FormControl(''),
        cliente: new FormControl('', [Validators.required])
      })
    }
  }

  get cliente(){
    return this.clientForm.get('cliente')!;
  }

  tamanho(): number {
    return 1;
  }

  submit(){
    if(this.clientForm.invalid) {
      return;
    }

    console.log(this.clientForm.value);

    this.onSubmit.emit(this.clientForm.value);

    this.getClient(this.clientForm.value);

  }

  getClient(client : string) {
    let name:string = this.clientService.getClient(client);
    console.log('retorno:' + name );
    this.clientForm.get('cliente')?.setValue(name);
  }

}
