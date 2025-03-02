import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filteration',
  standalone : true,
})
export class FilterationPipe implements PipeTransform {

  transform(product:any[] , text:string  ): any[] {
    return product.filter((item)=> item.title.includes(text));
  }

}
