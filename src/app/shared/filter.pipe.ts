import { Pipe, PipeTransform } from '@angular/core';
import { Ingredient } from './ingredient.model';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  // value => the ingredient that enter in the pipe
  // filterString => the string wrote in the input field filter
  // propName => the field of the Array that we want to match. (the name)
  transform(value: Ingredient[], filterString: string, propName: string): any {
    if (value.length === 0 || filterString.length === 0) {
      return value;
    }

    const resultArray = [];
    for (const item of value) {
      if (item[propName] === filterString) {
        resultArray.push(item);
      }
    }
    return resultArray;
  }

}
