import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {ProgramlistComponent} from "./programlist/programlist.component";
import {AuthGuard} from "../auth/authguard.service";
import {ProgramDataEditorComponent} from "./program-add/program-data-editor.component";
import {ProgramsComponent} from "./programs.component";
import {ProgramDataComponent} from "./program-data/program-data.component";
import {ProgramResolverService} from "./program-resolver.service";
import {ProductAddComponent} from "./product-add/product-add.component";
import {WeekEditComponent} from "./weeks-add/week-edit.component";

const routes: Routes = [
  {
    path: '',
    component: ProgramsComponent,
    canActivate: [AuthGuard],
    children: [
      {path: '', component: ProgramlistComponent, resolve: [ProgramResolverService]},
      {path: 'nowy', component: ProgramDataEditorComponent},
      {path: ':id', component: ProgramDataComponent, resolve: [ProgramResolverService]},
      {path: ':id/edycja', component: ProgramDataEditorComponent, resolve: [ProgramResolverService]},
      {path: ':id/tygodnie', component: WeekEditComponent, resolve: [ProgramResolverService]},
      {path: ':id/produkty', component: ProductAddComponent, resolve: [ProgramResolverService]},
      {path: ':id/tygodnie/:week_id/edycja', component: WeekEditComponent, resolve: [ProgramResolverService]},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class ProgramRoutingModule {}
