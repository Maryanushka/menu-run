import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DishesService } from './services/dishes.service';
import { BalanceService } from './services/balance.service';
import { HttpClientModule } from '@angular/common/http';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { DishesComponent } from './components/dishes/dishes.component';
import { DishesDetailComponent } from './components/dishes-detail/dishes-detail.component';
import { BasketComponent } from './components/basket/basket.component';
import { FilterPipe } from './pipes/filter.pipe';

@NgModule({
  declarations: [
		AppComponent,
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
	providers: [
		DishesService,
		BalanceService
	],
  bootstrap: [AppComponent]
})
export class AppModule { }
