import { Component } from '@angular/core';
import { CepserviceService, Cep } from 'src/app/services/cepservice.service'

@Component({
  selector: 'app-cep',
  templateUrl: './cep.page.html',
  styleUrls: ['./cep.page.scss'],
})
export class CepPage {

  cepInput: string = '';
  cepData: Cep | null = null;

  constructor(private cepService: CepserviceService) { }

  buscarCep() {

    this.cepService.getCep(this.cepInput).subscribe(data => {
      this.cepData = data;
    });
  }
}
