import { AdminTaskListComponent } from './admin-tasklist/admintasklist.component';
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { UnhealthyWordsListComponent } from "./unhealthy-words/unhealthy-words-list.component";
import { RouterModule } from "@angular/router";
import { HttpClientModule } from "@angular/common/http";
import { UnhealthyWordComponent } from "./unhealthy-words/unhealthy-word.component";
import { AddUnhealthyWordComponent } from "./unhealthy-words/add-unhealthy-word.component";
import { FormsModule } from "@angular/forms";
import { AppRoutingModule } from '../app-routing.module';

@NgModule({
  declarations: [
    UnhealthyWordsListComponent,
    UnhealthyWordComponent,
    AddUnhealthyWordComponent,
    AdminTaskListComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    AppRoutingModule,

    RouterModule.forChild([

      { path: "admin", component: AdminTaskListComponent,
                children:[
                  {path: 'unhealthy-words',       component: UnhealthyWordsListComponent}, 
                  {path: 'add-word',              component: AddUnhealthyWordComponent},
                  {path: 'delete-word',              component: UnhealthyWordComponent}

                ]
      },
    ]),
    HttpClientModule,
  ],
})
export class AdminModule {}
