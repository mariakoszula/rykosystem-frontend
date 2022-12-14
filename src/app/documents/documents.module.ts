import {NgModule} from "@angular/core";
import {SharedModule} from "../shared/shared.module";
import {RouterModule} from "@angular/router";
import {AuthGuard, ProgramSelectedGuard} from "../auth/authguard.service";
import {DocumentsComponent} from "./documents.component";
import {ContractlistComponent} from "./contractlist/contractlist.component";
import {ContractsGenComponent} from "./contracts-gen/contracts-gen.component";
import {RegisterGenComponent} from "./register-gen/register-gen.component";
import {ContractDetailsComponent} from "./contract-details/contract-details.component";
import {ProgramResolverService} from "../programs/program-resolver.service";
import {ContractResolverService} from "./documents-resolver.service";
import {SchoolResolverService} from "../schools/school-resolver.service";
import {DocumentGenerationInfoComponent} from "./document-generation-info/document-generation-info.component";
import {ContractDataEditorComponent} from "./contract-details/contract-data-editor/contract-data-editor.component";
import {AnnexDataEditorComponent} from "./contract-details/annex-data-editor/annex-data-editor.component";
import {RecordGenComponent} from "./record-gen/record-gen.component";
import {RecordDataService} from "../record-planner/record-data.service";
import {RecordResolverService} from "../record-planner/record-resolver.service";

@NgModule(({
  declarations: [
    DocumentsComponent,
    ContractlistComponent,
    RegisterGenComponent,
    ContractsGenComponent,
    DocumentGenerationInfoComponent,
    ContractDataEditorComponent,
    AnnexDataEditorComponent,
    ContractDetailsComponent,
    RecordGenComponent],
  imports: [
    SharedModule,
    RouterModule.forChild([
      {
        path: '',
        canActivate: [AuthGuard, ProgramSelectedGuard],
        component: DocumentsComponent,
        resolve: [ProgramResolverService, SchoolResolverService],
        children: [
          {path: 'umowy', component: ContractsGenComponent, resolve: [ContractResolverService]},
          {path: 'umowy/:school_id', component: ContractDetailsComponent},
          {path: 'umowy/:school_id/:contract_id/edycja', component: ContractDataEditorComponent},
          {path: 'umowy/:school_id/:contract_id/nowy_aneks', component: AnnexDataEditorComponent},
          {path: 'umowy/:school_id/:contract_id/:annex_id/edycja', component: AnnexDataEditorComponent},
          {path: 'rejestr', component: RegisterGenComponent},
          {
            path: 'wydanie-na-zewnatrz',
            component: RecordGenComponent,
            resolve: [ContractResolverService, RecordResolverService]
          },
        ]
      }
    ])
  ]
}))
export class DocumentsModule {

}
