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
		this.dishes = [
			{
        id: 1,
        title: "АТЛАНТА",
        category: "2",
				price: 205 ,
				img: "http://3bc.com.ua/wp-content/uploads/2019/10/бургеры.jpg",
				filters: ['burger'],
				weight: '400',
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
				weight: '280',
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
				weight: '310',
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
				weight: '310',
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
				weight: '280',
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
				weight: '260',
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
				weight: '350',
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
				weight: '350',
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
				weight: '390',
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
				weight: '420',
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
				weight: '340',
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
				weight: '370',
				rate: 3,
				consist: "ПШЕНИЧНА БУЛОЧКА, ПОДВІЙНА ЯЛОВИЧА КОТЛЕТА, СОУС-ДІП ІЗ СИРУ ЧЕДДЕР, БРИНЗА, СИР РОКФОР, ЧОРНИЙ КАМАМБЕР, ЧІПСИ З ПАРМЕЗАНУ, АРАХІСОВА ПАСТА, ЦИБУЛЯ ПОРЕЙ ФРІ, МІКС САЛАТ, СОУС БЛЮ ЧІЗ"
      },
			{
        id: 13,
				title: "М’ЯСНЕ АСОРТІ",
        category: "3",
				price: 199,
				img: "http://3bc.com.ua/wp-content/uploads/2019/10/закуски.jpg",
				filters: ['snacks'],
				weight: "140/30/20",
				rate: 3,
				consist: "КОНИНА, СУДЖУК, КОПЧЕНА РВАНА СВИНИНА, БЕКОН, В'ЯЛЕНА ЯЛОВИЧИНА. ПОДАЄМО З ГРІНКАМИ ТА ГІРЧИЦЕЮ"
      },
			{
        id: 14,
				title: "ПИВНИЙ СЕТ",
        category: "3",
				price: 299,
				img: "http://3bc.com.ua/wp-content/uploads/2019/10/закуски.jpg",
				filters: ['snacks'],
				weight: "350/60/60",
				rate: 3,
				consist: "В'ЯЛЕНА РИБКА ДО ПИВА, В'ЯЛЕНА ЯЛОВИЧИНА, СИР ФРІ, КОПЧЕНІ СВИНЯЧІ ВУХА, ЖИТНІ ГРІНКИ, КАРТОПЛЯ ПАЙ. ПОДАЄМО З МОРКВЯНО-СЕЛЕРОВИМИ ПАЛИЧКАМИ, ІКОРНИМ СОУСОМ ТА СОУСОМ БЛЮ ЧІЗ"
      },
			{
        id: 15,
				title: "АСОРТІ ЗАКУСОК",
        category: "3",
				price: 269,
				img: "http://3bc.com.ua/wp-content/uploads/2019/10/закуски.jpg",
				filters: ['snacks'],
				weight: "680",
				rate: 3,
				consist: "БАКЛАЖАННА ІКРА, ПЕЧЕНІ ОВОЧІ, ЖИТНІ ГРІНКИ, САЛО ШПИК, ПАШТЕТ, СЛАБОСОЛЕНА РИБА, МАРИНОВАНІ ОГІРКИ, КОПЧЕНА РВАНА СВИНИНА, ЧАСНИКОВІ СТРІЛКИ. ПОДАЄМО З ІКОРНИМ СОУСОМ"
      },
			{
        id: 16,
				title: "СИРНА ТАРІЛКА",
        category: "3",
				price: 249,
				img: "http://3bc.com.ua/wp-content/uploads/2019/10/закуски.jpg",
				filters: ['snacks'],
				weight: "130/30/25/20",
				rate: 3,
				consist: "ЧОРНИЙ КАМАМБЕР, РОКФОР, ПАРМЕЗАН, ЧІПСИ З ПАРМЕЗАНУ, ФЕРМЕРСЬКА БРИНЗА, ФЕРМЕРСЬКА РІКОТА, СОУС-ДІП ІЗ СИРУ ЧЕДДЕР З ТРЮФЕЛЕМ. ПОДАЄМО З ГРУШЕВИМ ЧАТНІ"
      },
			{
        id: 17,
				title: "КАРПАЧО",
        category: "3",
				price: 165,
				img: "http://3bc.com.ua/wp-content/uploads/2019/10/закуски.jpg",
				filters: ['snacks'],
				weight: "170",
				rate: 3,
      },
			{
        id: 18,
				title: "БАСТУРМА",
        category: "3",
				price: 85,
				img: "http://3bc.com.ua/wp-content/uploads/2019/10/закуски.jpg",
				filters: ['snacks'],
				weight: "50",
				rate: 3,
      },
			{
        id: 19,
				title: "ПАШТЕТ З ЯЛОВИЧОЇ ПЕЧІНКИ",
        category: "3",
				price: 115,
				img: "http://3bc.com.ua/wp-content/uploads/2019/10/закуски.jpg",
				filters: ['snacks'],
				weight: "150/60",
				rate: 3,
				consist: "ЗІ СМОРОДИНОВИМ ЖЕЛЕ. ПОДАЄМО З ТОСТАМИ"
      },
			{
        id: 20,
				title: "КОПЧЕНІ СВИНЯЧІ ВУХА З КАРТОПЛЕЮ ПАЙ",
        category: "3",
				price: 95,
				img: "http://3bc.com.ua/wp-content/uploads/2019/10/закуски.jpg",
				filters: ['snacks'],
				weight: "180",
				rate: 3,
      },
			{
        id: 21,
				title: "КУРЯЧІ НАГЕТСИ З ПАРМЕЗАНОМ",
        category: "3",
				price: 129,
				img: "http://3bc.com.ua/wp-content/uploads/2019/10/закуски.jpg",
				filters: ['snacks'],
				weight: "180/30",
				rate: 3,
				consist: "ФІЛЕ КУРКИ У МАРИНАДІ З ЙОГУРТУ ТА ПАРМЕЗАНУ , У СУХАРЯХ ПАНКО. ПОДАЄМО З СОУСОМ БЛЮ ЧІЗ"
      },
			{
        id: 22,
				title: "КУРЯЧІ КРИЛЬЦЯ",
        category: "3",
				price: 119,
				img: "http://3bc.com.ua/wp-content/uploads/2019/10/закуски.jpg",
				filters: ['snacks'],
				weight: "230/30/30",
				rate: 3,
				consist: "В СОУСІ УНАГІ З САЛЬСОЮ ІЗ КІНЗИ ТА ЧИЛІ. ПОДАЄМО З МОРКВЯНИМИ ПАЛИЧКАМИ ТА СОУСОМ ЮВІТ"
      },
			{
        id: 23,
				title: "СМОРЕБРОД",
        category: "3",
				price: 129,
				img: "http://3bc.com.ua/wp-content/uploads/2019/10/закуски.jpg",
				filters: ['snacks'],
				weight: "260/50",
				rate: 3,
				consist: "З СЛАБОСОЛЕНОЮ РИБОЮ, ПЕЧЕНИМИ ОВОЧАМИ ТА ІКОРНИМ СОУСОМ. ПОДАЄМО З КАРТОПЛЕЮ ПО-СЕЛЯНСЬКИ"
      },
			{
        id: 24,
				title: "БРУСКЕТИ З ІКРОЮ ІЗ ПЕЧЕНИХ ОВОЧІВ",
        category: "3",
				price: 89,
				img: "http://3bc.com.ua/wp-content/uploads/2019/10/закуски.jpg",
				filters: ['snacks'],
				weight: "200",
				rate: 3,
      },
			{
        id: 25,
				title: "БРУСКЕТИ З АРКТИЧНИМ ГОЛЬЦЕМ І ТОМАТАМИ",
        category: "3",
				price: 109,
				img: "http://3bc.com.ua/wp-content/uploads/2019/10/закуски.jpg",
				filters: ['snacks'],
				weight: "140",
				rate: 3,
      },
			{
        id: 26,
				title: "ЖИТНІ ГРІНКИ З ІКОРНИМ СОУСОМ",
        category: "3",
				price: 75,
				img: "http://3bc.com.ua/wp-content/uploads/2019/10/закуски.jpg",
				filters: ['snacks'],
				weight: "120/50",
				rate: 3,
      },
			{
        id: 27,
				title: "КУКУРУДЗА ГРИЛЬ ІЗ ЗЕЛЕНИМ МАСЛОМ",
        category: "3",
				price: 49,
				img: "http://3bc.com.ua/wp-content/uploads/2019/10/закуски.jpg",
				filters: ['snacks'],
				weight: "1 шт",
				rate: 3,
      },
			{
        id: 28,
				title: "СИР ФРІ",
        category: "3",
				price: 95,
				img: "http://3bc.com.ua/wp-content/uploads/2019/10/закуски.jpg",
				filters: ['snacks'],
				weight: "150/30/30/30",
				rate: 3,
      },
			{
        id: 29,
				title: "В'ЯЛЕНИЙ ГОЛЕЦЬ",
        category: "3",
				price: 125,
				img: "http://3bc.com.ua/wp-content/uploads/2019/10/закуски.jpg",
				filters: ['snacks'],
				weight: "40",
				rate: 3,
      },
			{
        id: 30,
				title: "В'ЯЛЕНА РИБКА",
        category: "3",
				price: 69,
				img: "http://3bc.com.ua/wp-content/uploads/2019/10/закуски.jpg",
				filters: ['snacks'],
				weight: "50",
				rate: 3,
      },
			{
        id: 31,
				title: "НАЧОС ІЗ СИРНИМ ДІПОМ",
        category: "3",
				price: 49,
				img: "http://3bc.com.ua/wp-content/uploads/2019/10/закуски.jpg",
				filters: ['snacks'],
				weight: "100",
				rate: 3,
      },
			{
        id: 32,
				title: "КОББ САЛАТ",
        category: "4",
				price: 159,
				img: "http://3bc.com.ua/wp-content/uploads/2017/12/Кобб-салат.jpg",
				filters: ['salads'],
				weight: "300",
				rate: 3,
				consist: "МІКС САЛАТ З КУРКОЮ ГРИЛЬ, РОКФОРОМ, КУКУРУДЗОЮ, СЕЛЕРОЮ, ОГІРКОМ, ТОМАТАМИ ЧЕРІ, ЧІПСАМИ З БЕКОНУ, ЯЙЦЕМ ТА ОЛИВКОВО-ГІРЧИЧНОЮ ЗАПРАВКОЮ"
      },
			{
        id: 33,
				title: "САЛАТ З ОВОЧАМИ ТА РІКОТОЮ",
        category: "4",
				price: 125,
				img: "http://3bc.com.ua/wp-content/uploads/2017/12/Кобб-салат.jpg",
				filters: ['salads'],
				weight: "380/30",
				rate: 3,
				consist: "МІКС САЛАТ З ПЕЧЕНИМИ ОВОЧАМИ, ФЕРМЕРСЬКОЮ РІКОТОЮ, СИРОМ ФЕТА, ТОМАТАМИ ЧЕРІ ТА ОЛИВКАМИ КАЛАМАТА"
      },
			{
        id: 34,
				title: "ЦЕЗАР З КУРКОЮ І ЧІПСАМИ З БЕКОНУ",
        category: "4",
				price: 145,
				img: "http://3bc.com.ua/wp-content/uploads/2017/12/Кобб-салат.jpg",
				filters: ['salads'],
				weight: "260",
				rate: 3,
				consist: "САЛАТ РОМЕН З СОУСОМ ЦЕЗАР, КУРЯЧОЮ ГРУДКОЮ, ЧЕРІ, КРУТОНАМИ, ЧІПСАМИ З БЕКОНУ, ПАРМЕЗАНОМ І ЯЙЦЕМ"
      },
			{
        id: 35,
				title: "ТЕПЛИЙ САЛАТ",
        category: "4",
				price: 135,
				img: "http://3bc.com.ua/wp-content/uploads/2017/12/Кобб-салат.jpg",
				filters: ['salads'],
				weight: "230",
				rate: 3,
				consist: "З МЕДАЛЬЙОНАМИ З КУРЯЧОЇ ПЕЧІНКИ І ЧОРНИМ КАМАМБЕРОМ"
      },
			{
        id: 36,
				title: "КАЛІФОРНІЙСЬКИЙ",
        category: "4",
				price: 159,
				img: "http://3bc.com.ua/wp-content/uploads/2017/12/Кобб-салат.jpg",
				filters: ['salads'],
				weight: "260",
				rate: 3,
				consist: "МІКС САЛАТ З СЛАБОСОЛЕНИМ АРКТИЧНИМ ГОЛЬЦЕМ, СИРОМ ФЕТА, АПЕЛЬСИНОМ, ЧЕРІ ТА КУНЖУТОМ"
      },
			{
        id: 37,
				title: "БОРЩ З КОПЧЕНОЮ СВИНИНОЮ І БЕБІ ХЛІБОМ",
        category: "5",
				price: 85,
				img: "http://3bc.com.ua/wp-content/uploads/2019/10/супы.jpg",
				filters: ['dinner'],
				weight: "330/30/30/30",
				rate: 3,
      },
			{
        id: 38,
				title: "БОРЩ ДЕ ЛЮКС",
        category: "5",
				price: 109,
				img: "http://3bc.com.ua/wp-content/uploads/2019/10/супы.jpg",
				filters: ['dinner'],
				weight: "450/70/50/30/30/40",
				rate: 4,
				consist: "ПОДАЄМО З ТЕМНИМ ХЛІБОМ, САЛОМ ШПИК, ЦИБУЛЕЮ, ЧАСНИКОМ, КОПЧЕНИМ СВИНЯЧИМ РЕБРОМ І ЧАРКОЮ ХРІНОВУХИ"
      },
			{
        id: 39,
				title: "БУЛЬЙОН КУРЯЧИЙ",
        category: "5",
				price: 59,
				img: "http://3bc.com.ua/wp-content/uploads/2019/10/супы.jpg",
				filters: ['dinner'],
				weight: "300/10",
				rate: 4,
				consist: "З ЛОКШИНОЮ УДОН ТА ЦИБУЛЕВИМИ КРУТОНАМИ"
      },
			{
        id: 40,
				title: "ЦИБУЛЕВИЙ СУП",
        category: "5",
				price: 89,
				img: "http://3bc.com.ua/wp-content/uploads/2019/10/супы.jpg",
				filters: ['dinner'],
				weight: "340",
				rate: 4,
      },
			{
        id: 41,
				title: "ЧІЗКЕЙК",
        category: "10",
				price: 85,
				img: "http://3bc.com.ua/wp-content/uploads/2019/10/десерты.jpg",
				filters: ['desserts'],
				weight: "150/30",
				rate: 4,
      },
			{
        id: 42,
				title: "CHIEF КЕЙК",
        category: "10",
				price: 85,
				img: "http://3bc.com.ua/wp-content/uploads/2019/10/десерты.jpg",
				filters: ['desserts'],
				weight: "160/30",
				rate: 4,
      },
			{
        id: 43,
				title: "БРАУНІ З ВИШНЕЮ ТА МОРОЗИВОМ",
        category: "10",
				price: 95,
				img: "http://3bc.com.ua/wp-content/uploads/2019/10/десерты.jpg",
				filters: ['desserts'],
				weight: "160/40",
				rate: 4,
      },
			{
        id: 44,
				title: "ЛИМОННИЙ ТАРТ",
        category: "10",
				price: 89,
				img: "http://3bc.com.ua/wp-content/uploads/2019/10/десерты.jpg",
				filters: ['desserts'],
				weight: "110",
				rate: 4,
      },
			{
        id: 45,
				title: "СЕНДВІЧ З АРКТИЧНИМ ГОЛЬЦЕМ ТА ШПИНАТОМ",
        category: "6",
				price: 129,
				img: "http://3bc.com.ua/wp-content/uploads/2019/10/завтраки.jpg",
				filters: ['breakfast'],
				weight: "260",
				rate: 4,
				consist: "СОЛОДОВА БУЛОЧКА, ШПИНАТ, ЧЕРІ, ЯЙЦЕ ПАШОТ, ГОЛЕЦЬ СЛАБОСОЛЕНИЙ, СИР ФЕТА, МІКС САЛАТ, БАЛЬЗАМІЧНИЙ КРЕМ, ОЛИВКОВО-КУНЖУТНА ЗАПРАВКА ТА СОУС УНАГІ-ВАСАБІ"
      },
			{
        id: 46,
				title: "ЯЄЧНЯ З БЕКОНОМ І ТОСТАМИ",
        category: "6",
				price: 89,
				img: "http://3bc.com.ua/wp-content/uploads/2019/10/завтраки.jpg",
				filters: ['breakfast'],
				weight: "250/30/20",
				rate: 4,
      },
			{
        id: 47,
				title: "СКРЕМБЛ З ОВОЧАМИ",
        category: "6",
				price: 75,
				img: "http://3bc.com.ua/wp-content/uploads/2019/10/завтраки.jpg",
				filters: ['breakfast'],
				weight: "260",
				rate: 4,
      },
			{
        id: 48,
				title: "СИРНИКИ",
        category: "6",
				price: 89,
				img: "http://3bc.com.ua/wp-content/uploads/2019/10/завтраки.jpg",
				filters: ['breakfast'],
				weight: "150/30/30",
				rate: 4,
      },
			{
        id: 49,
				title: "ВІВСЯНА КАША З АРАХІСОВОЮ ПАСТОЮ, ЧЕДДЕРОМ І ЧІПСАМИ З БЕКОНУ",
        category: "6",
				price: 69,
				img: "http://3bc.com.ua/wp-content/uploads/2019/10/завтраки.jpg",
				filters: ['breakfast'],
				weight: "400",
				rate: 4,
      },
			{
        id: 50,
				title: "ВІВСЯНА КАША З ФРУКТАМИ ТА ЯГОДАМИ",
        category: "6",
				price: 69,
				img: "http://3bc.com.ua/wp-content/uploads/2019/10/завтраки.jpg",
				filters: ['breakfast'],
				weight: "400",
				rate: 4,
      },
			{
        id: 51,
				title: "ХАШБРАУН ЗІ СЛАБОСОЛЕНИМ ГОЛЬЦЕМ І ПАШОТ",
        category: "6",
				price: 129,
				img: "http://3bc.com.ua/wp-content/uploads/2019/10/завтраки.jpg",
				filters: ['breakfast'],
				weight: "150/120/30/30",
				rate: 4,
      },
			{
        id: 52,
				title: "КРАФТ ТИЖНЯ — ПИВНИЙ ГУРМАН ЗАПИТУЙ У ОФІЦІАНТА",
        category: "9",
				price: 42,
				img: "http://3bc.com.ua/wp-content/uploads/2018/02/ilovepdf_com-1-1.jpg",
				filters: ['beer'],
				weight: "250 ml",
				rate: 5,
				consist: "ОБЕРЕЖНО!!! ТІЛЬКИ ДЛЯ ГУРМАНІВ"
      },
			{
        id: 53,
				title: "ЗОЛОТОЙ ЭЛЬ BY KUMPEL",
        category: "9",
				price: 62 ,
				img: "http://3bc.com.ua/wp-content/uploads/2018/02/ilovepdf_com-1-1.jpg",
				filters: ['ale' , 'beer'],
				weight: "400 ml",
				rate: 5,
      },
			{
        id: 54,
				title: "KÖLSCH BY BEER BOWL",
        category: "9",
				price: 54 ,
				img: "http://3bc.com.ua/wp-content/uploads/2018/02/ilovepdf_com-1-1.jpg",
				filters: ['ale' , 'beer'],
				weight: "400 ml",
				rate: 5,
      },
			{
        id: 55,
				title: "HEFEWEISS BY BEER BOWL",
        category: "9",
				price: 62 ,
				img: "http://3bc.com.ua/wp-content/uploads/2018/02/ilovepdf_com-1-1.jpg",
				filters: ['ale' , 'beer'],
				weight: "400 ml",
				rate: 5,
      },
			{
        id: 56,
				title: "REBREW WHEAT",
        category: "9",
				price: 62 ,
				img: "http://3bc.com.ua/wp-content/uploads/2018/02/ilovepdf_com-1-1.jpg",
				filters: ['ale' , 'beer'],
				weight: "400 ml",
				rate: 5,
      },
			{
        id: 57,
				title: "L.APA APA FIRST DNIPRO BREWERY",
        category: "9",
				price: 62 ,
				img: "http://3bc.com.ua/wp-content/uploads/2018/02/ilovepdf_com-1-1.jpg",
				filters: ['ale' , 'beer'],
				weight: "400 ml",
				rate: 5,
      },
			{
        id: 58,
				title: "KRONENBOURG BLANC",
        category: "9",
				price: 54 ,
				img: "http://3bc.com.ua/wp-content/uploads/2018/02/ilovepdf_com-1-1.jpg",
				filters: ['ale' , 'beer'],
				weight: "400 ml",
				rate: 5,
      },
			{
        id: 59,
				title: "ЛІСОВА ПІСНЯ BY КРАПКА КОМА",
        category: "9",
				price: 62,
				img: "http://3bc.com.ua/wp-content/uploads/2018/02/ilovepdf_com-1-1.jpg",
				filters: ['ale' , 'beer'],
				weight: "400 ml",
				rate: 5,
      },
			{
        id: 60,
				title: "BARBADOS IPA BY SEVEN BRIDGES",
        category: "9",
				price: 65,
				img: "http://3bc.com.ua/wp-content/uploads/2018/02/ilovepdf_com-1-1.jpg",
				filters: ['ale' , 'beer'],
				weight: "400 ml",
				rate: 5,
      },
			{
        id: 61,
				title: "КОМЕТА IPA BY VOLTA BREWERY",
        category: "9",
				price: 62,
				img: "http://3bc.com.ua/wp-content/uploads/2018/02/ilovepdf_com-1-1.jpg",
				filters: ['ale' , 'beer'],
				weight: "400 ml",
				rate: 5,
      },
			{
        id: 62,
				title: "GOLDEN ALE FIRST DNIPRO BREWERY",
        category: "9",
				price: 62,
				img: "http://3bc.com.ua/wp-content/uploads/2018/02/ilovepdf_com-1-1.jpg",
				filters: ['ale' , 'beer'],
				weight: "400 ml",
				rate: 5,
      },
			{
        id: 63,
				title: "VARVAR BRUT IPA",
        category: "9",
				price: 75,
				img: "http://3bc.com.ua/wp-content/uploads/2018/02/ilovepdf_com-1-1.jpg",
				filters: ['ale' , 'beer'],
				weight: "400 ml",
				rate: 5,
      },
			{
        id: 64,
				title: "GRIMBERGEN DOUBLE AMBREE",
        category: "9",
				price: 79,
				img: "http://3bc.com.ua/wp-content/uploads/2018/02/ilovepdf_com-1-1.jpg",
				filters: ['ale' , 'beer'],
				weight: "400 ml",
				rate: 5,
      },
			{
        id: 65,
				title: "STONE RIPPER",
        category: "9",
				price: 89,
				img: "http://3bc.com.ua/wp-content/uploads/2018/02/ilovepdf_com-1-1.jpg",
				filters: ['ale' , 'beer'],
				weight: "400 ml",
				rate: 5,
      },
			{
        id: 66,
				title: "APPS CIDER",
        category: "9",
				price: 49,
				img: "http://3bc.com.ua/wp-content/uploads/2018/02/ilovepdf_com-1-1.jpg",
				filters: ['sidr' , 'beer'],
				weight: "400 ml",
				rate: 5,
      },
			{
        id: 67,
				title: "PILSNER FIRST DNIPRO BREWERY",
        category: "9",
				price: 54,
				img: "http://3bc.com.ua/wp-content/uploads/2018/02/ilovepdf_com-1-1.jpg",
				filters: ['lager' , 'beer'],
				weight: "400 ml",
				rate: 5,
      },
			{
        id: 68,
				title: "CARLSBERG",
        category: "9",
				price: 49,
				img: "http://3bc.com.ua/wp-content/uploads/2018/02/ilovepdf_com-1-1.jpg",
				filters: ['lager' , 'beer'],
				weight: "400 ml",
				rate: 5,
      },
			{
        id: 69,
				title: "LITOVEL CLASSIC LAGER",
        category: "9",
				price: 69,
				img: "http://3bc.com.ua/wp-content/uploads/2018/02/ilovepdf_com-1-1.jpg",
				filters: ['lager' , 'beer'],
				weight: "400 ml",
				rate: 5,
      },
			{
        id: 70,
				title: "LITOVEL DARK LAGER",
        category: "9",
				price: 69,
				img: "http://3bc.com.ua/wp-content/uploads/2018/02/ilovepdf_com-1-1.jpg",
				filters: ['lager' , 'beer'],
				weight: "400 ml",
				rate: 5,
      },
			{
        id: 71,
				title: "WARSTEINER PREMIUM VERUM",
        category: "9",
				price: 74,
				img: "http://3bc.com.ua/wp-content/uploads/2018/02/ilovepdf_com-1-1.jpg",
				filters: ['lager' , 'beer'],
				weight: "400 ml",
				rate: 5,
      },
			{
        id: 72,
				title: "AMERICAN STOUT BY SEVEN BRIDGES",
        category: "9",
				price: 62,
				img: "http://3bc.com.ua/wp-content/uploads/2018/02/ilovepdf_com-1-1.jpg",
				filters: ['stout' , 'beer'],
				weight: "400 ml",
				rate: 5,
      },
			{
        id: 73,
				title: "VARVAR MILK STOUT",
        category: "9",
				price: 69,
				img: "http://3bc.com.ua/wp-content/uploads/2018/02/ilovepdf_com-1-1.jpg",
				filters: ['stout' , 'beer'],
				weight: "400 ml",
				rate: 5,
      },
			{
        id: 74,
				title: "CAPTAIN SALT",
        category: "9",
				price: 29,
				img: "http://3bc.com.ua/wp-content/uploads/2018/02/ilovepdf_com-1-1.jpg",
				filters: ['sour' , 'beer'],
				weight: "250 ml",
				rate: 5,
      },
			{
        id: 75,
				title: "6 ВИДІВ УКРАЇНСЬКОГО КРАФТОВОГО ПИВА НА ВИБІР",
        category: "9",
				price: 99,
				img: "http://3bc.com.ua/wp-content/uploads/2018/02/ilovepdf_com-1-1.jpg",
				filters: ['ukrainian' , 'beer'],
				weight: "6*100 ml",
				rate: 5,
      },
			{
        id: 76,
				title: "6 ВИДІВ ІНОЗЕМНОГО КРАФТОВОГО ПИВА НА ВИБІР",
        category: "9",
				price: 129,
				img: "http://3bc.com.ua/wp-content/uploads/2018/02/ilovepdf_com-1-1.jpg",
				filters: ['foreign' , 'beer'],
				weight: "6*100 ml",
				rate: 5,
      },
			{
        id: 77,
				title: "MARTINI FIERO & TONIC",
        category: "8",
				price: 155,
				img: "http://3bc.com.ua/wp-content/uploads/2017/12/photo_2018-03-21_16-30-04.jpg",
				filters: ['coctails'],
				weight: "300 ml",
				rate: 5,
				consist: "MARTINI FIERO, ТОНІК, АПЕЛЬСИН"
      },
			{
        id: 78,
				title: "ITALY SPRITZ",
        category: "8",
				price: 155,
				img: "http://3bc.com.ua/wp-content/uploads/2017/12/photo_2018-03-21_16-30-04.jpg",
				filters: ['coctails'],
				weight: "260 ml",
				rate: 5,
				consist: "MARTINI FIERO, MARTINI RISERVA BITTER, ІГРИСТЕ ВИНО БРЮТ"
      },
			{
        id: 79,
				title: "CORONA CHERRY BOURBON",
        category: "8",
				price: 155,
				img: "http://3bc.com.ua/wp-content/uploads/2017/12/photo_2018-03-21_16-30-04.jpg",
				filters: ['coctails'],
				weight: "500 ml",
				rate: 5,
				consist: "CORONA, БУРБОН, ВИШНЕВИЙ СІК ТА ВИШНЕВИЙ КОНФІТЮР"
      },
			{
        id: 80,
				title: "CORONA GREEN TEA CUCUMBER",
        category: "8",
				price: 155,
				img: "http://3bc.com.ua/wp-content/uploads/2017/12/photo_2018-03-21_16-30-04.jpg",
				filters: ['coctails'],
				weight: "500 ml",
				rate: 5,
				consist: "CORONA, ДЖИН BOMBAY SAPPHIRE, СИРОП ОГІРОК, СИРОП ЗЕЛЕНИЙ ЧАЙ, ЛИМОННИЙ ФРЕШ"
      },
			{
        id: 81,
				title: "CORONA SUNSETS",
        category: "8",
				price: 155,
				img: "http://3bc.com.ua/wp-content/uploads/2017/12/photo_2018-03-21_16-30-04.jpg",
				filters: ['coctails'],
				weight: "500 ml",
				rate: 5,
				consist: "CORONA, ДЖИН BOMBAY SAPPHIRE, СИРОП МАРАКУЙЯ, ЛИМОННИЙ ФРЕШ, АПЕЛЬСИН"
      },
			{
        id: 82,
				title: "CORONA JÄGERMEISTER",
        category: "8",
				price: 155,
				img: "http://3bc.com.ua/wp-content/uploads/2017/12/photo_2018-03-21_16-30-04.jpg",
				filters: ['coctails'],
				weight: "500 ml",
				rate: 5,
				consist: "CORONA, JÄGERMEISTER, СИРОП СМОРОДИНА, ЛИМОННИЙ ФРЕШ, ІМБИР"
      },
			{
        id: 83,
				title: "PEACH SPRITZ",
        category: "8",
				price: 129,
				img: "http://3bc.com.ua/wp-content/uploads/2017/12/photo_2018-03-21_16-30-04.jpg",
				filters: ['coctails'],
				weight: "260 ml",
				rate: 2,
				consist: "FRIZZANTE PESCO, РОМ BACARDI CARTA ORO, СИРОП ПЕРСИК, СОДОВА, ЛИМОННИЙ ФРЕШ, АПЕЛЬСИН"
      },
			{
        id: 84,
				title: "SPRITZ FOR HER",
        category: "8",
				price: 129,
				img: "http://3bc.com.ua/wp-content/uploads/2017/12/photo_2018-03-21_16-30-04.jpg",
				filters: ['coctails'],
				weight: "260 ml",
				rate: 2,
				consist: "АПЕРОЛЬ, ДЖИН BOMBAY SAPPHIRE, FRIZZANTE PESCO, СИРОП БУЗИНИ, ЛИМОННИЙ ФРЕШ, СОДОВА"
      },
			{
        id: 85,
				title: "NON ALC WARSTEINER GRAPEFRUIT",
        category: "8",
				price: 155,
				img: "http://3bc.com.ua/wp-content/uploads/2017/12/photo_2018-03-21_16-30-04.jpg",
				filters: ['coctails', 'none-alcohol'],
				weight: "500 ml",
				rate: 2,
				consist: "WARSTEINER БЕЗАЛКОГОЛЬНИЙ, АПЕЛЬСИНОВИЙ СІК, СИРОП РОЖЕВИЙ ГРЕЙПФРУТ, ЛИМОННИЙ ФРЕШ"
      },
			{
        id: 86,
				title: "APEROL SPRITZ",
        category: "8",
				price: 125,
				img: "http://3bc.com.ua/wp-content/uploads/2017/12/photo_2018-03-21_16-30-04.jpg",
				filters: ['coctails'],
				weight: "260 ml",
				rate: 2,
				consist: "APEROL, LAMBRUSCO, СОДОВА, АПЕЛЬСИНОВИЙ ФРЕШ"
      },
			{
        id: 87,
				title: "LAWSON’S COLA",
        category: "8",
				price: 115,
				img: "http://3bc.com.ua/wp-content/uploads/2017/12/photo_2018-03-21_16-30-04.jpg",
				filters: ['coctails'],
				weight: "350 ml",
				rate: 5,
				consist: "WILLIAM LAWSON'S, ПЕПСІ"
      },
			{
        id: 88,
				title: "RAPASKA",
        category: "8",
				price: 119,
				img: "http://3bc.com.ua/wp-content/uploads/2017/12/photo_2018-03-21_16-30-04.jpg",
				filters: ['coctails'],
				weight: "350 ml",
				rate: 5,
				consist: "WILLIAM LAWSON'S, ПЕПСІ"
      },
			{
        id: 89,
				title: "OLDFASION DE MARSEILLE",
        category: "8",
				price: 135,
				img: "http://3bc.com.ua/wp-content/uploads/2017/12/photo_2018-03-21_16-30-04.jpg",
				filters: ['coctails'],
				weight: "200 ml",
				rate: 5,
				consist: "WILLIAM LAWSON'S, СИРОП БУЗИНА, АЛЕЛЬСИНОВИЙ БІТТЕР"
      },
			{
        id: 90,
				title: "BACARDI CUBA LIBRE",
        category: "8",
				price: 115,
				img: "http://3bc.com.ua/wp-content/uploads/2017/12/photo_2018-03-21_16-30-04.jpg",
				filters: ['coctails'],
				weight: "350 ml",
				rate: 5,
				consist: "BACARDI CARTA ORO, ПЕПСІ, ЛАЙМ"
      },
			{
        id: 91,
				title: "MARTINI & TONIC",
        category: "8",
				price: 115,
				img: "http://3bc.com.ua/wp-content/uploads/2017/12/photo_2018-03-21_16-30-04.jpg",
				filters: ['coctails'],
				weight: "350 ml",
				rate: 5,
				consist: "BACARDI CARTA ORO, ПЕПСІ, ЛАЙМ"
      },
			{
        id: 92,
				title: "BACARDI MOJITO",
        category: "8",
				price: 115,
				img: "http://3bc.com.ua/wp-content/uploads/2017/12/photo_2018-03-21_16-30-04.jpg",
				filters: ['coctails'],
				weight: "300 ml",
				rate: 5,
				consist: "BACARDI CARTA BLANCA, ЛАЙМ, М’ЯТА, ТРОСТНИКОВИЙ ЦУКОР, СОДОВА"
      },
			{
        id: 93,
				title: "BLOODY MARY",
        category: "8",
				price: 119,
				img: "http://3bc.com.ua/wp-content/uploads/2017/12/photo_2018-03-21_16-30-04.jpg",
				filters: ['coctails'],
				weight: "370 ml",
				rate: 5,
				consist: "ГОРІЛКА, СОУС ВОРЧЕСТЕР, СОУС ТАБАСКО, СІК ТОМАТНИЙ, ЛИМОННИЙ ФРЕШ, СИРОП СОЛОНА КАРАМЕЛЬ, СИРОП КОПЧЕНИЙ, СЕЛЕРА, ХРІН"
      },
			{
        id: 94,
				title: "LADY KILLER",
        category: "8",
				price: 129,
				img: "http://3bc.com.ua/wp-content/uploads/2017/12/photo_2018-03-21_16-30-04.jpg",
				filters: ['coctails'],
				weight: "350 ml",
				rate: 5,
				consist: "ДЖИН BOMBAY SAPPHIRE, ТРІПЛ СЕК, ПЮРЕ МАРАКУЙЯ, СИРОП МАРАКУЙЯ, АНАНАСОВИЙ СІК"
      },
			{
        id: 95,
				title: "APEROL SOUR",
        category: "8",
				price: 119,
				img: "http://3bc.com.ua/wp-content/uploads/2017/12/photo_2018-03-21_16-30-04.jpg",
				filters: ['coctails'],
				weight: "350 ml",
				rate: 5,
				consist: "APEROL, ЛІКЕР МАНГАЛОР, БІЛОК, ЛИМОННИЙ ФРЕШ, ЦУКРОВИЙ СИРОП"
      },
			{
        id: 96,
				title: "DEWAR’S & TONIC",
        category: "8",
				price: 115,
				img: "http://3bc.com.ua/wp-content/uploads/2017/12/photo_2018-03-21_16-30-04.jpg",
				filters: ['coctails'],
				weight: "330 ml",
				rate: 5,
				consist: "DEWAR'S WHITE LABEL, СИРОП БУЗИНА, ЛИМОН"
      },
			{
        id: 97,
				title: "BARBARIZE",
        category: "8",
				price: 125,
				img: "http://3bc.com.ua/wp-content/uploads/2017/12/photo_2018-03-21_16-30-04.jpg",
				filters: ['coctails'],
				weight: "400 ml",
				rate: 5,
				consist: "ДЖИН BOMBAY SAPPHIRE, MARTINI ROSSO, БАРБАРИСОВИЙ СИРОП, АНАНАСОВИЙ СІК"
      },
			{
        id: 98,
				title: "БІЛА САНГРІЯ",
        category: "8",
				price: 219,
				img: "http://3bc.com.ua/wp-content/uploads/2017/12/photo_2018-03-21_16-30-04.jpg",
				filters: ['coctails', 'big-coctails'],
				weight: "1300 ml",
				rate: 5,
				consist: "ВИНО БІЛЕ СУХЕ, БРЕНДІ, ЦУКРОВИЙ СИРОП, СИРОП МАРАКУЙЯ"
      },
			{
        id: 99,
				title: "БІЛА САНГРІЯ",
        category: "8",
				price: 219,
				img: "http://3bc.com.ua/wp-content/uploads/2017/12/photo_2018-03-21_16-30-04.jpg",
				filters: ['coctails', 'big-coctails'],
				weight: "1300 ml",
				rate: 5,
				consist: "ВИНО БІЛЕ СУХЕ, БРЕНДІ, ЦУКРОВИЙ СИРОП, СИРОП МАРАКУЙЯ"
      },
			{
        id: 100,
				title: "ZANZIBAR",
        category: "8",
				price: 299,
				img: "http://3bc.com.ua/wp-content/uploads/2017/12/photo_2018-03-21_16-30-04.jpg",
				filters: ['coctails', 'big-coctails'],
				weight: "1300 ml",
				rate: 5,
				consist: "АПЕРОЛЬ, ДЖИН BOMBAY SAPPHIRE, ІГРИСТЕ ВИНО БРЮТ, ТОНІК, СИРОП БУЗИНА, ЛИМОННИЙ ФРЕШ, ГРЕЙПФРУТОВІ СЛАЙСИ"
      },
			{
        id: 101,
				title: "ZANZIBAR",
        category: "8",
				price: 89,
				img: "http://3bc.com.ua/wp-content/uploads/2017/12/photo_2018-03-21_16-30-04.jpg",
				filters: ['coctails', 'shot'],
				weight: "50 ml",
				rate: 5,
				consist: "ТЕКІЛА СІЛЬВЕР, ЛИМОННИЙ ФРЕШ, БАНАНОВИЙ ЛІКЕР"
      },
			{
        id: 102,
				title: "ALICE FROM DALLAS",
        category: "8",
				price: 99,
				img: "http://3bc.com.ua/wp-content/uploads/2017/12/photo_2018-03-21_16-30-04.jpg",
				filters: ['coctails', 'shot'],
				weight: "50 ml",
				rate: 5,
				consist: "ТЕКІЛА, ТРІПЛ СЕК, КАВОВИЙ ЛІКЕР"
      },
			{
        id: 103,
				title: "Б52",
        category: "8",
				price: 110,
				img: "http://3bc.com.ua/wp-content/uploads/2017/12/photo_2018-03-21_16-30-04.jpg",
				filters: ['coctails', 'shot'],
				weight: "50 ml",
				rate: 5,
				consist: "БЕЙЛІЗ, ТРІПЛ СЕК, КАВОВИЙ ЛІКЕР"
      },
			{
        id: 104,
				title: "LOVE IS...",
        category: "8",
				price: 110,
				img: "http://3bc.com.ua/wp-content/uploads/2017/12/photo_2018-03-21_16-30-04.jpg",
				filters: ['coctails', 'coctails-set'],
				weight: "5*50 ml",
				rate: 5,
				consist: "ГОРІЛКА, СИРОП БУБЛЬ ГУМ, ЛИМОННИЙ ФРЕШ, АНАНАСОВИЙ СІК"
      },
			{
        id: 105,
				title: "МАЛИНОВИЙ ПАЙ",
        category: "8",
				price: 149,
				img: "http://3bc.com.ua/wp-content/uploads/2017/12/photo_2018-03-21_16-30-04.jpg",
				filters: ['coctails', 'coctails-set'],
				weight: "5*50 ml",
				rate: 5,
				consist: "ГОРІЛКА, МАЛИНОВЕ ПЮРЕ, ВЕРШКИ, ПЕЧИВО"
      },
			{
        id: 106,
				title: "БАРБАРИСКИ",
        category: "8",
				price: 149,
				img: "http://3bc.com.ua/wp-content/uploads/2017/12/photo_2018-03-21_16-30-04.jpg",
				filters: ['coctails', 'coctails-set'],
				weight: "5*50 ml",
				rate: 5,
				consist: "ГОРІЛКА, СИРОП БАРБАРИС, ЛИМОННИЙ ФРЕШ, АНАНАСОВИЙ СІК, СОДОВА"
      },
			{
        id: 107,
				title: "БАРБАРИСКИ",
        category: "8",
				price: 149,
				img: "http://3bc.com.ua/wp-content/uploads/2017/12/photo_2018-03-21_16-30-04.jpg",
				filters: ['coctails', 'coctails-set'],
				weight: "5*50 ml",
				rate: 5,
				consist: "ГОРІЛКА, СИРОП БАРБАРИС, ЛИМОННИЙ ФРЕШ, АНАНАСОВИЙ СІК, СОДОВА"
      },
			{
        id: 108,
				title: "POPCORN СОЛОНА КАРАМЕЛЬ",
        category: "8",
				price: 149,
				img: "http://3bc.com.ua/wp-content/uploads/2017/12/photo_2018-03-21_16-30-04.jpg",
				filters: ['coctails', 'coctails-set'],
				weight: "5*50 ml",
				rate: 5,
				consist: "ГОРІЛКА, СИРОП СОЛОНА КАРАМЕЛЬ, СИРОП ПОПКОРН, ЛИМОННИЙ ФРЕШ"
      },
			{
        id: 109,
				title: "СТИГЛЕ МАНГО",
        category: "8",
				price: 149,
				img: "http://3bc.com.ua/wp-content/uploads/2017/12/photo_2018-03-21_16-30-04.jpg",
				filters: ['coctails', 'coctails-set'],
				weight: "5*50 ml",
				rate: 5,
				consist: "ГОРІЛКА, ЛИМОННИЙ ФРЕШ, ПЮРЕ МАНГО"
			},
			{
				id: 110,
				title: "Трилайн",
				category: "1",
				price: 0,
				img: "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/190322-ham-sandwich-horizontal-1553721016.png",
				filters: ['sandwich'],
				weight: "400g",
				rate: 5,
				consist: "Збери свiй сендвiч",
				options: [
					{
						"type": "radio", 
						"title": "Хлiб", 
						"values": [{
								"1": "багет", 
								"2": "чiабатта",
							}]
					},
					{
						"type": "radio", 
						"title": "Основа", 
						"values": [{
								"1": "бiла", 
								"2": "чорна", 
							}]
					},
					{
						"type": "checkbox", 
						"title": "Намазка", 
						"max" : "2",
						"values": [{
							"1":"плавлений сир1",
							"2":"плавлений сир2",
							"3":"масло",
							"4":"iталiйська",
							"5":"паприка",
						}]
					},
					{
						"type": "checkbox", 
						"title": "Сир", 
						"max": "3",
						"values": [{
							"1": "королiвський",
							"2": "фета",
							"3": "голландський",
							"4": "копчений",
						}]
					},
					{
						"type": "checkbox", 
						"title": "М'ясо/риба", 
						"max": "3",
						"values": [{
							"1": "шинка",
							"2": "балик",
							"3": "курка",
							"4": "говядина",
							"5": "лосось",
							"6": "тунец",
							"7": "фалафель",
						}]
					},
					{
						"type": "checkbox", 
						"title": "Овочi", 
						"max": "3",
						"values": [{
							"1": "морква по корейськи",
							"2": "лук",
							"3": "кукурудза",
							"4": "гриби шампiньйоны",
							"5": "гриби вешанки",
							"6": "огiрок солоний",
							"7": "огiрок свiжий",
							"8": "салат",
							"9": "спаржа",
							"10": "шпинат",
							"11": "помiдор",
							"12": "кроп",
						}]
					},
					{
						"type": "checkbox", 
						"title": "Соус", 
						"max": "3",
						"values": [{
							"1": "фiрмовий",
							"2": "гiрчиця",
							"3": "кетчуп",
							"4": "соус1",
							"5": "соус2",
							"6": "соус3",
						}]
					},
					{
						"type": "checkbox", 
						"title": "Iнше", 
						"max": "3",
						"values": [{
							"1": [{
								"title":"Насiння гарбуза",
								"price": 10,
							}],
							"2": [{
								"title": "Насiння кунжуту",
								"price": 15,
							}],
						}]
					},
				]
			},
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
	getAllLocalStorage(){
		return localStorage;
	}
	getdishes(): Observable<Dish[]> {
		return of(this.dishes);
	}
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
