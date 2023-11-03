import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './_guards';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
  },
  {
    path: 'app-dash-board',
    loadChildren: () => import("./dash-board/dash-board.module").then(m => m.DashBoardModule),
    canActivate: [AuthGuard]
},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
