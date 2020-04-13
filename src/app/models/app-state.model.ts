import { Dish } from './Dishes';

export interface AppState {
	readonly shopping: Array<Dish>
}