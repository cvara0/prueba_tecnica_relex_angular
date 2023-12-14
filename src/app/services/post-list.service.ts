import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PostListService {

 
  url:string='https://jsonplaceholder.typicode.com/posts';

  constructor(private http:HttpClient) {  }

  getPostList(){
    return this.http.get(this.url);
  }
}
