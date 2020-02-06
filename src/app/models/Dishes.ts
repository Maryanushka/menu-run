export interface Dish {
  id: any;
  title: string;
  category: string;
  price: number;
  img: string;
  calories: string;
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

//  use ? if you want to display propertie optionally 
