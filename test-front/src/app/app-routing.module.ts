import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { RegisterComponent } from './pages/register/register.component';
import { NoPagesFoundComponent } from './no-pages-found/no-pages-found.component';
import { UsuarioModificarComponent } from './pages/usuario-modificar/usuario-modificar.component';


const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'usuario/:id', component: UsuarioModificarComponent },

  {path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  {path: '**', component: NoPagesFoundComponent},
];



@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot( routes )
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
