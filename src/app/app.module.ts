import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {NgxPaginationModule} from 'ngx-pagination';
import { AppComponent } from './app.component';
import { PostListComponent } from './components/post-list/post-list.component';
import { PostFormComponent } from './components/post-form/post-form.component';
import { HomeComponent } from './components/home/home.component';
import { APP_ROUTING } from './app.routes';
import { HttpClientModule } from '@angular/common/http';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SearchByTitlePipe } from './pipes/search-by-title.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FooterComponent } from './components/footer/footer.component';
import { SearchByKeywordPipe } from './pipes/search-by-keyword.pipe';

@NgModule({
  declarations: [
    AppComponent,
    PostListComponent,
    PostFormComponent,
    HomeComponent,
    NavbarComponent,
    SearchByTitlePipe,
    FooterComponent,
    SearchByKeywordPipe
  ],
  imports: [
    BrowserModule,
    APP_ROUTING,
    NgxPaginationModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
