import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {  MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Account } from 'src/app/interface/account';
import { AccountService } from 'src/app/services/account-service.service';

@Component({
  selector: 'app-add-edit-account',
  templateUrl: './add-edit-account.component.html',
  styleUrls: ['./add-edit-account.component.css']
})
export class AddEditAccountComponent implements OnInit {

  accountForm: FormGroup;
  actionTitle: string = "Nuevo"
  actionbutton: string = "Guardar"


  constructor(private referenceDialog: MatDialogRef<AddEditAccountComponent>, private formBuilder: FormBuilder,
    private _SnackBar: MatSnackBar,
    private _AccountsService: AccountService,
    @Inject(MAT_DIALOG_DATA) public accountData: Account) {

    this.accountForm = this.formBuilder.group({
       id: [0],
      accountOwner: ['', Validators.required],
      accountType: ['', Validators.required],
      accountNumber: ['', Validators.required],
      dominicanId: ['', Validators.required],
      balance: ['', Validators.required],
      email: ['', Validators.required]

    })
  }




  ngOnInit(): void {
    if (this.accountData) {
      this.accountForm.patchValue({
         id: this.accountData.id,
        accountOwner: this.accountData.accountOwner,
        accountType: this.accountData.accountType,
        accountNumber: this.accountData.accountNumber,
        dominicanId: this.accountData.dominicanId,
        balance: this.accountData.balance,
        email: this.accountData.email,
      });

      this.actionTitle = "Editar";
      this.actionbutton = "Actualizar";
   }
  }

  ShowAlert(msg: string, action: string) {
    this._SnackBar.open(msg,action,{
      horizontalPosition:"end",
      verticalPosition:"top",
      duration:3000
    });
  }



  addAccount(){
    const account: Account = {
      id:this.accountForm.value.id,
      accountOwner:this.accountForm.value.accountOwner,
      accountType: this.accountForm.value.accountType,
      accountNumber: this.accountForm.value.accountNumber,
      dominicanId: this.accountForm.value.dominicanId,
      balance: this.accountForm.value.balance,
      email:this.accountForm.value.email,
    }


    if (this.accountData == null){
      this._AccountsService.createAccount(account).subscribe({
        next: (data) => {

          console.log(data);

          this.ShowAlert("Cuenta creada","Listo");
          this.referenceDialog.close("creado");
        },error:(e)=>{
          if (e.status === 400) { // Comprueba si hay un error de validación (código de estado 400)
            const validationErrors = e.error.errors; // Obtiene los errores de validación del cuerpo de la respuesta
            let errorMsg = '';
            for (const fieldName in validationErrors) { // Recorre los errores y crea un mensaje de error
              if (validationErrors.hasOwnProperty(fieldName)) {
                const errors = validationErrors[fieldName];
                for (const error of errors) {
                  errorMsg += `${error}\n`;
                }
              }
            }
            this.ShowAlert(errorMsg, 'Cerrar'); // Muestra el mensaje de error en un Snackbar
          }
        }

      })


    } else {

      // this._AccountsService.getAccount(this.accountData.id).subscribe({
      //  next: (data) => {
      //    console.log(data);
      //    this.accountData = data;

      //   }
      // })

      this._AccountsService.updateAccount(this.accountData.id,account).subscribe({
        next: (data) => {
          console.log(data);
          this.ShowAlert("Cuenta Editada","Listo");
          this.referenceDialog.close("editado");
        },error:(e)=>{
          if (e.status === 400) { // Comprueba si hay un error de validación (código de estado 400)
            const validationErrors = e.error.errors; // Obtiene los errores de validación del cuerpo de la respuesta
            let errorMsg = '';
            for (const fieldName in validationErrors) { // Recorre los errores y crea un mensaje de error
              if (validationErrors.hasOwnProperty(fieldName)) {
                const errors = validationErrors[fieldName];
                for (const error of errors) {
                  errorMsg += `${error}\n`;
                }
              }

            }
            this.ShowAlert(errorMsg, 'Cerrar'); // Muestra el mensaje de error en un Snackbar
          }
          }
        })
    }
  }



}



