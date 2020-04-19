import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { postPushSubscriptionObjectURL } from "../shared/urls";

@Injectable({
  providedIn: "root",
})
export class PushMessageService {
  constructor(private http: HttpClient) {}

  addPushSubscriber(sub: PushSubscription) {
    return this.http.post(postPushSubscriptionObjectURL, {
      pushSubscriptionObject: sub,
    });
  }
}
