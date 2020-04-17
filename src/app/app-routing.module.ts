import { Error404Component } from './error404/err404.component';
import { PostSearchComponent } from './post-search/post-search.component';
import { CenterlayoutComponent } from './centerlayout/centerlayout.component';
import { CommentsComponent } from './comments/comments.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { AuthGuard } from './auth/auth.guard';
import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './auth/login_singup/login.component';
import { HomeComponent } from './home/home.component';

const routes:Routes = [
  {  path: 'home', component: HomeComponent,
                children:[
                 {path: '',              component: CenterlayoutComponent},
                 {path: 'edit-profile' , component: EditProfileComponent},
                 {path: 'post-search' , component: PostSearchComponent},
                ]

                                               },// canActivate:[AuthGuard]}, //this route is protected
  {  path: 'login' , component: LoginComponent},
  {  path: 'signup' , component: LoginComponent},
  {  path: '',  redirectTo: '/login' ,pathMatch: 'full'},
  {  path: '**' , component: Error404Component}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]

})

export class AppRoutingModule{}
