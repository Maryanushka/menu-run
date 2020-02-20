import { Component, OnInit } from '@angular/core';
import { DishesService } from '../../services/dishes.service';
import { BalanceService } from '../../services/balance.service';
import { Dish, BasketType } from '../../models/Dishes';
// import { AnyMxRecord } from 'dns';
// import mixitup from 'mixitup';

@Component({
  selector: 'app-dishes',
  templateUrl: './dishes.component.html',
  styleUrls: ['./dishes.component.scss']
})
export class DishesComponent implements OnInit {
	loaded: boolean = false;
	dishes: Dish[];
	basket: BasketType;
	category: any;
	filters: any;
	basketId: any;
	itemid: any;
	balance: number;
	originalArr: Dish[];
	filterText: string;
	price: number;
	statusFIlter: boolean = false;
	selectedFilter: boolean = false;
	title: string;
	status: boolean;
	img: string;
	basketClass: string;
	count: number = 0;
	basketPrice: any;
	private balanceTemp: number = 0;
	private toggle: boolean = false;

	constructor(private DishesService: DishesService,
		private BalanceService: BalanceService) {


			// this.selectedFilter = this.filters;
		
	 }

  ngOnInit() {
		this.DishesService.getdishes().subscribe(dishes => {
			this.dishes = dishes;
			this.loaded = true;
		});
		this.DishesService.getcategories().subscribe(category => {
			this.category = category;
			this.loaded = true;
		});
		this.DishesService.getFilters().subscribe(filters => {
			this.filters = filters;
			this.loaded = true;
		});
	
		this.getBalance();
	}

	getBalance() {
		let b = this.BalanceService.getbalance();
		if (b > 0){
			return this.balance = b, this.basketClass = "open";
		}
	}


	
	addToBasket(item: BasketType){
		// console.log(item);
		
		let getLocalStorageItemId = this.DishesService.getBasketLog(item.id);
		let currentBalance = this.BalanceService.getbalance();
		// console.log(getLocalStorageItemId, currentBalance);
		
		if (getLocalStorageItemId != null && item.id == getLocalStorageItemId.basketId){
			let arr = this.DishesService.getBasketLog(item.id);

			// console.log(arr.price, this.dishes[item.id].price);
			
			arr.count += 1;
			arr.price += this.dishes[item.id].price;

			currentBalance += arr.price;

			// console.log(currentBalance);
			
			this.BalanceService.updatebalance(currentBalance);
			this.DishesService.updateBasketLog(arr);
			return this.balance = this.BalanceService.getbalance(), this.basketClass = "open"; 
		}
		else {
			let newDish = {
				basketId: item.id,
				itemid: item.id,
				title: item.title,
				price: item.price,
				img: item.img,
				status: true,
				count: 1
			}

				if(currentBalance != 0){
					currentBalance += newDish.price;
					this.BalanceService.updatebalance(currentBalance);
				}
				else{
					this.BalanceService.updatebalance(newDish.price);
				}

			this.DishesService.addToLocalStorage(newDish);
			
			// console.log(newDish.price);
			
			return this.balance = this.BalanceService.getbalance(), this.basketClass = "open" ;
		}
		

	}

}
