import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SuscriptoresComponent } from './suscriptores/suscriptores.component';
import { PrediosComponent} from './predios/predios.component';

const routes: Routes = [
  {path:'Suscriptores', component: SuscriptoresComponent },
  {path: 'Predios', component: PrediosComponent}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
