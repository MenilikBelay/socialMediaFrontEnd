import { ApiResponse } from './../edit-profile/api.response';
import { PostSearchService } from './post-search.service';
import { ProfileService } from './../edit-profile/profile.service';
import { AuthService } from './../auth/auth.service';
import { Component, OnInit, OnDestroy, Input, Inject, Injectable } from '@angular/core';
import { Subscription } from "rxjs";
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';


@Component({
  selector: 'app-post-search',
  templateUrl: './post-search.component.html',
  styleUrls: ['./post-search.component.css', '../../css/color.css',
    '../../css/responsive.css', '../../css/style.css',
    '../../css/strip.css']
})
export class PostSearchComponent implements OnInit {   


  userIsAuthenticated = false;
  private authListenerSubs: Subscription;
  posts: Array<ApiResponse>;
  userId = window.localStorage.getItem("userId");
  @Input() event:Event;
  postsQuery:any;
  refreshSubscription: any;

constructor(private router: Router, private authService:AuthService, private postSearchService:PostSearchService) { }

ngOnInit(): void {

  this.userIsAuthenticated = this.authService.getIsAuth();
  this.authListenerSubs = this.authService
    .getAuthStatusListener()
    .subscribe(isAuthenticated => {
      this.userIsAuthenticated = isAuthenticated;
    });

    this.postsQuery = this.postSearchService.getQuery();
    this.searchPosts(this.postsQuery);
    
}
searchPosts(postsQuery) {
    console.log("INSIDE POST SEARCH, QUERY WORD :"+ postsQuery);
    this.postsQuery = this.postSearchService.setQuery(postsQuery);

    this.postSearchService.getPostsWithQuery(this.userId)
        .subscribe(data => {
          console.log(data.result)
            this.posts = data.result;
        });
    ;
}

ngOnDestroy() {
  this.authListenerSubs.unsubscribe();
 }

}
