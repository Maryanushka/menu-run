import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserComponent } from './components/user/user.components';
import { UsersComponent } from './components/users/users.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { UserService } from './services/user.service';
import { PostService } from './services/post.service';
import { DishesService } from './services/dishes.service';
import { ApiService } from './services/api.service';
import { PostComponent } from './components/post/post.component';
import { HttpClientModule } from '@angular/common/http';
import { PostFormComponent } from './components/post-form/post-form.component';
import { HomeComponent } from './components/home/home.component';
import { PostDetailComponent } from './components/post-detail/post-detail.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { DishesComponent } from './components/dishes/dishes.component';
import { DishesDetailComponent } from './components/dishes-detail/dishes-detail.component';
import { BasketComponent } from './components/basket/basket.component';
import { FilterPipe } from './pipes/filter.pipe';

@NgModule({
  declarations: [
		AppComponent,
		UserComponent,
		UsersComponent,
		NavbarComponent,
		PostComponent,
		PostFormComponent,
		HomeComponent,
		PostDetailComponent,
		NotFoundComponent,
		DishesComponent,
		DishesDetailComponent,
		BasketComponent,
		FilterPipe,
		
		
  ],
  imports: [
    BrowserModule,
		AppRoutingModule,
		FormsModule,
		HttpClientModule
  ],
	providers: [UserService, PostService, DishesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
