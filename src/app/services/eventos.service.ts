import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { PaginacaoEvento } from '../models/paginacao-evento';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventosService {

  private readonly API_EVENTOS = `${environment.apiUrl}/api/evento/listar`;

  constructor(private http: HttpClient) { }

  getEventos(page: number, size: number): Observable<PaginacaoEvento> {
    let params = new HttpParams()
      .set('page', page)
      .set('size', size);
    const options = { params };
    return this.http.get<PaginacaoEvento>(this.API_EVENTOS, options);
  }


}
