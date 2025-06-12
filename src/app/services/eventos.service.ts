import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { PaginacaoEvento } from '../models/paginacao-evento';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Evento } from '../models/evento';
import { CadastrarEvento } from '../models/cadastrar-evento';

@Injectable({
  providedIn: 'root'
})
export class EventosService {

  private readonly API_EVENTOS = `${environment.apiUrl}/api/evento/listar`;
  private readonly API_CADASTRAR = `${environment.apiUrl}/api/evento/cadastrar`;
  private readonly API_DETALHAR = `${environment.apiUrl}/api/evento/detalhar/`;
  private readonly API_EDITAR = `${environment.apiUrl}/api/evento/atualizar/`;

  constructor(private http: HttpClient) { }

  getEventos(page: number, size: number): Observable<PaginacaoEvento> {
    let params = new HttpParams()
      .set('page', page)
      .set('size', size);
    const options = { params };
    return this.http.get<PaginacaoEvento>(this.API_EVENTOS, options);
  }

  cadastrarEvento(record: CadastrarEvento): Observable<Evento> {
    return this.http.post<Evento>(this.API_CADASTRAR, record);
  }

  detalharEvento(id: number): Observable<Evento> {
    return this.http.get<Evento>(`${this.API_DETALHAR}${id}`);
  }

  editarEvento(id: number, record: CadastrarEvento): Observable<Evento> {
    return this.http.put<Evento>(`${this.API_EDITAR}${id}`, record);
  }

}
