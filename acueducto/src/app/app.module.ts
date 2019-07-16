import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Component } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { SuscriptoresComponent } from './suscriptores/suscriptores.component';
import { SuscriptoresFormComponent } from './suscriptores/suscriptores-form.component';
import { DetalleSuscriptorComponent } from './suscriptores/detalle-suscriptor/detalle-suscriptor.component';
import { RouterModule, Routes } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PrediosComponent } from './predios/predios.component';
import { PrediosFormComponent } from './predios/predios-form.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgxCurrencyModule } from 'ngx-currency';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

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
import { NgbModalConfig, NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { UsuarioFormComponent } from './usuario/usuario-form.component';
import { HistorialTarifaModalComponent } from './tarifa/historial-tarifa-modal/historial-tarifa-modal.component';
import { LugarComponent } from './lugar/lugar.component';
import { LugarFormComponent } from './lugar/lugar-form.component';
import { FacturaComponent } from './factura/factura.component';
import { FacturaFormComponent } from './factura/factura-form.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { FilterPrediosComponent } from './predios/filter-predios.component';

//Registra el locale para procesar las fechas
import { registerLocaleData } from '@angular/common';
import localeES from '@angular/common/locales/es';
import { FacturaDetallesComponent } from './factura/factura-detalles/factura-detalles.component';
import { DigitsOnlyDirective } from './digits-only.directive';
import { DetalleUsuarioComponent } from './usuario/detalle-usuario/detalle-usuario.component';
import { FilterFacturasComponent } from './factura/filter-facturas.component';
import { DetallePredioComponent } from './predios/detalle-predio/detalle-predio.component';
import { FilterSuscriptoresComponent } from './suscriptores/filter-suscriptores.component'
import { AuthGuard } from './usuario/guards/auth.guard';
import { RoleGuard } from './usuario/guards/role.guard';
import { TokenInterceptor } from './usuario/interceptors/token.interceptor';
import { AuthInterceptor } from './usuario/interceptors/auth.interceptor';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ReportesComponent } from './reportes/reportes.component';

registerLocaleData(localeES, 'es');

const routes: Routes = [
   {path: '', redirectTo:'dashboard', pathMatch: "full"},
  {
    path: 'suscriptores', component: SuscriptoresComponent,
    canActivate: [AuthGuard, RoleGuard], data: { role: 'ROLE_ADMIN,ROLE_FONTANERO,ROLE_TESORERO' }
  },
  {
    path: 'suscriptoresform', component: SuscriptoresFormComponent,
    canActivate: [AuthGuard, RoleGuard], data: { role: 'ROLE_ADMIN' }
  },
  {
    path: 'suscriptoresform/form/:cedula', component: SuscriptoresFormComponent,
    canActivate: [AuthGuard, RoleGuard], data: { role: 'ROLE_ADMIN' }
  },
  {
    path: 'predios', component: PrediosComponent,
    canActivate: [AuthGuard, RoleGuard], data: { role: 'ROLE_ADMIN,ROLE_FONTANERO,ROLE_TESORERO' }
  },
  {
    path: 'prediosform', component: PrediosFormComponent,
    canActivate: [AuthGuard, RoleGuard], data: { role: 'ROLE_ADMIN' }
  },
  {
    path: 'prediosForm/form/:numeroMatricula', component: PrediosFormComponent,
    canActivate: [AuthGuard, RoleGuard], data: { role: 'ROLE_ADMIN' }
  },
  {
    path: 'tarifas', component: TarifaComponent,
    canActivate: [AuthGuard, RoleGuard], data: { role: 'ROLE_ADMIN,ROLE_FONTANERO,ROLE_TESORERO' }
  },
  {
    path: 'tarifasForm', component: TarifaFormComponent,
    canActivate: [AuthGuard, RoleGuard], data: { role: 'ROLE_ADMIN' }
  },
  {
    path: 'tarifasForm/form/:id', component: TarifaFormComponent,
    canActivate: [AuthGuard, RoleGuard], data: { role: 'ROLE_ADMIN' }
  },
  {
    path: 'usuarios', component: UsuarioComponent,
    canActivate: [AuthGuard, RoleGuard], data: { role: 'ROLE_ADMIN' }
  },
  {
    path: 'usuarios/form/:cedula', component: UsuarioFormComponent,
    canActivate: [AuthGuard, RoleGuard], data: { role: 'ROLE_ADMIN' }
  },
  {
    path: 'usuarioForm', component: UsuarioFormComponent,
    canActivate: [AuthGuard, RoleGuard], data: { role: 'ROLE_ADMIN' }
  },
  {
    path: 'lugares', component: LugarComponent,
    canActivate: [AuthGuard, RoleGuard], data: { role: 'ROLE_ADMIN,ROLE_FONTANERO,ROLE_TESORERO' }
  },
  {
    path: 'lugarForm', component: LugarFormComponent,
    canActivate: [AuthGuard, RoleGuard], data: { role: 'ROLE_ADMIN' }
  },
  {
    path: 'lugar/form/:id', component: LugarFormComponent,
    canActivate: [AuthGuard, RoleGuard], data: { role: 'ROLE_ADMIN' }
  },
  {
    path: 'facturas', component: FacturaComponent,
    canActivate: [AuthGuard, RoleGuard], data: { role: 'ROLE_ADMIN,ROLE_FONTANERO,ROLE_TESORERO' }
  },
  {
    path: 'facturaForm', component: FacturaFormComponent,
    canActivate: [AuthGuard, RoleGuard], data: { role: 'ROLE_ADMIN,ROLE_FONTANERO,ROLE_TESORERO' }
  },
  {
    path: 'facturaForm/form/:id', component: FacturaFormComponent,
    canActivate: [AuthGuard, RoleGuard], data: { role: 'ROLE_ADMIN' }
  },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'reportes', component: ReportesComponent, data: { role: 'ROLE_ADMIN' }},

];

@NgModule({
  declarations: [
    AppComponent,
    SuscriptoresComponent,
    SuscriptoresFormComponent,
    DetalleSuscriptorComponent,
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
    HeaderComponent,
    FooterComponent,
    FacturaDetallesComponent,
    DigitsOnlyDirective,
    DetalleUsuarioComponent,
    FilterFacturasComponent,
    DetallePredioComponent,
    FilterPrediosComponent,
    FilterSuscriptoresComponent,
    DashboardComponent,
    ReportesComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
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
    ReactiveFormsModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    HistorialTarifaModalComponent,
    FacturaDetallesComponent]
})
export class AppModule { }
