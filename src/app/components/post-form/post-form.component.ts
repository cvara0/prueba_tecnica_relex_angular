import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Post } from 'src/app/models/post.models';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html'
})
export class PostFormComponent implements OnInit {

  
  userIdList        :number[] = []; 
 
  postToAdd!        :Post;
  
  titleLength       :number=0;
  bodyLength        :number=0;

  addPostFormGroup! :FormGroup;
  inputTitle        :string='';

  inOutStyle      :string='';

  constructor(private postService:PostService,private formBuilder:FormBuilder){
    
  }


  async ngOnInit(): Promise<void> {
    await this.postService.getPostList().filter(i=>this.userIdList.push(i.userId));
    
    this.addPostFormGroup=this.formBuilder.group({
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
  get invalidPostToAddTitle(){
    return this.addPostFormGroup.get('postToAddTitle')?.invalid;
  }

  get invalidPostToAddBody(){
    return this.addPostFormGroup.get('postToAddBody')?.invalid;
  }

  saveAddPost(){
    let post:Post=new Post(
      this.addPostFormGroup.get('postToAddUserId')?.value,
      this.postToAdd.id,
      this.addPostFormGroup.get('postToAddTitle')?.value,
      this.addPostFormGroup.get('postToAddBody')?.value
    );
    
    this.postService.addPost(post);
  }
}
