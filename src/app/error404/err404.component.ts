import { Component } from '@angular/core';
import { Router } from "@angular/router";

@Component({

    templateUrl: './err404.component.html',
    styleUrls: [ '../../css/color.css',
    '../../css/responsive.css', '../../css/style.css',
    '../../css/strip.css']
})
export class Error404Component  {



    constructor(private router: Router){}
    onLoginClick(){
        this.router.navigate(['login']);
    }
 
}
