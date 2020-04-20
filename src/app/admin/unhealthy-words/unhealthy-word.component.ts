import { Component, Input, Output, EventEmitter } from "@angular/core";
import { UnhealthyWord } from "./unhealthyWord";
import { UnhealthyService } from "src/app/services/admin/unhealthy.service";

@Component({
  selector: "app-unhealthy-word",
  templateUrl: "./unhealthy-word.component.html",
  styleUrls: ["./unhealthy-word.component.css"],
})
export class UnhealthyWordComponent {
  @Input() word: UnhealthyWord;
  @Output() x: EventEmitter<string> = new EventEmitter<string>();
  constructor(private unhealthyService: UnhealthyService) {}

  onDelete() {
    // delete the word
    this.unhealthyService.deleteUnhealthyWord(this.word._id).subscribe(
      (data: any) => this.x.emit(this.word._id), //TODO display success
      (error) => console.log(error) //TODO display failure
    );
  }
}
