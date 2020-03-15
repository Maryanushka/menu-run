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
import { NgxSmartModalModule } from "ngx-smart-modal";
import { SuccessPageComponent } from './components/success-page/success-page.component';
import { RatingModule } from "ng-starrating";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
    DishesComponent,
    DishesDetailComponent,
    BasketComponent,
    FilterPipe,
    SuccessPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    RatingModule,
    NgxSmartModalModule.forChild(),
		BrowserAnimationsModule,
		MatRadioModule,
		MatCheckboxModule,
		MatExpansionModule,
		MatFormFieldModule,
		MatInputModule
  ],
  providers: [DishesService, BalanceService],
  bootstrap: [AppComponent]
})
export class AppModule {}
