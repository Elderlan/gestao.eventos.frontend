import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListarEventoComponent } from './pages/listar-evento/listar-evento.component';
import { CadastrarEventoComponent } from './pages/cadastrar-evento/cadastrar-evento.component';

const routes: Routes = [
  { path: '', component: ListarEventoComponent },
  { path: 'new', component: CadastrarEventoComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
