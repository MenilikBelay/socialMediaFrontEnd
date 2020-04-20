import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError, retry } from "rxjs/operators";
import { getNotificationsURL } from "../shared/urls";

@Injectable({
  providedIn: "root",
})
export class NotificationService {
  private readonly NUMBER_OF_RETRY = 3;

  constructor(private http: HttpClient) {}

  getNotifications(): Observable<Object> {
    return this.http.get(getNotificationsURL).pipe(
      retry(this.NUMBER_OF_RETRY),
      catchError((error) => throwError(error))
    );
  }
}
