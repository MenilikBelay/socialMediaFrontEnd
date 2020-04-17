import { AuthService } from './../auth/auth.service';
import { Observable } from "rxjs";
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiResponse } from '../edit-profile/api.response';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: "root" })
export class PostSearchService {
    router: any;
     query:any; 
  
    getQuery(){
       return this.query;
    }

    setQuery(query){
       this.query = query;
    }

    constructor(private http: HttpClient, private authService:AuthService ) { }
    baseUrl: string = 'http://localhost:3000/users/get-posts/search';  

    getPostsWithQuery(query,id):Observable<ApiResponse>{

       const queryParam =  `?filter=${query}&id=${id}`;
      // const id = this.authService.getUserId();
         console.log("THE SEARCH QUERY IS: "+this.baseUrl +queryParam); 
       return this.http.get (this.baseUrl+queryParam).pipe(map((response: any) => response));
        
      }
}
