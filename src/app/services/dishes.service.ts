import { Injectable } from '@angular/core';
import { Dish, BasketType } from '../models/Dishes';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { Category } from '../models/Category';

@Injectable({
  providedIn: 'root'
})
export class DishesService {
	dishes: Dish[];
	basket: BasketType;
	basketArr: BasketType[];
	basketId: any;
	category: any;
	filter: any;
	dishUrl: string = '/dishes';
	data: Observable<any>;

	private basketSource = new BehaviorSubject<BasketType>({ id: null, basketId: null, title: '', price: null, count: null, img: '' });
	selectedItem = this.basketSource.asObservable();
	private stateSource = new BehaviorSubject<any>({ null: null});
	stateClear = this.stateSource.asObservable();



	constructor(private http: HttpClient) { 
		this.category = [
      {
				"1"	:	'Сендвiчi',	
				"2"	:	'Бургери',	
				"3":	'Закуски',	
				"4":	'Салати',
				"5":	'Першi страви',
				"6":	'Снiданки',	
				"8":  'Коктейлi',	
				"9":	'Пиво'	,
				"10":	'Десерти',	
				"11": 'Кофе и чай',	
      }
    ];
		this.filter = [
      {
				'Все' : "all",	
				'Сендвiчi': "sandwich",	
				'Бургери' :"burger",	
				'Закуски' :"snaks",	
				'Салати': "salads",
				'Першi страви':"dinner",
				'Снiданки':"breakfast",	
				'Десерти':"desserts",
				'Пиво' :"beer",	
				'Ель':"ale",	
				'Сiдр':"sidr",	
				'Лагер':"lager",	
				'Stout':"stout",	
				'Sour':"sour",	
				'Українське':"ukrainian",	
				'Iноземнe':"foreign",	
				'Коктейлi' :"coctails",	
				'Великi коктейлi':"big-coctails",	
				'Коктельнi сети':"coctails-set",	
				'Шоти':"shot",	
      }
    ];

		this.basketArr = [];
	}

	addToLocalStorage(basket: BasketType) {
		this.basketSource.next(basket);
		localStorage.setItem(`${this.basketSource.value.basketId}`, JSON.stringify(basket))
	}
	removeFromLocalStorage(basket: BasketType): Observable<BasketType> {
		this.stateSource.next(basket);
		
		localStorage.removeItem(`${this.stateSource}`)
		return this.stateSource;
	}
	clearLocalStorage(){
		localStorage.clear();
		return "success"
	}

	deleteLog(basketid: BasketType){
		localStorage.removeItem(`${basketid}`)
	}
	updateBasketLog(basket: BasketType) {
		this.basketSource.next(basket);
		localStorage.setItem(`${this.basketSource.value.basketId}`, JSON.stringify(basket))
	}
	getBasketLog(basketid) {
		return JSON.parse(localStorage.getItem(`${basketid}`));
	}
	// getAllLocalStorage(){
	// 	return localStorage;
	// }
	// getdishes(): Observable<Dish[]> {
	// 	return of(this.dishes);
	// }
	getFilters(): Observable<Dish[]> {
		return of(this.filter);
	}
	getcategories(): Observable<Category[]> {
		return of(this.category);
	}

	getDishDetailUrl(id: number): Observable<Dish> {
		return  of(this.dishes[id-1]);
	}

}
