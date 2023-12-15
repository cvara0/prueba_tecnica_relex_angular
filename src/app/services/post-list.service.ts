import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostListService {

 
  url:string='https://jsonplaceholder.typicode.com/posts';

  constructor(private http:HttpClient) {  }

  getPostList(): Observable<any> {
    return this.http.get(this.url);
  }


  // Método para eliminar un elemento por su ID
  deletePost(postId: string) {
    fetch(`${this.url}/${postId}`, {
      method: 'DELETE',
    }).then(resp=>alert("Elemento eliminado, codigo de respuesta: "+resp.status)).catch(resp=>alert("Error al eliminar elemento, codigo de respuesta: "+resp.status));

  }
}
