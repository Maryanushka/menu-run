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

	generateId() {
		return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
			var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
			return v.toString(16);
		});
	}
	
	getItemProperty(item: BasketType){
		// console.log(basket);
		let uniqueId = this.generateId();

		let newDish = {
			basketId: uniqueId,
			itemid: item.id,
			title: item.title,
			price: item.price,
			count: 1
		}

		console.log(newDish);
		
		this.DishesService.setBasketLog(newDish);
	}

}
