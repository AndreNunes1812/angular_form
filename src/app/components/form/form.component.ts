import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators} from '@angular/forms';
import { Cliente} from 'src/app/Cliente'

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  @Output() onSubmit = new EventEmitter<Cliente>();

  @Input() clientData: Cliente | null = null;
  @Input() btnText!: string;

  clientForm!: FormGroup;

  constructor(){}

  ngOnInit(): void {
    if(this.clientData) {
      this.clientForm = new FormGroup({
        id: new FormControl(this.clientData.id),
        cliente: new FormControl(this.clientData.cliente)
      });
    } else {
      this.clientForm = new FormGroup({
        id: new FormControl(''),
        cliente: new FormControl('', [Validators.required])
      })
    }
  }

  get cliente(){
    return this.clientForm.get('cliente')!;
  }

  submit(){

  }

}
