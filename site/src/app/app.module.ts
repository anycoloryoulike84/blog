import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';



import { AppComponent } from './app.component';
import { BlogComponent } from './blog/blog/blog.component';
import { PostDetailComponent } from './blog/post-detail/post-detail.component';
import { HomeComponent } from './home/home.component';
import { PostFormComponent } from './blog/post-form/post-form.component';
import { LoginComponent } from './user/login/login.component';
import { AuthService } from './user/auth.service';
import { UserService } from './user/user.service';
import { ProfileComponent } from './user/profile/profile.component';
import { RegisterComponent } from './user/register/register.component';
import { UserPostsComponent } from './user/user-posts/user-posts.component';
import { EditorComponent } from './helpers/editor/editor.component';


const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'blog', component: BlogComponent },
  { path: 'blog/:id', component: PostDetailComponent },
  { path: 'blog/:id/edit', component: PostFormComponent },
  { path: 'blog-add', component: PostFormComponent },
  { path: 'user/login', component: LoginComponent },
  { path: 'user/my-account', component: ProfileComponent },
  { path: 'user/register', component: RegisterComponent },
  { path: 'user/:id/blog', component: UserPostsComponent }
  
];


@NgModule({
  declarations: [
    AppComponent,
    BlogComponent,
    HomeComponent,
    PostDetailComponent,
    PostFormComponent,
    LoginComponent,
    ProfileComponent,
    RegisterComponent,
    UserPostsComponent,
    EditorComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [AuthService, UserService],
  bootstrap: [AppComponent]
})
export class AppModule { 

}




