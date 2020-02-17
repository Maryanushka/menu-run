import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
	name: 'filter',
	pure: false
})

export class FilterPipe implements PipeTransform {
	transform(items: any[], args: any): any {
		
		console.log(args.item);
		if(!args.item){
			return items;
		}
		else{
			return items.filter(item => item.filters.some(el =>  el === args.item.value));
		}
		
		
		// return items.filter(item => item.filters.some(el => el.indexOf(args.value) !== -1));
		
	}
}