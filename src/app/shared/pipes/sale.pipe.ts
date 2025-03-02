import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sale',
  standalone: true
})
export class SalePipe implements PipeTransform {

  transform(value : string ): String {
    // logic ----> return Data
    return `onSale ${value}`;

  }

}
