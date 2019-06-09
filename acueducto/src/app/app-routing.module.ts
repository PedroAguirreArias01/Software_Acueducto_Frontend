import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SuscriptoresComponent } from './suscriptores/suscriptores.component';

const routes: Routes = [
  {path:'Suscriptores', component: SuscriptoresComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
