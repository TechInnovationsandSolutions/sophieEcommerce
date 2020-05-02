import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'firstCharCapitalize'
})
export class FirstCharCapitalizePipe implements PipeTransform {

  transform(value: string, ...args: any[]): any {
    if (value && value.length) {
      const firstChar = value.toUpperCase().charAt(0);
      const capitalizeString = (value.length > 1) ? firstChar + value.substring(1) : firstChar;
      return capitalizeString;
    }
    return value;
  }

}
