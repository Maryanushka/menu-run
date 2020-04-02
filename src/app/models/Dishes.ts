export interface Dish {
  id: any;
  title: string;
  category: string;
  price: number;
  img: string;
  calories?: number;
  filters: String[];
  weight: string;
  rate: number;
  description?: string;
  bonusOption?: string;
  consist?: string;
	options?: any;
	classes?: string;
  // hase?: boolean,
  // registered?: any,
  // hide?: boolean
}

export interface BasketType{
  basketId: any;
  id?: any;
  title: string;
  price: number;
  count: number; 
	img: string;
	classes?: string;
}

//  use ? if you want to display property optionally 
