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
	failArr: Dish[] = [];
	successArr: Dish[] = [];
	dArray: [];
	selectedFilterArr = [];
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
		// this.DishesService.getFilters().subscribe(filters => {
		// 	this.filters = filters;
		// 	this.loaded = true;
		// });
	
		this.getBalance();
	}
	


	onFilterChange(filter, d){
		let arr = this.dishes;
		let tempArr= [];
		if(d){
			this.selectedFilterArr.push(filter.value);
			this.filterCheck(this.selectedFilterArr);
		}
		else if(!d){
			this.selectedFilterArr.forEach(el => {
				if(el != filter.value){
					tempArr.push(el);
				}
			});
			this.selectedFilterArr = tempArr;
			console.log(this.selectedFilterArr);
			
			if(this.selectedFilterArr.length > 0){
				this.filterDelete(this.selectedFilterArr);
			}
			else {
				this.dishes.forEach( el => {
					el.classes = "";
				})
				this.successArr = [];
			}
			
		}
		
		return this.selectedFilterArr;
	}

	filterDelete(arr){
		let temSuccessArr = this.successArr;
		let tempArr = [];
		let tempDishes = this.dishes;
		arr.forEach((selectedFilterItem) => {
			console.log(selectedFilterItem);
			temSuccessArr.forEach((t, i) => {
				t.filters.forEach(f => {
					if (f == selectedFilterItem) {
						console.log(t);
						tempArr.push(t);
					}
				})
			})
		})

		this.successArr = tempArr;
		this.applyShowClass(this.successArr);
		tempDishes = tempDishes.filter(item => !this.successArr.includes(item));
		console.log(this.successArr, tempDishes);
		this.applyHideClass(tempDishes);

	}
	filterCheck (arr){
		let temparr = this.dishes;
		console.log(temparr.length);
		
		arr.forEach( (selectedFilterItem) => {
			console.log(selectedFilterItem);
			temparr.forEach( (t, i) => {
				t.filters.forEach( f => {
					if(f == selectedFilterItem){
						this.successArr.push(t);
						// temparr.splice(i ,1 );
					}
				})
			})
		})
		
		this.applyShowClass(this.successArr);
		temparr = temparr.filter(item => !this.successArr.includes(item));
		console.log(this.successArr, temparr);
		this.applyHideClass(temparr);
		
	}
	applyHideClass(arr){
		arr.forEach(el => { 
			// console.log(el, el.classes);
			
			el.classes = "hide"
			console.log(el, el.classes);
		})
	}
	applyShowClass(arr){
		arr.forEach(el => { 
			// console.log(el, el.classes);
			el.classes = "show";
			console.log(el, el.classes);
		})
	}

	getBalance() {
		let b = this.BalanceService.getbalance();
		if (b > 0){
			return this.balance = b, this.basketClass = "open";
		}
	}


	
	addToBasket(item: BasketType){
		
		let getLocalStorageItemId = this.DishesService.getBasketLog(item.id);
		let currentBalance = this.BalanceService.getbalance();
		if (getLocalStorageItemId != null && item.id == getLocalStorageItemId.basketId){
			let arr = this.DishesService.getBasketLog(item.id);
			
			arr.count += 1;
			arr.price += this.dishes[item.id].price;
			currentBalance += arr.price;
			
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
			
			return this.balance = this.BalanceService.getbalance(), this.basketClass = "open" ;
		}
		

	}

}
