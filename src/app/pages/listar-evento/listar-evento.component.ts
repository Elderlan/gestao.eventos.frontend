import { Component, OnInit } from '@angular/core';
import { EventosService } from 'src/app/services/eventos.service';
import { Evento } from '../../models/evento';
import { PaginacaoEvento } from '../../models/paginacao-evento';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-listar-evento',
  templateUrl: './listar-evento.component.html',
  styleUrls: ['./listar-evento.component.scss']
})
export class ListarEventoComponent implements OnInit {
  showSpinner: boolean = false;
  displayedColumns: string[] = ['titulo', 'descricao', 'dataHora', 'local', 'acoes'];

  eventos: Evento[] = [];
  totalElements: number = 0;
  pageSize: number = 10;
  pageIndex: number = 0;

  constructor(
    private eventosService: EventosService,
    private router: Router,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
      this.obterEventosPaginados(this.pageIndex, this.pageSize)
  }

  obterEventosPaginados(pagina: number, tamanho: number) {
    this.showSpinner = true;
        this.eventosService.getEventos(pagina, tamanho).subscribe({
      next: (res: PaginacaoEvento) => {
        this.eventos = res.content;
        this.totalElements = res.totalElements;
        this.pageSize = res.pageable.pageSize;
        this.pageIndex = res.pageable.pageNumber;
        this.showSpinner = false;
      },
      error: (err) => {
        this.showSpinner = false;
        this.disparaMensagem('Erro ao carregar eventos!');
        
      }
    });
  }

  onPageChange(event: PageEvent) {
  this.pageIndex = event.pageIndex;
  this.pageSize = event.pageSize;
  this.obterEventosPaginados(this.pageIndex, this.pageSize);
}

cadastrarEvento() {
  this.router.navigate(['new']);
}

detalharEvento(evento: Evento) {
  this.router.navigate(['detalhe', evento.id]);
}
editarEvento(evento: Evento) {
    this.router.navigate(['editar', evento.id]);
}

excluirEvento(evento: Evento) {
      this.showSpinner = true;
      this.eventosService.excluirEvento(evento.id).subscribe({
      next: () => {
      this.eventos = this.eventos.filter(e => e.id !== evento.id);
      this.totalElements--;       
        this.disparaMensagem("Evento excluído com sucesso.");
        this.showSpinner = false;
      },
      error: (err) => {
      this.showSpinner = false;
      this.disparaMensagem('Erro ao processar a requisição.');        
  }
    });
}


disparaMensagem(mensagem: string): void {
      this.snackBar.open(mensagem, 'Ok', {
      duration: 6000,
      horizontalPosition: 'right',
      verticalPosition: 'top'
  });
}


}
