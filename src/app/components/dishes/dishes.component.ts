import { Component, OnInit } from '@angular/core';
import { DishesService } from '../../services/dishes.service';
import { Dish, BasketType } from '../../models/Dishes';

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
	basketId: any;
	itemid: any;
	price: number;
	title: string;
	img: string;
	count: number = 0;

  constructor(private DishesService: DishesService) { }

  ngOnInit() {
		this.DishesService.getdishes().subscribe(dishes => {
			this.dishes = dishes;
			this.loaded = true;
		});
		this.DishesService.getcategories().subscribe(category => {
			this.category = category;
			this.loaded = true;
		});

	}

	// generateId() {
	// 	return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
	// 		var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
	// 		return v.toString(16);
	// 	});
	// }
	
	addToBasket(item: BasketType){
		let getLocalStorageItemId = this.DishesService.getBasketLog(item.id);

		if (getLocalStorageItemId != null && item.id == getLocalStorageItemId.basketId){
			let arr = this.DishesService.getBasketLog(item.id);
			console.log(arr);

			arr.count += 1;
			arr.price += arr.price;

			console.log(arr);
			this.DishesService.updateBasketLog(arr);
			
		}
		else {
			let newDish = {
				basketId: item.id,
				itemid: item.id,
				title: item.title,
				price: item.price,
				img: item.img,
				count: 1
			}

			this.DishesService.addToLocalStorage(newDish);
		}
		

	}

}
