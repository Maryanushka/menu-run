import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DishesService } from '../../services/dishes.service';
import { Dish } from '../../models/Dishes';

@Component({
  selector: 'app-dishes-detail',
  templateUrl: './dishes-detail.component.html',
  styleUrls: ['./dishes-detail.component.scss']
})
export class DishesDetailComponent implements OnInit {
  dish: Dish;
	panelOpenState: boolean = true;
  constructor(private route: ActivatedRoute, private dishesService: DishesService) { }

  ngOnInit() {

    const id = +this.route.snapshot.paramMap.get("id");
    this.dishesService.getDishDetailUrl(id).subscribe(dish => this.dish = dish);
  }

}
