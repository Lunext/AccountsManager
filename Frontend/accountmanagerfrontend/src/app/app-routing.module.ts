import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountListComponent } from './components/account/account-list/account-list.component';
import { AccountDashboardComponent } from './components/account-dashboard/account-dashboard.component';


const routes: Routes = [
  {
    path: '',
    component:AccountListComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
