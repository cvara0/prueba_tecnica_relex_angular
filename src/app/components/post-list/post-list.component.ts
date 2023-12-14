import { Component, OnInit } from '@angular/core';
import { PostList } from 'src/app/models/post-list.models';
import { PostListService } from 'src/app/services/post-list.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit {

  p: number = 1;
  collection: PostList[] = []; 
  
  constructor(private postListService:PostListService){

  }

  ngOnInit(): void {
    this.postListService.getPostList().subscribe((postList:any)=>{
      postList.map((auxPost:any)=>{
          let post={
            userId: auxPost.userId,
            id    : auxPost.id,
            title : auxPost.title,
            body  : auxPost.body
          }
          this.collection.push(post);
      })
    });
  
    //console.log(this.collection);
  }

}
