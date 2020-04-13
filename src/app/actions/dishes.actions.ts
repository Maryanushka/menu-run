import { Action } from '@ngrx/store';
import { Dish } from '../models/Dishes';

export enum DishActionTypes {
	ADD_ITEM = '[SHOPPING] Add Item',
}

export class AddItemAction implements Action {
	readonly type = DishActionTypes.ADD_ITEM

	constructor(public payload: Dish) { }
}

export type DishAction = AddItemAction