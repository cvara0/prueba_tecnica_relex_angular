import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Post } from '../models/post.models';

@Injectable({
  providedIn: 'root'
})
export class PostService {

 
  url       :string='https://jsonplaceholder.typicode.com/posts';
  postList  :Post[]=[];
  constructor(private http:HttpClient) {  }

  getPostList(): Post[] {
    this.http.get(this.url).subscribe((postList:any)=>{
      postList.map((auxPost:any)=>{
          let post={
            userId: auxPost.userId,
            id    : auxPost.id,
            title : auxPost.title,
            body  : auxPost.body
          }
          this.postList.push(post);
      })
    });
    return this.postList;
  }

  //Editar post seguir aca
  updatePost(post: Post){
    fetch(`${this.url}/${post.id}`, {
      method: 'PUT',
      body: JSON.stringify({
          id: post.id,
          title: post.title,
          body: post.body,
          userId: post.userId,
        }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
        },
    })
  .then((response) => response.json())
  .then((json) => alert("Elemento 'editado' con éxito: "+json))
  .catch(response=>alert("Error al 'editar' elemento, codigo de respuesta: "+response.status));
  }




  // Eliminar elemento por su ID
  deletePost(postId: string) {
    fetch(`${this.url}/${postId}`, {
      method: 'DELETE',
    }).then(response=>response.status===200?alert("Elemento 'eliminado', codigo de respuesta: "+response.status):alert("Error al eliminar elemento, codigo de respuesta: "+response.status))
      .catch(response=>alert("Error al 'eliminar' elemento, codigo de respuesta: "+response.status));
  }

  //seguir con sanitizer
}