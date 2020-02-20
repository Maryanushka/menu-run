import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BalanceService {
  balance: number;

  constructor() { }

  updatebalance(balance) {
    localStorage.setItem('balance', JSON.stringify(balance))
  }
  getbalance() {

    try {
      let b = JSON.parse(localStorage.getItem('balance'))

      if(b !== null){
        return b;
      }
      else {
        return 0;
      }
    }
    catch (error) {
      console.error(error);
    }
  }

}
