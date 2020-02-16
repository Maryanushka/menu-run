import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { DishesComponent } from './components/dishes/dishes.component';
import { DishesDetailComponent } from './components/dishes-detail/dishes-detail.component';
import { BasketComponent } from './components/basket/basket.component';

const routes: Routes = [
	{ path: '', component: HomeComponent},
	{ path: 'basket', component: BasketComponent},
	{ path: 'dishes', component: DishesComponent},
	{ path: 'dishes/:id', component: DishesDetailComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
