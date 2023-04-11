import { Component, OnInit, AfterViewInit, ViewChild, TemplateRef } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import {MatDialog} from '@angular/material/dialog';
import { Account } from 'src/app/interface/account';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AccountService } from 'src/app/services/account-service.service';
import { AddEditAccountComponent } from '../add-edit-account/add-edit-account.component';
import { DeleteAccountComponent } from '../delete-account/delete-account.component';
import { DepositMoneyComponent } from '../deposit-money/deposit-money.component';
import { WithdrawMoneyComponent } from '../withdraw-money/withdraw-money.component';
import { ShowAmountComponent } from '../show-amount/show-amount.component';

@Component({
  selector: 'app-account-list',
  templateUrl: './account-list.component.html',
  styleUrls: ['./account-list.component.css']

})
export class AccountListComponent implements OnInit, AfterViewInit {


  displayedColumns: string[] = ['id', 'accountOwner', 'accountType', 'accountNumber', 'dominicanId', 'balance', 'email', 'acciones','Deposito','Retiro','VerSaldo'];

  dataSource = new MatTableDataSource<Account>();



  constructor(private accountService: AccountService, public dialog: MatDialog, private _SnackBar: MatSnackBar) {


  }
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit(): void {
    this.getAccounts();

  };




  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openDialog() {
    this.dialog.open(AddEditAccountComponent, {
      disableClose: true,
      width: "800px",
      height: "700px",

    }).afterClosed().subscribe(result => {
      if (result === "creado") {
        this.getAccounts();
      }
    })
  }

  ShowAlert(msg: string, accion: string) {
    this._SnackBar.open(msg,accion,{
      horizontalPosition:"end",
      verticalPosition:"top",
      duration:3000
    });
  }

  EditDialog(dataAccount:Account) {
    this.dialog.open(AddEditAccountComponent,{
      disableClose: true,
      width: "800px",
      height: "700px",
      data:dataAccount
    }).afterClosed().subscribe(resultado=>{
      if(resultado==="editado"){
        this.getAccounts();
      }
    })
  }

  depositDialog(dataAccount: Account) {
    this.dialog.open(DepositMoneyComponent, {
      disableClose: true,
      width: "280px",
      data:dataAccount
    }).afterClosed().subscribe(result => {
      if (result === 'depositado') {
        this.getAccounts();
      }
    })
  }

  withdrawDialog(dataAccount: Account) {
    this.dialog.open(WithdrawMoneyComponent, {
      disableClose: true,
      width: "280px",
      data:dataAccount
    }).afterClosed().subscribe(result => {
      if (result === 'retirado') {
        this.getAccounts();
      }
    })
  }





  deleteDialog(dataAccount: Account) {

    this.dialog.open(DeleteAccountComponent, {
      disableClose: true,
      data: dataAccount
    }).afterClosed().subscribe(result => {
      if (result === "Eliminar") {
        this.accountService.deleteAccount(dataAccount.id).subscribe({
          next: (data) => {
            this.ShowAlert("Cuenta eliminada", "Listo")
            this.getAccounts();
          }, error: (e) => {
            this.ShowAlert("No se pudo Eliminar", "Error");
          }
        })
      }
    })
  }

  showAmountDialog(dataAccount: Account) {

    this.dialog.open(ShowAmountComponent, {
      disableClose: true,
      data: dataAccount
    }).afterClosed().subscribe(result => {

      this.accountService.getAccounts();
    })
  }






    // getAccounts() {
    //   this.accountService.getAccounts().subscribe(data => {
    //   this.dataSource.data = data;
    //   })
    // }





    getAccounts() {
      this.accountService.getAccounts().subscribe({
        next: (data) => {
          this.dataSource.data = data
        }, error: (e) => {
          console.log(e);
        }
      })

    }
  }

