export interface Dish {
  id: any;
  title: string;
  category: string;
  price: number;
  img: string;
  calories?: number;
  filters: String[];
  weight: number;
  rate: number;
  description?: string;
  bonusOption?: string;
  consist?: string;
  options?: [object];
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
}

//  use ? if you want to display property optionally 
