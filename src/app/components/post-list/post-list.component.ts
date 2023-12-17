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
  isLoading     :boolean=false;
 
  postToEdit!: Post;
  
  editPostForm! :FormGroup;

  constructor(private postService:PostService,private formBuilder:FormBuilder){
    
  }


  async ngOnInit(): Promise<void> {
    this.postList=await this.postService.getPostList();
    //console.log(this.postList);
  }
//


setPostToEdit(post:Post){
  this.postToEdit=post;
}
//
  searchByTitle(valueToSearch:string){
    this.page=0;
    this.valueToSearch=valueToSearch;
  }
//
  deletePost(postToDelete:Post){
    this.isLoading=true;
      if (window.confirm("'Eliminar' post "+postToDelete.title+" ?")){
        this.postService.deletePost(postToDelete.id); 
    }else
      this.isLoading=false;
    }
//
createEditPostForm(post:Post){
  this.postToEdit=post;
  this.editPostForm=this.formBuilder.group({
    postToEditTitle   : [this.postToEdit.title,[Validators.required,Validators.minLength(5),Validators.maxLength(80)]],//primera posicion valor por defecto, segunda, validadores sincronos, tercera validadores asincronos
    postToEditBody    : [this.postToEdit.body,[Validators.required,Validators.minLength(5),Validators.maxLength(300)]]
  });
}

get invalidPostToEditTitle(){
  return this.editPostForm.get('postToEditTitle')?.invalid;
}

get invalidPostToEditBody(){
  return this.editPostForm.get('postToEditBody')?.invalid;
}

saveEditPost(){
  let post:Post=new Post(
    this.editPostForm.get('postToEditUserId')?.value,
    this.postToEdit.id,
    this.editPostForm.get('postToEditTitle')?.value,
    this.editPostForm.get('postToEditBody')?.value
  );
  
  this.postService.updatePost(post);
}

}
