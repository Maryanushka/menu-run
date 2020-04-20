import { Component, OnInit } from '@angular/core';
import { DishesService } from '../../services/dishes.service';
import { BalanceService } from '../../services/balance.service';
import { Dish, BasketType } from '../../models/Dishes';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from '../../models/app-state.model';
import { FilterOneItem, FilterMultipleItems, DeleteFilterOneItem } from 'src/app/actions/dishes.actions';

@Component({
  selector: 'app-dishes',
  templateUrl: './dishes.component.html',
  styleUrls: ['./dishes.component.scss']
})
export class DishesComponent implements OnInit {
	loaded: boolean = false;
	dishes: Observable<Array<Dish>>;
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
	selectedFilterArr: [] = [];
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
		private BalanceService: BalanceService,
		private store: Store<AppState>) {}

  ngOnInit() {
		this.dishes = this.store.select(store => store.shopping);
		this.DishesService.getcategories().subscribe(cat => {
			this.category = cat;
			this.loaded = true;
		});
		// console.log(this.shoppingItems);
		
		this.DishesService.getFilters().subscribe(filters => {
			this.filters = filters;
			this.loaded = true;
		});
	
		this.getBalance();
	}
	
	deleteItem(id: string) {
		
	}

	onFilterChange(filter){
		filter.selectedFilter = !filter.selectedFilter; 
		
		
		
		if(filter.selectedFilter && this.selectedFilterArr.length > 0){
			console.log(this.selectedFilterArr.length, filter.selectedFilter);
			this.store.dispatch(new FilterMultipleItems(filter.value));
			this.filters.push(filter)
		}
		else if (filter.selectedFilter && this.selectedFilterArr.length == 0){
			console.log(this.selectedFilterArr.length, filter.selectedFilter);
			this.store.dispatch(new FilterOneItem(filter.value));
			this.filters.push(filter)
		}
		else{
			this.store.dispatch(new DeleteFilterOneItem());
		}
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
