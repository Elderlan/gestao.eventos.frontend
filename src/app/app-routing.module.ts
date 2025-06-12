import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListarEventoComponent } from './pages/listar-evento/listar-evento.component';
import { CadastrarEventoComponent } from './pages/cadastrar-evento/cadastrar-evento.component';
import { DetalharEventoComponent } from './pages/detalhar-evento/detalhar-evento.component';
import { EditarEventoComponent } from './pages/editar-evento/editar-evento.component';

const routes: Routes = [
  { path: '', component: ListarEventoComponent },
  { path: 'new', component: CadastrarEventoComponent },
  { path: 'detalhe/:id', component: DetalharEventoComponent },
  { path: 'editar/:id', component: EditarEventoComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
