import { Component, OnInit } from '@angular/core';
import { Dish, BasketType } from '../../models/Dishes';
import { DishesService } from '../../services/dishes.service';
import { BalanceService } from '../../services/balance.service';
import { NgxSmartModalService } from "ngx-smart-modal";

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
	styleUrls: ['./basket.component.scss']
})
export class BasketComponent implements OnInit {
  basketId: any;
  id?: any;
	title: string;
	originalArr: Dish[];
	balance: number;
  price: number;
  count: number; 
	isNew: boolean = true;
	basket: BasketType[];
	disable: string = '';
	itemKeys: any[];
	items: Array<any> = [];
	PageTitle = "корзина";
	isButtonVisible: boolean = false;
	status: boolean = false;

	constructor(private DishesService: DishesService,
		public ngxSmartModalService: NgxSmartModalService,
		private BalanceService: BalanceService) { }

  ngOnInit() {

		this.getItems();

		this.DishesService.getdishes().subscribe(dishes => {
			this.originalArr = dishes;
		});

		this.getBalance();
	}

	getBalance() {
		let b = this.BalanceService.getbalance();
		if (b > 0) {
			return this.balance = b;
		}
		else return this.balance = 0;
	}
	
	 getItems = () => {
		 this.itemKeys = Object.keys(localStorage);
		 for (const i of this.itemKeys) {
			 if(i !== "balance"){
				 let item = JSON.parse(localStorage.getItem(i));
				 item.status = false;
				 this.items.push(item);
			 }
		 }
	}

	increase(item: BasketType){
		
		let getLocalStorageItem = this.DishesService.getBasketLog(item.basketId);
		let currentBalance = this.BalanceService.getbalance();
		console.log(currentBalance, getLocalStorageItem, this.originalArr[item.basketId].price,  item.basketId, getLocalStorageItem.basketId, this.originalArr);
		if (getLocalStorageItem != null && item.basketId == getLocalStorageItem.basketId) {
			getLocalStorageItem.count += 1;
			getLocalStorageItem.price += this.originalArr[item.basketId-1].price;
			currentBalance += this.originalArr[item.basketId-1].price;
			this.BalanceService.updatebalance(currentBalance);
			this.DishesService.updateBasketLog(getLocalStorageItem);


			return 	this.balance = this.BalanceService.getbalance(),
							item.price = getLocalStorageItem.price, 
							item.count = getLocalStorageItem.count;
		}
	}

	decrease(item: BasketType){
		let getLocalStorageItem = this.DishesService.getBasketLog(item.basketId);
		let currentBalance = this.BalanceService.getbalance();

		if (getLocalStorageItem != null && item.basketId == getLocalStorageItem.basketId) {
			console.log(currentBalance);
			getLocalStorageItem.count -= 1;
			getLocalStorageItem.price -= this.originalArr[item.basketId-1].price;
			currentBalance -= this.originalArr[item.basketId-1].price;
			this.BalanceService.updatebalance(currentBalance);
			this.DishesService.updateBasketLog(getLocalStorageItem)
			console.log(currentBalance);
			

			if(getLocalStorageItem.count == 0) {

				this.DishesService.deleteLog(item.basketId);
				this.items = this.items.filter(el => {
					return el.basketId !== item.basketId
				})
				console.log(currentBalance);
				return this.items, this.balance = this.BalanceService.getbalance();
			}
			else{
				return 	this.balance = this.BalanceService.getbalance(),
								item.price = getLocalStorageItem.price,
								item.count = getLocalStorageItem.count;
			}

		}
	}

	changeClasses(item){
		console.log(item);
		
		item.status = !item.status;
		if (item.status == true){
			item.classes = "open";
		}
		else{
			item.classes = "closed";
		}
	}


	order(e){
		console.log(e);
		this.items.forEach(el => {
			el.status = false;
			el.classes = "blocked";
			console.log(el);
			
		})
		this.isButtonVisible = true;
	}


}
