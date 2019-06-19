import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Component } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { SuscriptoresComponent } from './suscriptores/suscriptores.component';
import { SuscriptoresFormComponent } from './suscriptores/suscriptores-form.component';
import {RouterModule, Routes} from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { PrediosComponent } from './predios/predios.component';
import { PrediosFormComponent } from './predios-form/predios-form.component';
import { NgxPaginateModule } from 'ngx-paginate';
import {NgxPaginationModule} from 'ngx-pagination';
import { NgxCurrencyModule} from 'ngx-currency';
import { CommonModule } from '@angular/common'
/*material */
import {
  MatAutocompleteModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatFormFieldModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatDividerModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatStepperModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
} from '@angular/material';
import { UsuarioComponent } from './usuario/usuario.component';
import { LoginComponent } from './login/login.component';
import { TarifaComponent } from './tarifa/tarifa.component';
import { TarifaFormComponent } from './tarifa/tarifa-form.component';
import { NgbModalConfig, NgbModal  } from "@ng-bootstrap/ng-bootstrap";
import { UsuarioFormComponent } from './usuario/usuario-form.component';

const routes: Routes = [
  {path: 'suscriptores', component: SuscriptoresComponent},
  {path: 'suscriptoresform', component: SuscriptoresFormComponent},
  {path: 'suscriptoresform/form/:cedula', component: SuscriptoresFormComponent},
  {path: 'predios', component: PrediosComponent},
  {path: 'prediosform',component: PrediosFormComponent},
  {path: 'tarifas', component: TarifaComponent},
  {path: 'tarifasForm', component: TarifaFormComponent},
  {path: 'tarifasForm/form/:id', component: TarifaFormComponent},
  {path: 'usuarios', component: UsuarioComponent },
  {path: 'usuarios/form/:cedula', component: UsuarioFormComponent },
  {path: 'usuarioForm', component: UsuarioFormComponent},
];

@NgModule({
  declarations: [
    AppComponent,
    SuscriptoresComponent,
    SuscriptoresFormComponent,
    PrediosComponent,
    PrediosFormComponent,
    UsuarioComponent,
    LoginComponent,
    TarifaComponent,
    TarifaFormComponent,
    UsuarioFormComponent,
    ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgxPaginateModule,
    NgxPaginationModule,
    NgxCurrencyModule,
    CommonModule,
    RouterModule.forRoot(routes),
    MatDatepickerModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatStepperModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
