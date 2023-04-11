import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Account } from 'src/app/interface/account';

@Component({
  selector: 'app-delete-account',
  templateUrl: './delete-account.component.html',
  styleUrls: ['./delete-account.component.css']
})
export class DeleteAccountComponent {

  constructor( private referenceDialog:MatDialogRef<DeleteAccountComponent>,
    @Inject(MAT_DIALOG_DATA) public accountData:Account){
    }
    comfirmDelete(){
      if(this.accountData){
        this.referenceDialog.close("Eliminar")
      }
  }


}
