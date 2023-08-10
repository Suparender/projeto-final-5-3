import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Cep {
  cep: string,
  logradouro: string,
  localidade: string,
  bairro: string;
}

@Injectable({
  providedIn: 'root'
})
export class CepService {
  constructor(private http: HttpClient) { }

  getCep(cep: any): Observable<Cep> {
    return this.http.get<Cep>(`https://viacep.com.br/ws/${cep}/json/`)
  }
}