import { Component, Input } from "@angular/core";
import { UnhealthyWord } from "./unhealthyWord";
import { UnhealthyService } from "src/app/services/admin/unhealthy.service";

@Component({
  selector: "app-unhealthy-word",
  templateUrl: "./unhealthy-word.component.html",
  styleUrls: ["./unhealthy-word.component.css"],
})
export class UnhealthyWordComponent {
  @Input() word: UnhealthyWord;

  constructor(private unhealthyService: UnhealthyService) {}

  onDelete() {
    // delete the word
    this.unhealthyService.deleteUnhealthyWord(this.word._id).subscribe(
      (data: any) => console.log(data), //TODO display success
      (error) => console.log(error) //TODO display failure
    );
  }
}
