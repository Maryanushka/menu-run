import { Action } from '@ngrx/store';
import { Dish } from '../models/Dishes';

export enum DishActionTypes {
	DELETE_FILTER_ITEM = '[SHOPPING] Delete , use initial state',
	FILTER_ONE_ITEM = '[SHOPPING] Filter 1 Item',
	FILTER_MULTIPLE_ITEM = '[SHOPPING] Add Filter to array',
	DELETE_FILTER_MULTIPLE_ITEM = '[SHOPPING] Delete Filter from array',
}

export class DeleteFilterOneItem implements Action {
	readonly type = DishActionTypes.DELETE_FILTER_ITEM
}

export class FilterOneItem implements Action {
	readonly type = DishActionTypes.FILTER_ONE_ITEM
	constructor(public payload: String) { }
}

export class FilterMultipleItems implements Action {
	readonly type = DishActionTypes.FILTER_MULTIPLE_ITEM
	constructor(public payload: String) { }
}

export type DishAction = DeleteFilterOneItem | FilterOneItem | FilterMultipleItems;