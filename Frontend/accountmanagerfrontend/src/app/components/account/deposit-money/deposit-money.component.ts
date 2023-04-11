import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {  MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Account } from 'src/app/interface/account';
import { Deposit } from 'src/app/interface/deposit';
import { AccountService } from 'src/app/services/account-service.service';

@Component({
  selector: 'app-deposit-money',
  templateUrl: './deposit-money.component.html',
  styleUrls: ['./deposit-money.component.css']
})
export class DepositMoneyComponent implements OnInit{

  depositForm: FormGroup;
  actionTitle: string = "Depositar"
  actionbutton: string = "Enviar Deposito"

  constructor(private referenceDialog: MatDialogRef<DepositMoneyComponent>, private formBuilder: FormBuilder,
    private _SnackBar: MatSnackBar,
    private _AccountsService: AccountService,
    @Inject(MAT_DIALOG_DATA) public depositData: Deposit) {

    this.depositForm = this.formBuilder.group({
      id: [''],
      balance: ['', Validators.required],
      accountOwner:['']
    })
  }

  ngOnInit(): void {
    if (this.depositData) {
      this.depositForm.patchValue({
        id: this.depositData.id,
        balance: 0,
        accountOwner:''
      });
   }
  }



  ShowAlert(msg: string, action: string) {
    this._SnackBar.open(msg,action,{
      horizontalPosition:"end",
      verticalPosition:"top",
      duration:3000
    });
  }

  depositMoney() {

    const balance: number = this.depositForm.value.balance;

    if (balance <= 0) {
      this.ShowAlert('No puede depositar cantidades negativas!', 'Cerrar');
      return;
    }
    this._AccountsService.depositMoney(this.depositData.id,this.depositForm.value.balance).subscribe({
      next: (data) => {

        this.ShowAlert("Dinero depositado","Listo");
        this.referenceDialog.close("depositado");
      },error:(e)=>{

        }
      })

  }
}


