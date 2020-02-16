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
	basketId: any;
	category: any;
	dishUrl: string = '/dishes';
	data: Observable<any>;

	private basketSource = new BehaviorSubject<BasketType>({ id: null, basketId: null, title: '', price: null, count: null, img: '' });
	selectedItem = this.basketSource.asObservable();
	private stateSource = new BehaviorSubject<Boolean>(true);
	stateClear = this.basketSource.asObservable();



	constructor(private http: HttpClient) { 
		this.category = [
      {
				"1": 	"Блюдо дня",
				"2"	:	'Бургеры',	
				"3":	'Закуски',	
				"4":	'Первое',
				"5":	'Завтрак'	,
				"6":	'Ужин'	,
				"7":	'Обед',	
				"8"	:	'Кофе и чай',	
				"9":	'Десерт'	,
				"10":	'Пицца'	,
				"11":	'Алкоголь',	
				"12":	'Салаты/сэндвичи'	,
      }
    ];

		this.dishes = [
			{
        id: 1,
        title: "АТЛАНТА",
        category: "2",
				price: 205 ,
				img: "http://3bc.com.ua/wp-content/uploads/2019/10/бургеры.jpg",
				filters: ['burger'],
				weight: 400,
				rate: 4,
				consist: "СОЛОДОВА БУЛОЧКА, ЯЛОВИЧА КОТЛЕТА, СОУС-ДІП ІЗ СИРУ ЧЕДДЕР, БЕКОН, ЯЙЦЕ, АЙСБЕРГ, СОЛОДКА ЦИБУЛЯ, ТОМАТИ, СОУС БІФ ТА БЛЮ ЧІЗ"
      },
			{
        id: 2,
				title: "БУРГЕР PULLED PORK",
        category: "2",
				price: 179  ,
				img: "http://3bc.com.ua/wp-content/uploads/2019/10/бургеры.jpg",
				filters: ['burger'],
				weight: 280,
				rate: 3,
				consist: "БУЛОЧКА БРІОШ, КОПЧЕНА РВАНА СВИНИНА, КАРТОПЛЯ ПАЙ, ГРУШЕВИЙ ЧАТНІ, КОПЧЕНЕ МАСЛО, СОУС BBQ ІЗ ЧОРНОСЛИВУ"
      },
			{
        id: 3,
				title: "ЧІКЕН ІТАЛІЄЦЬ",
        category: "2",
				price: 179  ,
				img: "http://3bc.com.ua/wp-content/uploads/2019/10/бургеры.jpg",
				filters: ['burger'],
				weight: 310,
				rate: 4,
				consist: "ПШЕНИЧНА БУЛОЧКА, КУРЯЧЕ ФІЛЕ ГРИЛЬ, РУКОЛА, ТОМАТ, ЧІПСИ З ПАРМЕЗАНУ, СОУСИ ЮВІТ ТА ПЕСТО"
      },
			{
        id: 4,
				title: "БАФФАЛО БУРГЕР",
        category: "2",
				price: 179  ,
				img: "http://3bc.com.ua/wp-content/uploads/2019/10/бургеры.jpg",
				filters: ['burger'],
				weight: 310,
				rate: 4,
				consist: "ПШЕНИЧНА БУЛОЧКА, КУРЯЧЕ ФІЛЕ ДІП ФРАЙ, АЙСБЕРГ, ТОМАТ, МАРИНОВАНІ ОГІРКИ, КАРАМЕЛІЗОВАНА ЦИБУЛЯ, СОУСИ ЮВІТ ТА БАФФАЛО"
      },
			{
        id: 5,
				title: "КУРЯЧА ШАУРМА",
        category: "2",
				price: 169,
				img: "http://3bc.com.ua/wp-content/uploads/2019/10/бургеры.jpg",
				filters: ['burger'],
				weight: 280,
				rate: 1,
				consist: "ПШЕНИЧНА ТОРТИЛЬЯ, КУРЯЧЕ ФІЛЕ ГРИЛЬ, СОУС-ДІП ІЗ СИРУ ЧЕДДЕР, АЙСБЕРГ, ТОМАТ, МІКС САЛАТ, ЦИБУЛЯ ПОРЕЙ ФРІ, СОУС ЮВІТ"
      },
			{
        id: 6,
				title: "АЛЯСКА",
        category: "2",
				price: 235,
				img: "http://3bc.com.ua/wp-content/uploads/2019/10/бургеры.jpg",
				filters: ['burger'],
				weight: 260,
				rate: 2,
				consist: "СОЛОДОВА БУЛОЧКА, ФІЛЕ АРКТИЧНОГО ГОЛЬЦЯ ГРИЛЬ, ШПИНАТ, ТОМАТ, КАРТОПЛЯ ПАЙ, СОУСИ ЮВІТ ТА УНАГІ-ВАСАБІ"
      },
			{
        id: 7,
				title: "БІФ БУРГЕР",
        category: "2",
				price: 235,
				img: "http://3bc.com.ua/wp-content/uploads/2019/10/бургеры.jpg",
				filters: ['burger'],
				weight: 350,
				rate: 2,
				consist: "СОЛОДОВА БУЛОЧКА, ФІЛЕ АРКТИЧНОГО ГОЛЬЦЯ ГРИЛЬ, ШПИНАТ, ТОМАТ, КАРТОПЛЯ ПАЙ, СОУСИ ЮВІТ ТА УНАГІ-ВАСАБІ"
      },
			{
        id: 8,
				title: "БІФ БУРГЕР",
        category: "2",
				price: 235,
				img: "http://3bc.com.ua/wp-content/uploads/2019/10/бургеры.jpg",
				filters: ['burger'],
				weight: 350,
				rate: 2,
				consist: "СОЛОДОВА БУЛОЧКА, ФІЛЕ АРКТИЧНОГО ГОЛЬЦЯ ГРИЛЬ, ШПИНАТ, ТОМАТ, КАРТОПЛЯ ПАЙ, СОУСИ ЮВІТ ТА УНАГІ-ВАСАБІ"
      },
			{
        id: 9,
				title: "ДАБЛ БІФ БУРГЕР",
        category: "2",
				price: 215,
				img: "http://3bc.com.ua/wp-content/uploads/2019/10/бургеры.jpg",
				filters: ['burger'],
				weight: 390,
				rate: 3,
				consist: "ПШЕНИЧНА БУЛОЧКА, ПОДВІЙНА ЯЛОВИЧА КОТЛЕТА, СОУС-ДІП ІЗ СИРУ ЧЕДДЕР, АЙСБЕРГ, ТОМАТИ, МАРИНОВАНИЙ ОГІРОК, СОЛОДКА ЦИБУЛЯ, СОУС БІФ"
      },
			{
        id: 10,
				title: "ЦИБУЛЕВИЙ ДАБЛ БІФ З ЕММЕНТАЛЛЕРОМ",
        category: "2",
				price: 219 ,
				img: "http://3bc.com.ua/wp-content/uploads/2019/10/бургеры.jpg",
				filters: ['burger'],
				weight: 420,
				rate: 3,
				consist: "ПШЕНИЧНА БУЛОЧКА, ПОДВІЙНА ЯЛОВИЧА КОТЛЕТА, ПОДВІЙНИЙ СИР ЕММЕНТАЛЛЕР, РОКФОР, ЦИБУЛЯ ПОРЕЙ ФРІ, КАРАМЕЛІЗОВАНА ЦИБУЛЯ, АЙСБЕРГ, СОЛОНИЙ ОГІРОК, СОУС БІФ"
      },
			{
        id: 11,
				title: "БІФ ДЕЛЮКС З КОЗЯЧИМ СИРОМ",
        category: "2",
				price: 195  ,
				img: "http://3bc.com.ua/wp-content/uploads/2019/10/бургеры.jpg",
				filters: ['burger'],
				weight: 340,
				rate: 3,
				consist: "БУЛОЧКА БРІОШ, ЯЛОВИЧА КОТЛЕТА, КОЗЯЧИЙ СИР, СМОРОДИНОВИЙ КОНФІТЮР, КАРАМЕЛІЗОВАНА ЦИБУЛЯ, ЦИБУЛЯ ПОРЕЙ ФРІ"
      },
			{
        id: 12,
				title: "ПОДВІЙНИЙ СИРНИЙ МАНІЯК",
        category: "2",
				price: 219  ,
				img: "http://3bc.com.ua/wp-content/uploads/2019/10/бургеры.jpg",
				filters: ['burger'],
				weight: 370,
				rate: 3,
				consist: "ПШЕНИЧНА БУЛОЧКА, ПОДВІЙНА ЯЛОВИЧА КОТЛЕТА, СОУС-ДІП ІЗ СИРУ ЧЕДДЕР, БРИНЗА, СИР РОКФОР, ЧОРНИЙ КАМАМБЕР, ЧІПСИ З ПАРМЕЗАНУ, АРАХІСОВА ПАСТА, ЦИБУЛЯ ПОРЕЙ ФРІ, МІКС САЛАТ, СОУС БЛЮ ЧІЗ"
      },
		]
      
    
	}

	addToLocalStorage(basket: BasketType) {
		this.basketSource.next(basket);
		localStorage.setItem(`${this.basketSource.value.basketId}`, JSON.stringify(basket))
		console.log("addToLocalStorage", this.basketSource);
	}
	updateBasketLog(basket: BasketType) {
		this.basketSource.next(basket);
		localStorage.setItem(`${this.basketSource.value.basketId}`, JSON.stringify(basket))
		console.log("updateBasketLog", this.basketSource);
	}
	getBasketLog(basketid) {
		// console.log("getBasketLog", JSON.parse(localStorage.getItem(`${basketid}`)));
		return JSON.parse(localStorage.getItem(`${basketid}`));
	}


	getdishes(): Observable<Dish[]> {
		return of(this.dishes);
	}
	getcategories(): Observable<Category[]> {
		return of(this.category);
	}

	getDishDetailUrl(id: number): Observable<Dish> {
		// const url = `${this.dishUrl}/${id}`;
		return  of(this.dishes[id-1]);
	}



	addDishToLocalStorage(item: BasketType) {
		// this.dishes.unshift(log);

		console.log(item);
		let temp  = JSON.stringify(item)
		console.log(temp);
		

		//  add to localstorage 
		localStorage.setItem(`${item.basketId}`, temp)
	}
}
