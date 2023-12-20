import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchByTitle'
})
export class SearchByTitlePipe implements PipeTransform {

  transform(postList: any[], titleTosearch:string=''): any[] {

    const filteredPostList=postList.filter(i=>
      {
          return i.title?i.title.includes(titleTosearch):"";
      });

    return filteredPostList;
  }

}
