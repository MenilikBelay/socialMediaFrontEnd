import { Component, OnInit, Input } from "@angular/core";
import { NotificationService } from "../../services/notification.service";
import { SwPush } from "@angular/service-worker";
import { Notification } from "./notification";

@Component({
  selector: "app-notification",
  templateUrl: "./notification.component.html",
  styleUrls: ["./notification.component.css"],
})
export class NotificationComponent implements OnInit {
  notifications: string[] = [];

  constructor(
    private notificationService: NotificationService,
    private swPush: SwPush
  ) {}

  ngOnInit(): void {
    this.subscribeToPushMessages(); // subscribe
    this.notificationService.getNotifications().subscribe(
      (data: Notification) => this.notifications.push(data.content),
      (error) => console.log(error)
    );
    // update UI
  }

  subscribeToPushMessages() {
    // assuming user is subscribed on login
    this.swPush.messages.subscribe((event: any | Notification) => {
      console.log("EVENT: ", event.notification.data);
      this.notifications.push(event.notification.data.content);
    });
  }
}
