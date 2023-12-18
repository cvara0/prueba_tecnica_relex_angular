import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Post } from 'src/app/models/post.models';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html'
})
export class PostFormComponent implements OnInit {

  
  postToAdd!        :Post;
  userIdList        :number[]=[];
  titleLength       :number=0;
  bodyLength        :number=0;

  addPostFormGroup! :FormGroup;


  constructor(private postService:PostService,private formBuilder:FormBuilder){
    
  }


  ngOnInit() {
    const listaDePosts = this.postService.getPostList();
    const userIdSet = new Set(listaDePosts.map(post => post.userId));
    this.userIdList= Array.from(userIdSet);
   // this.postService.getPostList().map(i=>this.userIdList.push(i.userId));
    this.addPostFormGroup=this.formBuilder.group({
      postToAddUserId  : ['',[Validators.required]],
      postToAddTitle   : ['',[Validators.required,Validators.maxLength(80),Validators.pattern(/[\S]/)]],//primera posicion valor por defecto, segunda, validadores sincronos, tercera validadores asincronos
      postToAddBody    : ['',[Validators.required,Validators.maxLength(500),Validators.pattern(/[\S]/)]]
    });
    //console.log(this.postList);
  }


//
  refreshLength(){
    this.titleLength=this.addPostFormGroup.get('postToAddTitle')?.value?.length ?? 0;
    this.bodyLength=this.addPostFormGroup.get('postToAddBody')?.value?.length ?? 0;
  }
//
get invalidPostToAddUserId(){
  return !this.addPostFormGroup.get('postToAddUserId')?.dirty;
}

  get invalidPostToAddTitle(){
    return this.addPostFormGroup.get('postToAddTitle')?.invalid;
  }

  get invalidPostToAddBody(){
    return this.addPostFormGroup.get('postToAddBody')?.invalid;
  }

  saveAddPost(){
    let post:Post=new Post(
      this.addPostFormGroup.get('postToAddUserId')?.value,
      '',
      this.addPostFormGroup.get('postToAddTitle')?.value,
      this.addPostFormGroup.get('postToAddBody')?.value
    );
    
    this.postService.addPost(post);
  }
}
