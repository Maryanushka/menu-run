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

  constructor(private dishService: DishesService) { }

  ngOnInit() {

    this.dishService.selectedItem.subscribe(basket => {
      if (basket != null) {
        this.basketId = basket.basketId;
        this.id = basket.id;
        this.title = basket.title;
        this.price = basket.price;
        this.count = basket.count;
      }

      console.log("Basket component" , basket);
      
    })

  }

}
