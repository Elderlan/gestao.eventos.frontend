import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Evento } from 'src/app/models/evento';
import { EventosService } from 'src/app/services/eventos.service';

@Component({
  selector: 'app-detalhar-evento',
  templateUrl: './detalhar-evento.component.html',
  styleUrls: ['./detalhar-evento.component.scss']
})
export class DetalharEventoComponent implements OnInit {

  showSpinner: boolean = false;

  evento: Evento = {
  id: 0,
  titulo: '',
  descricao: '',
  dataHora: '',
  local: ''
};


  constructor(
    private eventosService: EventosService,
    private snackBar: MatSnackBar,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
   this.obterEventoDetalhado(Number(id));
  }

    obterEventoDetalhado(id: number) {
      this.showSpinner = true;
          this.eventosService.detalharEvento(id).subscribe({
        next: (res: Evento) => {
          this.evento = res;
          this.showSpinner = false;
        },
        error: (err) => {
          this.showSpinner = false;
          this.disparaMensagem('Erro ao carregar evento!');          
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

  voltar() {
  this.router.navigate(['']);
  }


}
