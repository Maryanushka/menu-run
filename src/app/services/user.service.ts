import { Injectable } from '@angular/core';
import { Dish } from '../models/Dishes';
// import { Category } from '../models/Category';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Disheservice {
	dishes: Dish[];
	// category: Category[];
	data: Observable<any>;
  constructor() { 
		const category = [
      {
        "2": "Азиатский фьюжн",
        "3": "Алкоголь",
        "4": "Американская",
Бургеры	
Вегетарианская/веганская	
Выпечка	
Вьетнамская	
Грузинская	
Десерты: другие	
Европейская: другая	
Завтраки	
Закуски	
Закуски для бара/паба	
Индийская	
Индонезийская	
Испанская	
Итальянская	
Карибская	
Китайская: другая	
Китайская: кантонская	
Китайская: лапша и пельмени	
Китайская: сычуаньская	
Китайская: тайваньская	
Китайская: хого	
Комфортная еда	
Корейская	
Кофе и чай	
Кошерная	
Креольская	
Куриные крылышки	
Курица	
Латиноамериканская: другая	
Малайзийская	
Мексиканская	
Морепродукты	
Мороженое и замороженный йогурт	
Немецкая	
Пицца	
Русская	
Салаты/сэндвичи	
'Современная австралийская'	
'Соки и смузи'	
'Соул-фуд'	
'Средиземноморская'	
'Стейк-хаус'	
'Тайская'	
'Фиш-энд-чипс'	
'Французская'	
'Халяльная'
'Южная'
'Японская: другая'	
'Японская: рамен'	
'Японская: суши'	
'Прочее	'
      },
      {}
    ];

		this.dishes = [
      {
        id: "1",
        title: "АТЛАНТА",
        category: "",
        email: "jessica.jones@gmail.com",
        isActive: true,
        registered: new Date(),
        hide: true
      },
      {
        name: "Star lord",
        hon: "Damn, you are cool!",
        email: "star.lord@gmail.com",
        isActive: true,
        registered: new Date(),
        hide: true
      },
      {
        name: "Miles Morales",
        hon: "Hey there!",
        email: "miles.morales@gmail.com",
        isActive: false,
        registered: new Date(),
        hide: true
      }
    ];
	}

	getdishes(): Observable<Dish[]> {
		return of(this.dishes);
	}

	addUser(dish: Dish){
		this.dishes.unshift(dish);
	}
}
