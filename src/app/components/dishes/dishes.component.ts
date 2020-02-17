import { Component, OnInit } from '@angular/core';
import { DishesService } from '../../services/dishes.service';
import { Dish, BasketType } from '../../models/Dishes';
import mixitup from 'mixitup';

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

	filterText: string;
	price: number;
	statusFIlter: boolean = false;
	selectedFilter: boolean = false;
	title: string;
	status: boolean;
	img: string;
	count: number = 0;
	private toggle: boolean = false;

  constructor(private DishesService: DishesService) {


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



	}


	onFilterChange(e){
		// console.log(e);
		this.filterText = e;
	}
	
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
				status: true,
				count: 1
			}

			this.DishesService.addToLocalStorage(newDish);
		}
		

	}

}
