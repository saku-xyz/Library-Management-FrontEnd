import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DashboardComponent} from "./dashboard/dashboard.component";
import {BooksComponent} from "./books/books.component";
import {IndexComponent} from "./index/index.component";
import {MembersComponent} from "./members/members.component";

const routes: Routes = [
  {path:'',redirectTo:'home',pathMatch:'full'},
  {path:'',component:IndexComponent},
  {path: 'dashBoard',component:DashboardComponent},
  {path: 'books',component:BooksComponent},
  {path: 'members',component:MembersComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents=[DashboardComponent,BooksComponent,IndexComponent,MembersComponent]
