import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BalanceService {
  balance: number;

  constructor() { }

  updatebalance(balance) {
    localStorage.setItem('balance', JSON.stringify(balance))
    // console.log("updatebalance", balance);
  }
  getbalance() {

    try {
      let b = JSON.parse(localStorage.getItem('balance'))
      // console.log(b);
      
      if(b !== null){
        return b;
      }
      else {
        return 0;
      }
    }
    catch (error) {
      console.error(error);
      // expected output: ReferenceError: nonExistentFunction is not defined
      // Note - error messages will vary depending on browser
    }
  }

}
