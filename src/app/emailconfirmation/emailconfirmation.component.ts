import { ConfirmationService } from './confirmation.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';

import { of } from 'rxjs';
import { map, mapTo, filter, switchMap, tap } from 'rxjs/operators';

@Component({
  selector: 'app-emailconfirmation',
  templateUrl: './emailconfirmation.component.html',
  styleUrls: ['./emailconfirmation.component.css','../../css/color.css',
  '../../css/responsive.css', '../../css/style.css',
  '../../css/strip.css']
})
export class EmailConfirmationComponent implements OnInit {
 
  token;

  onLoginClick(){
      this.router.navigate(['login']);
  }

  constructor(private route: ActivatedRoute, private router: Router, private confirmationService:ConfirmationService) {  }


  ngOnInit() {

    this.route.paramMap.subscribe(params =>  { let token = params.get('token');
    console.log(token);
    this.token = token;
  });
   this.confirmationService.confirmEmail(this.token)
    .subscribe(response =>  console.log(response));
  ;   

  } 

}
