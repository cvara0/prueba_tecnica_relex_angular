import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchByTitle'
})
export class SearchByTitlePipe implements PipeTransform {

  transform(value: any[], search:string=''): any[] {

    const filteredValues=value.filter(i=>
      {
          return i.title?i.title.includes(search):"";
      });

    return filteredValues;
  }

}
