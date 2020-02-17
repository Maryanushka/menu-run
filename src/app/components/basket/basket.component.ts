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
  price: number;
  count: number; 
	isNew: boolean = true;
	basket: BasketType[];
	itemKeys: any[];
	items: Array<any> = [];
	PageTitle = "корзина";

  constructor(private dishService: DishesService) { }

  ngOnInit() {

		this.getItems()

    // this.dishService.selectedItem.subscribe(basket => {
		// 	if (localStorage.getItem(`${basket.basketId}`) === null) {
		// 		this.basket = []
		// 	}
		// 	else {
		// 		this.basket = JSON.parse(localStorage.getItem(`${basket.basketId}`));
		// 	}

    //   console.log("Basket component" , this.basket);\
    // })

	}
	
	 getItems = () => {
		 this.itemKeys = Object.keys(localStorage);
		 for (const i of this.itemKeys) {
			 console.log(JSON.parse(localStorage.getItem(i)));
			 let item = JSON.parse(localStorage.getItem(i));
			 this.items.push(item);
		 }
		 console.log(this.items);
		 
	}

}
