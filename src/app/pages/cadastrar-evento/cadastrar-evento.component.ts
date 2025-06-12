import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CadastrarEvento } from 'src/app/models/cadastrar-evento';
import { Evento } from 'src/app/models/evento';
import { EventosService } from 'src/app/services/eventos.service';

@Component({
  selector: 'app-cadastrar-evento',
  templateUrl: './cadastrar-evento.component.html',
  styleUrls: ['./cadastrar-evento.component.scss']
})
export class CadastrarEventoComponent implements OnInit {

  showSpinner: boolean = false;
  formularioEvento: FormGroup;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private eventosService: EventosService,
    private snackBar: MatSnackBar
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
  }

  voltar() {
  this.router.navigate(['']);
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

      this.enviarDados(evento);
    }
  }

  enviarDados(evento: CadastrarEvento) {
      this.showSpinner = true;
      this.eventosService.cadastrarEvento(evento).subscribe({
      next: (res: Evento) => {        
        this.disparaMensagem("Evento cadastrado com sucesso.");
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

}
