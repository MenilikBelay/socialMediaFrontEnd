import { Observable } from "rxjs/index";
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: "root" })
export class ConfirmationService {


    constructor(private http: HttpClient) { }
    baseUrl: string = 'http://localhost:3000/users/';

      confirmEmail(token) {

        console.log( "INSIDE SERVICE: ", this.baseUrl +'confirmation/'+token); 
        const baseUrl2  = this.baseUrl +'confirmation/'+token;
        console.log( "INSIDE SERVICE AFTER CALL: ", this.baseUrl +'confirmation/'+token); 

        return this.http.get(baseUrl2);

      }
}
