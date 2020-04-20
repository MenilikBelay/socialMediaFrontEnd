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

      // _id
      // firstName;
      // lastName;
      // email;
      // gender; 
      // profilePic;
      // user;
      //address;

constructor( private formBuilder: FormBuilder, private router: Router, private authService:AuthService, private profileService:ProfileService) {  }
 

  get address() {
    return (this.editForm.get('address') as FormArray).controls;
  }

  // set address(address) {
  //  // this.address = address;
  // }


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
        delete data.result.followers;
        delete data.result.following;
        delete data.result.userName;
        delete data.result.birthDate;
        delete data.result.password;
        delete data.result.accountStatus;
        delete data.result.isAdmin;
        delete data.result.unhealthyPostNo;
        delete data.result.isConfirmed;
        console.log("insdie edit profile : "+data.result);

      //    this.user = {
      //   _id : data.result._id,
      //   firstName : data.result.firstName,
      //   lastName :data.result.lastName,
      //   email:data.result.email,
      //   gender:data.result.gender, 
      //   profilePic:data.result.address,
      //   address:data.result.address,
      // }
        
        console.log("the account id is : "+data.result._id);
        this.editForm.setValue(data.result)

        // this.editForm.setValue({
        //   //_id:this._id,
        //   firstName:this.firstName,
        //   lastName:this.lastName,
        //   email:this.email,
        //   gender:this.gender,
        //   profilePic:this.profilePic,
        //   address : this.address

        // });
      });
  }

  onUpdate(){
    console.log("UPDATE STARTED: INDIDE COMPONENT"); 

    // if(this.editForm.invalid)
    //  return; 
    console.log("UPDATE STARTED: Form values"); 
    console.log(this.editForm.value);
    this.profileService.updateUser(this.editForm.value)
    .pipe(first())
    .subscribe(    data => {
      if (data.status === 200) {
        console.log('User updated successfully.');
        this.router.navigate(['/home']);
      } else {
        console.log(data.message);
      }
    },
    error => {
      console.log(error);
    }); 
  }
  onCancel(){
    this.router.navigate(["/home"]);
  }  
}
