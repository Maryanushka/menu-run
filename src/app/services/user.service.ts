import { Injectable } from '@angular/core';
import { User } from '../models/User';
// import { Category } from '../models/Category';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
	users: User[];
	// category: Category[];
	data: Observable<any>;
  constructor() { 

		this.users = [
      {
				name: "Star lord",
				hon: "Damn, you are cool!",
				email: "star.lord@gmail.com",
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

	getUsers(): Observable<User[]> {
		return of(this.users);
	}

	addUser(users: User){
		this.users.unshift(users);
	}
}
