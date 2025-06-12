import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmacao-dialogo',
  templateUrl: './confirmacao-dialogo.component.html',
  styleUrls: ['./confirmacao-dialogo.component.scss']
})
export class ConfirmacaoDialogoComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ConfirmacaoDialogoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { mensagem: string }
  ) {}
  
  ngOnInit(): void {
   
  }

  onCancelar(): void {
    this.dialogRef.close(false);
  }

  onConfirmar(): void {
    this.dialogRef.close(true);
  }
}
