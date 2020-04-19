import { AuthService } from './../auth/auth.service';
import { ProfileService } from './profile.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, NavigationEnd } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormArray } from "@angular/forms";
import { DatePipe, JsonPipe } from '@angular/common';
import { UserProfile } from './user-data.model';
import { Router } from "@angular/router";
import { first } from "rxjs/operators";

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css', '../../css/color.css',
    '../../css/responsive.css', '../../css/style.css',
    '../../css/strip.css']
})
export class EditProfileComponent implements OnInit {

userProfile: UserProfile;
editForm: FormGroup;
pipe = new DatePipe('en-US');
profilePic;

constructor( private formBuilder: FormBuilder, private router: Router, private authService:AuthService, private profileService:ProfileService) {

  }
 

get address() {
    return (this.editForm.get('address') as FormArray).controls;
  }

  getControls() {
    return (this.editForm.get('address') as FormArray).controls;
  }

ngOnInit() : void {
   let userId = window.localStorage.getItem("userId");
    //let userId = this.authService.getUserId();
    if (!userId) {
      alert("Inside edit profile: not logged in.")
      this.router.navigate(['login']);
      return;
    }
    this.editForm = this.formBuilder.group({
      _id: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.required],
      gender: ['', Validators.required],
      profilePic:['',Validators.required],
      address:this.formBuilder.array([
          this.formBuilder.group({              
                country:[''],
                state:[''],
                city:[''],
                zipCode:['']
      })
      ])
    });
  
    this.profileService.getUserById(userId)
      .subscribe(data => {
        console.log(data.result);
        delete data.result.followers;
        delete data.result.following;
        delete data.result.userName;
        delete data.result.birthDate;
        delete data.result.password;
        delete data.result.accountStatus;
        delete data.result.isAdmin;
        delete data.result.unhealthyPostNo;
        
        console.log("the id is : "+data.result._id)
        this.editForm.setValue(data.result);
      });
  }

  onUpdate(){
    if(this.editForm.invalid)
     return; 
    console.log("UPDATE STARTED: INDIDE COMPONENT"); 
    this.profileService.updateUser(this.editForm.value)
    .pipe(first())
    .subscribe(    data => {
      if (data.status === 200) {
        console.log('User updated successfully.');
        this.router.navigate(['/']);
      } else {
        console.log(data.message);
      }
    },
    error => {
      console.log(error);
    }); 
  }
  onCancel(){

  }  
}
