import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import {
  unHealthyWordsURL,
  deleteUnhealthywordsURL,
  createUnhealthyWord,
} from "../../shared/urls";
import { Observable, throwError } from "rxjs";
import { catchError, retry } from "rxjs/operators";
import { AuthService } from "src/app/auth/auth.service";

@Injectable({
  providedIn: "root",
})
export class UnhealthyService {
  private readonly NUMBER_OF_RETRY = 3;

  constructor(private http: HttpClient, private authService: AuthService) {}

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error("An error occurred:", error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` + `body was: ${error.error}`
      );
    }
    // return an observable with a user-facing error message
    return throwError("Something bad happened; please try again later.");
  }

  getUnhealthyWords(): Observable<Object> {
    return this.http
      .get(unHealthyWordsURL)
      .pipe(retry(this.NUMBER_OF_RETRY), catchError(this.handleError));
  }

  deleteUnhealthyWord(id: string): Observable<Object> {
    return this.http
      .delete(deleteUnhealthywordsURL(id))
      .pipe(retry(this.NUMBER_OF_RETRY), catchError(this.handleError));
  }

  createUnhealthyWord(word: string): Observable<Object> {
    return this.http
      .post(createUnhealthyWord, { word })
      .pipe(retry(this.NUMBER_OF_RETRY), catchError(this.handleError));
  }
}
