import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/models/post.models';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {

  p            :number = 1;
  postList   :Post[] = []; 
  page         :number=0;
  searchValue  :string='';
  isLoading    :boolean=false;

  constructor(private postService:PostService){

  }

  ngOnInit(): void {
    this.postService.getPostList().subscribe((postList:any)=>{
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
  
    //console.log(this.collection);
  }

  searchByTitle(searchValue:string){
    this.page=0;
    this.searchValue=searchValue;
  }

  deletePost(postToDelete:Post){
    this.isLoading=true;
      if (window.confirm("'Eliminar' post "+postToDelete.title+" ?")){
        this.postService.deletePost(postToDelete.id); 
    }else
      this.isLoading=false;
    }

}
