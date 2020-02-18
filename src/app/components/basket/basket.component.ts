import { Component, OnInit } from '@angular/core';
import { Dish, BasketType } from '../../models/Dishes';
import { DishesService } from '../../services/dishes.service';
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
  price: number;
  count: number; 
	isNew: boolean = true;
	basket: BasketType[];
	itemKeys: any[];
	items: Array<any> = [];
	PageTitle = "корзина";
	status: boolean = false;

  constructor(private DishesService: DishesService) { }

  ngOnInit() {

		this.getItems();

		this.DishesService.getAllLocalStorage().subscribe( el => {
			console.log(el);
			
			// this.items = el
		})

	}
	
	 getItems = () => {
		 this.itemKeys = Object.keys(localStorage);
		 for (const i of this.itemKeys) {
			 console.log(JSON.parse(localStorage.getItem(i)));
			 let item = JSON.parse(localStorage.getItem(i));
			 item.status = false;
			 this.items.push(item);
		 }
		 console.log(this.items);
		 
	}

	increase(item: BasketType){
		console.log(item);
		let getLocalStorageItemId = this.DishesService.getBasketLog(item.basketId);

		console.log(getLocalStorageItemId);
		
		if (getLocalStorageItemId != null && item.basketId == getLocalStorageItemId.basketId) {
			let arr = this.DishesService.getBasketLog(item.basketId);
			this.DishesService.getdishes().subscribe(dishes => {
				this.originalArr = dishes;
			});
			console.log(arr);
			console.log();
			this.originalArr.forEach(element => {
				if (element.id == item.basketId)
					return this.price = element.price;
				
			});
			arr.count += 1;
			arr.price += this.price;

			console.log(arr);
			this.DishesService.updateBasketLog(arr);
			return item.price = arr.price, item.count = arr.count;
		}
	}

	decrease(item: BasketType){
		console.log(item);
		let getLocalStorageItemId = this.DishesService.getBasketLog(item.basketId);

		console.log(getLocalStorageItemId);

		if (getLocalStorageItemId != null && item.basketId == getLocalStorageItemId.basketId) {
			let arr = this.DishesService.getBasketLog(item.basketId);
			this.DishesService.getdishes().subscribe(dishes => {
				this.originalArr = dishes;
			});
			console.log(arr);
			console.log();
			this.originalArr.forEach(element => {
				if (element.id == item.basketId)
					return this.price = element.price;

			});
			arr.count -= 1;
			arr.price -= this.price;

			if(arr.count == 0) {
				console.log(item.basketId);
				
				this.DishesService.removeFromLocalStorage(item.basketId)
			}
			else{
				this.DishesService.updateBasketLog(arr);
				return item.price = arr.price, item.count = arr.count;
			}

		}
	}

}
