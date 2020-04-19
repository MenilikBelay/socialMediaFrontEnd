import { AuthService } from '../../auth/auth.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from "rxjs";
import { Router } from '@angular/router';

@Component({
  selector: 'app-admintasklist',
  templateUrl: './admintasklist.component.html',
  styleUrls: ['./admintasklist.component.css', '../../../css/color.css',
    '../../../css/responsive.css', '../../../css/style.css',
    '../../../css/strip.css']
})
export class AdminTaskListComponent implements OnInit {
  userIsAuthenticated = false;
  private authListenerSubs: Subscription;

  constructor(private authService:AuthService, private router: Router) { }


  onLogout(event){
    event.preventDefault(); // Prevents browser following the link
    this.authService.logout();
}

onLReviewActivation(event){
  event.preventDefault(); // Prevents browser following the link
  this.router.navigate(["/admin"]);
}
onAddUnhealtyWord(event){
  event.preventDefault(); // Prevents browser following the link
  this.router.navigate(["/admin/add-word"]);
}
onDeleteUnhealthyWord(event){
  event.preventDefault(); // Prevents browser following the link
  this.router.navigate(["/admin/delete-word"]);
}
onCreateAdvert(event){
  event.preventDefault(); // Prevents browser following the link
  this.router.navigate(["/admin"]);
}
onPushAdvert(event){
  event.preventDefault(); // Prevents browser following the link
  this.router.navigate(["/admin"]);
}
onCreateAddCriteria(event){
  event.preventDefault(); // Prevents browser following the link
  this.router.navigate(["/admin"]);
}
onReviewEnablePost(event){
  event.preventDefault(); // Prevents browser following the link
  this.router.navigate(["/admin"]);
}
onHomeClick(event){

  event.preventDefault(); // Prevents browser following the link
  this.router.navigate(["/admin"]);
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
    this.authListenerSubs.unsubscribe();
  }

}
