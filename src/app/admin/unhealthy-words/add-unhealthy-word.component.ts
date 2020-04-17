import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { UnhealthyService } from "src/app/services/admin/unhealthy.service";
import { NgForm } from "@angular/forms";
import { ChildParentCommunicationProtocol } from "src/app/shared/child-parent-communication-protocol";
import { UnhealthyWord } from "./unhealthyWord";

@Component({
  selector: "app-add-unhealthy-word",
  templateUrl: "./add-unhealthy-word.component.html",
  styleUrls: ["./add-unhealthy-word.component.css"],
})
export class AddUnhealthyWordComponent {
  word: string;
  @Output() updateParentComponent: EventEmitter<
    ChildParentCommunicationProtocol<UnhealthyWord>
  > = new EventEmitter<ChildParentCommunicationProtocol<UnhealthyWord>>();

  constructor(private unhealthyService: UnhealthyService) {}

  onSubmit(form: NgForm) {
    if (form.valid && this.word.trim()) {
      this.unhealthyService.createUnhealthyWord(this.word).subscribe(
        (data: UnhealthyWord) => {
          this.updateParentComponent.emit({
            status: 1,
            message: "Word saved!",
            payload: data,
          });
          this.word = null;
        },
        (error) =>
          this.updateParentComponent.emit({
            status: -1,
            message: "Failed, try again", // TODO more verbose message please!!
          })
      );
    } else {
      this.updateParentComponent.emit({
        status: -1,
        message: "Please fill form properly. A word is required",
      });
    }
  }
}
