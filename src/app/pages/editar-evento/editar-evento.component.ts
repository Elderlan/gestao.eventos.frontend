import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Evento } from 'src/app/models/evento';
import { EventosService } from 'src/app/services/eventos.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CadastrarEvento } from 'src/app/models/cadastrar-evento';

@Component({
  selector: 'app-editar-evento',
  templateUrl: './editar-evento.component.html',
  styleUrls: ['./editar-evento.component.scss']
})
export class EditarEventoComponent implements OnInit {

  showSpinner: boolean = false;
  formularioEvento: FormGroup;
  
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
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
  ) { 
          this.formularioEvento = this.formBuilder.group({
          titulo: ['', [Validators.required, Validators.maxLength(100)]],
          descricao: ['', [Validators.maxLength(1000)]],
          data: [null, Validators.required],
          hora: [null, Validators.required],
          local: ['', [Validators.maxLength(200)]]
        });
  }

  ngOnInit(): void {
   const id = this.route.snapshot.paramMap.get('id');
   this.obterEventoDetalhado(Number(id));
  }

      obterEventoDetalhado(id: number) {
      this.showSpinner = true;
          this.eventosService.detalharEvento(id).subscribe({
        next: (res: Evento) => {
          this.evento = res;
          this.carregarEvento(res);
          this.showSpinner = false;
        },
        error: (err) => {
          this.showSpinner = false;
          this.disparaMensagem('Erro ao carregar evento!');          
        }
      });
    }
    private carregarEvento(evento: Evento) {

    const dataIso = evento.dataHora;
    const hora = new Date(dataIso).toLocaleTimeString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit'
    });

    this.formularioEvento.patchValue({
        id: evento.id,
        titulo: evento.titulo,
        descricao: evento.descricao,
        hora: hora,
        data: evento.dataHora,
        local:evento.local
    });

  }

    onSubmit(): void {
      if (this.formularioEvento.valid) {
        const valoresFormulario = this.formularioEvento.value;
  
       const dataHoraEvento = new Date(valoresFormulario.data);
        const [hora, minutos] = valoresFormulario.hora.split(':');
        dataHoraEvento.setHours(+hora, +minutos);
  
        const evento: CadastrarEvento = {
            titulo: valoresFormulario.titulo,
            descricao: valoresFormulario.descricao,
            dataHora: dataHoraEvento.toISOString(),
            local: valoresFormulario.local
        };
  
        this.enviarDados(this.evento.id, evento);
      }
    }

    enviarDados(id: number, evento: CadastrarEvento) {
      this.showSpinner = true;
      this.eventosService.editarEvento(id, evento).subscribe({
      next: (res: Evento) => {        
        this.disparaMensagem("Evento editado com sucesso.");
        this.showSpinner = false;
      },
      error: (err) => {
        this.showSpinner = false;

        const erros = err?.error?.errors;
        let mensagem = 'Erro ao processar a requisição.';

        if (erros && typeof erros === 'object') {
          const primeiraChave = Object.keys(erros)[0];
          mensagem = erros[primeiraChave];
        }

      this.disparaMensagem(mensagem);        
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
