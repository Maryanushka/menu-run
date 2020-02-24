import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DishesComponent } from './components/dishes/dishes.component';
import { DishesDetailComponent } from './components/dishes-detail/dishes-detail.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { BasketComponent } from './components/basket/basket.component';
import { SuccessPageComponent } from './components/success-page/success-page.component';

const routes: Routes = [
	{ path: '', component: DishesComponent},
	{ path: 'basket', component: BasketComponent},
	{ path: 'success', component: SuccessPageComponent},
	{ path: 'dishes/:id', component: DishesDetailComponent},
	{ path: '**', component: NotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
