import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {  MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Account } from 'src/app/interface/account';
import { Deposit } from 'src/app/interface/deposit';
import { AccountService } from 'src/app/services/account-service.service';

@Component({
  selector: 'app-withdraw-money',
  templateUrl: './withdraw-money.component.html',
  styleUrls: ['./withdraw-money.component.css']
})
export class WithdrawMoneyComponent implements OnInit {


  withdrawForm: FormGroup;
  actionTitle: string = "Retirar"
  actionbutton: string = "Retirar Dinero"

  constructor(private referenceDialog: MatDialogRef<WithdrawMoneyComponent>, private formBuilder: FormBuilder,
    private _SnackBar: MatSnackBar,
    private _AccountsService: AccountService,
    @Inject(MAT_DIALOG_DATA) public withdrawData: Deposit) {

    this.withdrawForm = this.formBuilder.group({
      id: [''],
      balance: ['', Validators.required],
      accountOwner: ['']
    })
  }

  ngOnInit(): void {
    if (this.withdrawData) {
      this.withdrawForm.patchValue({
        id: this.withdrawData.id,
        balance: 0,

      });
    }
  }


  ShowAlert(msg: string, action: string) {
    this._SnackBar.open(msg, action, {
      horizontalPosition: "end",
      verticalPosition: "top",
      duration: 3000
    });
  }


  withdrawMoney() {

    const actualBalance: number = this.withdrawData.balance;
    const withdrawalBalance: number = this.withdrawForm.value.balance;

    if (withdrawalBalance <= 0) {
      this.ShowAlert('No puede depositar cantidades negativas!', 'Cerrar');
      return;
    }
    if (withdrawalBalance > actualBalance) {
      this.ShowAlert('El retiro no puede ser mayor al balance actual', 'Cerrar');
      return;
    }
    this._AccountsService.withdrawMoney(this.withdrawData.id, this.withdrawForm.value.balance).subscribe({
      next: (data) => {


        this.ShowAlert("Dinero retirado", "Listo");
        this.referenceDialog.close("retirado");
      },
      error: (e) => {

      }
    });
  }


}

