import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Deposit } from 'src/app/interface/deposit';


@Component({
  selector: 'app-show-amount',
  templateUrl: './show-amount.component.html',
  styleUrls: ['./show-amount.component.css']
})
export class ShowAmountComponent  {

  constructor( private referenceDialog:MatDialogRef<ShowAmountComponent>,
    @Inject(MAT_DIALOG_DATA) public  showData:Deposit){
  }


    showAmount(){
      if(this.showData){
        this.referenceDialog.close("Ver saldo")
      }
  }


}


