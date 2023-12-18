import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Post } from 'src/app/models/post.models';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html'
})
export class PostListComponent implements OnInit {

  p             :number = 1;
  postList      :Post[] = []; 
  page          :number=0;
  valueToSearch :string='';
  postToEdit!: Post;
  
  titleLength:number=0;
  bodyLength:number=0;

  editPostFormGroup! :FormGroup;

  constructor(private postService:PostService,private formBuilder:FormBuilder){
   
  }


  async ngOnInit(): Promise<void> {
    this.postList=await this.postService.getPostList();
    //console.log(this.postList);
  }
//
  refreshLength(){
    this.titleLength=this.editPostFormGroup.get('postToEditTitle')?.value?.length ?? 0;
    this.bodyLength=this.editPostFormGroup.get('postToEditBody')?.value?.length ?? 0;
  }
//
  searchByTitle(valueToSearch:string){
    this.page=0;
    this.valueToSearch=valueToSearch;
  }
//
  deletePost(postToDelete:Post){
      if (window.confirm("'Eliminar' post "+postToDelete.title+" ?"))
        this.postService.deletePost(postToDelete.id); 
  }
  createEditPostFormGroup(post:Post){
    this.postToEdit=post;
    this.titleLength=post.title.length;
    this.bodyLength=post.body.length;
    this.editPostFormGroup=this.formBuilder.group({
      postToEditTitle   : [this.postToEdit.title,[Validators.required,Validators.maxLength(80),Validators.pattern(/[\S]/)]],//primera posicion valor por defecto, segunda, validadores sincronos, tercera validadores asincronos
      postToEditBody    : [this.postToEdit.body,[Validators.required,Validators.maxLength(500),Validators.pattern(/[\S]/)]]
    });
  }

  get invalidPostToEditTitle(){
    return this.editPostFormGroup.get('postToEditTitle')?.invalid;
  }

  get invalidPostToEditBody(){
    return this.editPostFormGroup.get('postToEditBody')?.invalid;
  }


  saveEditPost(){
    let post:Post=new Post(
      this.postToEdit.userId,
      this.postToEdit.id,
      this.editPostFormGroup.get('postToEditTitle')?.value,
      this.editPostFormGroup.get('postToEditBody')?.value
    );
    
    this.postService.updatePost(post);
  }

}
