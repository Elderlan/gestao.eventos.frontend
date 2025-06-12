import { Component, OnInit } from '@angular/core';
import { EventosService } from 'src/app/services/eventos.service';
import { Evento } from '../../models/evento';
import { PaginacaoEvento } from '../../models/paginacao-evento';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-listar-evento',
  templateUrl: './listar-evento.component.html',
  styleUrls: ['./listar-evento.component.scss']
})
export class ListarEventoComponent implements OnInit {
  displayedColumns: string[] = ['titulo', 'descricao', 'dataHora', 'local', 'acoes'];

  eventos: Evento[] = [];
  totalElements: number = 0;
  pageSize: number = 10;
  pageIndex: number = 0;

  constructor(private eventosService: EventosService) { }

  ngOnInit(): void {
      this.obterEventosPaginados(this.pageIndex, this.pageSize, )
  }

  obterEventosPaginados(pagina: number, tamanho: number) {
        this.eventosService.getEventos(pagina, tamanho).subscribe({
      next: (res: PaginacaoEvento) => {
        this.eventos = res.content;
        this.totalElements = res.totalElements;
        this.pageSize = res.pageable.pageSize;
        this.pageIndex = res.pageable.pageNumber;
      },
      error: (err) => {
        console.error('Erro ao carregar eventos:', err);
      }
    });
  }

  onPageChange(event: PageEvent) {
  this.pageIndex = event.pageIndex;
  this.pageSize = event.pageSize;
  this.obterEventosPaginados(this.pageIndex, this.pageSize);
}

detalharEvento(evento: Evento) {
console.log("Chamou o detalhar evento: " + evento.id);
}
editarEvento(evento: Evento) {
console.log("Chamou o editar evento: " + evento.id);
}

}
