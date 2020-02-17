import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { PostComponent } from './components/post/post.component';
import { DishesComponent } from './components/dishes/dishes.component';
import { UsersComponent } from './components/users/users.component';
import { PostDetailComponent } from './components/post-detail/post-detail.component';
import { DishesDetailComponent } from './components/dishes-detail/dishes-detail.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { BasketComponent } from './components/basket/basket.component';

const routes: Routes = [
	{ path: '', component: DishesComponent},
	{ path: 'users', component: UsersComponent},
	{ path: 'posts', component: PostComponent},
	{ path: 'basket', component: BasketComponent},
	{ path: 'dishes', component: DishesComponent},
	{ path: 'post/:id', component: PostDetailComponent},
	{ path: 'dishes/:id', component: DishesDetailComponent},
	{ path: '**', component: NotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
