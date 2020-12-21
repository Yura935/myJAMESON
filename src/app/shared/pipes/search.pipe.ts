import { Pipe, PipeTransform } from '@angular/core';
import { IDrink } from '../interfaces/drink.interface';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(value: Array<IDrink>, field: string): Array<IDrink> {
    if (!value) {
      return value
    }
    if (!field) {
      return value
    }
    return value.filter(drink => drink.name.includes(field));
  }
}
