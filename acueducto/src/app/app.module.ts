import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Component } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { SuscriptoresComponent } from './suscriptores/suscriptores.component';
import { SuscriptoresFormComponent } from './suscriptores/suscriptores-form.component';
import {RouterModule, Routes} from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PrediosComponent } from './predios/predios.component';
import { PrediosFormComponent } from './predios/predios-form.component';
import { NgxPaginateModule } from 'ngx-paginate';
import {NgxPaginationModule} from 'ngx-pagination';
import { NgxCurrencyModule} from 'ngx-currency';
import { CommonModule } from '@angular/common';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
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
import { HistorialTarifaModalComponent } from './tarifa/historial-tarifa-modal/historial-tarifa-modal.component';
import { LugarComponent } from './lugar/lugar.component';
import { LugarFormComponent } from './lugar/lugar-form.component';
import { FacturaComponent } from './factura/factura.component';
import { FacturaFormComponent } from './factura/factura-form.component';
import { FacturaModalComponent } from './factura/factura-modal/factura-modal.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';

const routes: Routes = [
  {path: '', redirectTo:'suscriptores', pathMatch: "full"},
  {path: 'suscriptores', component: SuscriptoresComponent},
  {path: 'suscriptoresform', component: SuscriptoresFormComponent},
  {path: 'suscriptoresform/form/:cedula', component: SuscriptoresFormComponent},
  {path: 'predios', component: PrediosComponent},
  {path: 'prediosform',component: PrediosFormComponent},
  {path: 'prediosForm/form/:numeroMatricula', component: PrediosFormComponent},
  {path: 'tarifas', component: TarifaComponent},
  {path: 'tarifasForm', component: TarifaFormComponent},
  {path: 'tarifasForm/form/:id', component: TarifaFormComponent},
  {path: 'usuarios', component: UsuarioComponent },
  {path: 'usuarios/form/:cedula', component: UsuarioFormComponent },
  {path: 'usuarioForm', component: UsuarioFormComponent},
  {path: 'lugares', component: LugarComponent},
  {path: 'lugarForm', component: LugarFormComponent},
  {path: 'lugar/form/:id', component: LugarFormComponent},
  {path: 'facturas', component: FacturaComponent},
  {path: 'facturaForm', component: FacturaFormComponent},
  {path: 'facturas/form/:id', component: FacturaFormComponent},
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
    HistorialTarifaModalComponent,
    LugarComponent,
    LugarFormComponent,
    FacturaComponent,
    FacturaFormComponent,
    FacturaModalComponent,
    HeaderComponent,
    FooterComponent,
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
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents:[
    HistorialTarifaModalComponent, 
    FacturaModalComponent]
})
export class AppModule { }
