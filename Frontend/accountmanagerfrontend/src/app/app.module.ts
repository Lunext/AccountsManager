import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AccountListComponent } from './components/account/account-list/account-list.component';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material/button';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatIconModule} from '@angular/material/icon';
import {MatDialogModule} from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { AddEditAccountComponent } from './components/account/add-edit-account/add-edit-account.component';
import { DeleteAccountComponent } from './components/account/delete-account/delete-account.component';
import { MatListModule } from '@angular/material/list';
import { MatGridListModule } from '@angular/material/grid-list';
import {ReactiveFormsModule} from '@angular/forms';
import { DepositMoneyComponent } from './components/account/deposit-money/deposit-money.component';
import { WithdrawMoneyComponent } from './components/account/withdraw-money/withdraw-money.component';
import { ShowAmountComponent } from './components/account/show-amount/show-amount.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { AccountDashboardComponent } from './components/account-dashboard/account-dashboard.component';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu'


@NgModule({
  declarations: [
    AppComponent,
    AccountListComponent,
    AddEditAccountComponent,
    DeleteAccountComponent,
    DepositMoneyComponent,
    WithdrawMoneyComponent,
    ShowAmountComponent,
    NavbarComponent,
    AccountDashboardComponent,

    // UpdateAccountComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatSnackBarModule,
    MatIconModule,
    MatDialogModule,
    MatListModule,
    CommonModule,
    MatGridListModule,
    ReactiveFormsModule,
    LayoutModule,
    MatToolbarModule,
    MatSidenavModule,
    MatCardModule,
    MatMenuModule,
    RouterOutlet,
    AppRoutingModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
