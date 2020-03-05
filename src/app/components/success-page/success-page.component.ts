import { Component, OnInit, EventEmitter, Input, Output } from "@angular/core";
import { BalanceService } from '../../services/balance.service';
import { DishesService } from '../../services/dishes.service';
import { Tips } from "../../models/TIps";
import { NgxSmartModalService } from "ngx-smart-modal";
@Component({
  selector: "app-success-page",
  templateUrl: "./success-page.component.html",
  styleUrls: ["./success-page.component.scss"]
})
export class SuccessPageComponent implements OnInit {
  classes: string = "-o";
  tipClasses: string = "unchecked";
  balance: number;
	constructor(private BalanceService: BalanceService,
		public ngxSmartModalService: NgxSmartModalService,
		private DishesService: DishesService,) {}
  rating: number;
  itemId: number;
  @Output() ratingClick: EventEmitter<any> = new EventEmitter<any>();
  inputName: string;
  status: boolean = false;
  tips: Tips[] = [
    {
      id: 1,
      balance: 0,
      classes: "",
      title: '1%',
      status: false
    },
    {
      id: 2,
      balance: 0,
      classes: "",
      title: '5%',
      status: false
    },
    {
      id: 3,
      balance: 0,
      classes: "",
      title: '10%',
      status: false
    }
  ];
  @Input() tip: boolean;
  @Output() toggled: EventEmitter<boolean> = new EventEmitter();

  ngOnInit(): void {
    this.getBalance();
    this.inputName = this.itemId + "_rating";
    console.log(this.tips);
  
    this.tips.forEach(el => {
      switch (el.id) {
        case 1:
          el.balance = this.getBalance() * 0.01;
          break;
        case 2:
          el.balance = this.getBalance() * 0.05;
          break;
        case 3:
          el.balance = this.getBalance() * 0.1;
          break;

        default:
          break;
      }
    });
  }

  getBalance() {
    let b = this.BalanceService.getbalance();
    if (b > 0) {
      return (this.balance = b);
    } else return (this.balance = 0);
  }

  changeClasses(item) {
    let temp = this.BalanceService.getbalance();

    item.value.status = !item.value.status;
    if (item.value.status == true) {
      item.value.classes = "checked";
      this.balance = temp + item.value.balance;
    } else {
      item.value.classes = "";
      this.balance = temp
    }
	}
	sendForm(){
		let ls = this.DishesService.clearLocalStorage();
		console.log(ls);
		
	}
}
