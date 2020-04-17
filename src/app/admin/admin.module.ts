import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { UnhealthyWordsListComponent } from "./unhealthy-words/unhealthy-words-list.component";
import { RouterModule } from "@angular/router";
import { HttpClientModule } from "@angular/common/http";
import { UnhealthyWordComponent } from "./unhealthy-words/unhealthy-word.component";
import { AddUnhealthyWordComponent } from "./unhealthy-words/add-unhealthy-word.component";
import { FormsModule } from "@angular/forms";

@NgModule({
  declarations: [
    UnhealthyWordsListComponent,
    UnhealthyWordComponent,
    AddUnhealthyWordComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild([
      {
        path: "admin/unhealthy-words",
        component: UnhealthyWordsListComponent,
      },
    ]),
    HttpClientModule,
  ],
})
export class AdminModule {}
