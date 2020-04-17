import { PostService } from './../services/post.service';
import { PostSearchComponent } from './../post-search/post-search.component';
import { ApiResponse } from './../edit-profile/api.response';
import { PostSearchService } from './../post-search/post-search.service';
import { AuthService } from './../auth/auth.service';
import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { Subscription } from "rxjs";
import { FormControl } from '@angular/forms';
import { Router, NavigationEnd } from "@angular/router";

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.css', '../../css/color.css',
    '../../css/responsive.css', '../../css/style.css',
    '../../css/strip.css']
})
export class TopbarComponent implements OnInit, OnDestroy {

  userIsAuthenticated = false;
  private authListenerSubs: Subscription;
  postsQuery = new FormControl("");
  userId = window.localStorage.getItem("userId");
  @Output() searchPostEvent = new EventEmitter();



  constructor(private router: Router, private authService:AuthService, 
              private postSearchService:PostSearchService,
              ) {            }

  onLogout(event){
    event.preventDefault(); // Prevents browser following the link
    this.authService.logout();
}

onEditProfile(event){
  event.preventDefault(); // Prevents browser following the link
  this.router.navigate(["/home/edit-profile"]);
}

onHomeClick(event){
  event.preventDefault(); // Prevents browser following the link
  this.router.navigate(["/home"]);
}

onSearchPosts():void{
console.log("TOP BAR USER INPUT" +this.postsQuery.value)
    //this.searchPostEvent.emit(this.postsQuery.value);
    this.postSearchService.setQuery(this.postsQuery.value);
    this.router.navigate(["/home/post-search"]);

}

ngOnInit(): void {

  this.userIsAuthenticated = this.authService.getIsAuth();
  this.authListenerSubs = this.authService
    .getAuthStatusListener()
    .subscribe(isAuthenticated => {
      this.userIsAuthenticated = isAuthenticated;
    });
}

ngOnDestroy() {
 
}

}
