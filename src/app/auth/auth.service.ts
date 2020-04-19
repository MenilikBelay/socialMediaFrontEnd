import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { Subject } from "rxjs";

import { AuthData } from "./auth-data.model";

@Injectable({ providedIn: "root" })
export class AuthService {
  private isAuthenticated = false;
  private token: string;
  private userId: string;
  private isAdmin:boolean;
  private tokenTimer: any;
  private authStatusListener = new Subject<boolean>();
  private baseUrl = "http://localhost:3000/";

  constructor(private http: HttpClient, private router: Router) {}

  getToken() {
    return this.token;
  }
  getUserId() {
    return this.userId;
  }
  getIsAuth() {
    return this.isAuthenticated;
  }
  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  // SIGNUP
  createUser(authData: AuthData) {
    // console.log(authData);
    this.http
      .post(this.baseUrl + 'users/add-user', authData, { headers: { skip: 'true' } })
      .subscribe(response => {
        //console.log(response);
        this.router.navigate(['/home']);
      });
  }
  // this.http.get(url, {headers:{skip:"true"});

  // LOGIN
  login(userName: string, password: string) {
    const authData = { userName: userName, password: password };
    this.http
      .post<{ token: string; expiresIn: number; userId: string; isAdmin:boolean }>(
        this.baseUrl + "login",
        authData,
        { headers: { skip: "true" } }
      )
      .subscribe((response) => {
        const token = response.token;
        const userId = response.userId;
        const isAdmin = response.isAdmin;
        this.token = token;
        if (token) {
          const expiresInDuration = response.expiresIn;
          this.setAuthTimer(expiresInDuration);
          this.isAuthenticated = true;
          this.userId = response.userId;
          this.isAdmin = response.isAdmin;

          this.authStatusListener.next(true);
          const now = new Date();
          const expirationDate = new Date(
            now.getTime() + expiresInDuration * 1000
          );
          // console.log(expirationDate);
          
          this.saveAuthData(token, expirationDate,userId,isAdmin); 

          if(response.isAdmin)
            this.router.navigate(["/admin"]);
          else
            this.router.navigate(["/home"]);
        }
      });
  }

  autoAuthUser() {
    const authInformation = this.getAuthData();
    if (!authInformation) {
      return;
    }
    const now = new Date();
    const expiresIn = authInformation.expirationDate.getTime() - now.getTime();
    if (expiresIn > 0) {
      this.token = authInformation.token;
      this.userId = authInformation.userId;
      this.isAuthenticated = true;
      this.setAuthTimer(expiresIn / 1000);
      this.authStatusListener.next(true); // user is  authenticated  so for future requests let them know it
    }
  }

  logout() {
    this.token = null;
    this.isAuthenticated = false;
    this.authStatusListener.next(false); // user is not authenticated anymore so for future requests let them know it
    this.userId = null;
    clearTimeout(this.tokenTimer);
    this.clearAuthData();
    this.router.navigate(["/login"]);
  }

  private setAuthTimer(duration: number) {
   // console.log("Setting timer: " + duration);
    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, duration * 1000); 
  }

  //STORE THE TOKEN TO LOCAL STORAGE
  private saveAuthData(token: string, expirationDate: Date, userId,isAdmin) {
    localStorage.setItem("token", token);
    localStorage.setItem("expiration", expirationDate.toISOString());
    localStorage.setItem("userId", userId);
    localStorage.setItem("isAdmin", isAdmin);
  }

  private clearAuthData() {
    localStorage.removeItem("token");
    localStorage.removeItem("expiration");
    localStorage.removeItem("userId");
    localStorage.removeItem("isAdmin");
  }

  private getAuthData() {
    const token = localStorage.getItem("token");
    const expirationDate = localStorage.getItem("expiration");
    const userId = localStorage.getItem("userId");
    const isAdmin = localStorage.getItem("isAdmin");

    if (!token || !expirationDate || !userId ) {
      return;
    }
    return {
      token: token,
      expirationDate: new Date(expirationDate),
      userId: userId,
      isAdmin: isAdmin,
    };
  }

  // FORGOT PASSWORD
  OnForgotPassword(email: string) {
    const authData = { email };
    this.http
      .post<{ email: string }>(this.baseUrl + "users/forgot-password", authData)
      .subscribe((response) => {
        const email = response.email;
        // console.log(response.token);

        if (email) {
          // TODO: sent reset email
          this.router.navigate(["/"]);
        }
      });
  }
}
