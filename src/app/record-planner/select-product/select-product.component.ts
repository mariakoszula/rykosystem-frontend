import {Component, Input, OnInit} from '@angular/core';
import {SchoolWithRecordDemand} from "../record.model";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {Store} from "@ngrx/store";
import {AppState} from "../../store/app.reducer";
import {switchMap} from "rxjs";
import {ProductStore} from "../../programs/program.model";
import {RecordDataService} from "../record-data.service";
import * as RecordActions from "../store/record.action";

@Component({
  selector: 'app-select-product',
  templateUrl: './select-product.component.html'
})
export class SelectProductComponent implements OnInit {

  //TODO if record already exists do not show this input button for this record
  // TODO modification, removing and accepting -- as in old program and this is only possibility to change already planned schools
  //TODO don't show products which was already delivered in amount of min-amount for this school; need record state
  //TODO future: possiblity to add extra products in another view
  fruitVegSuffix: string = "fruitVeg_";
  dairySuffix: string = "dairy_";
  recordRequiredForSchools?: Array<SchoolWithRecordDemand>;
  date?: string;
  displayWarning: boolean = false;
  fruitVegProducts: ProductStore[] = [];
  dairyProducts: ProductStore[] = [];
  schoolsWithoutSelectedProduct: string[] = [];
  messageBody: string = ""

  constructor(private activeRoute: ActivatedRoute,
              private router: Router,
              private store: Store<AppState>,
              private shareRecordDataService: RecordDataService) {
  }

  ngOnInit(): void {
    this.activeRoute.params.pipe(
      switchMap((param: Params) => {
        this.date = param["date"];
        return this.store.select('program');
      })).subscribe(programState => {
      this.fruitVegProducts = programState.fruitVegProducts;
      this.dairyProducts = programState.dairyProducts;
      this.recordRequiredForSchools = this.shareRecordDataService.getRecordDemand();
    });
  }

  onSend(values: any) {
    if (this.missing_product_selection(values)) {
      this.displayWarning = true;
      this.messageBody = this.schoolsWithoutSelectedProduct.join(", ");
    } else {
      this.messageBody = "";
      this.displayWarning = false;
      if (this.date && this.recordRequiredForSchools) {
        this.store.dispatch(new RecordActions.AddRecords({
          date: this.date,
          recordsDemand: this.recordRequiredForSchools
        }));
      }
    }
  }

  private missing_product_selection(formValues: any) {
    this.schoolsWithoutSelectedProduct = [];
    let transferValues: { [key: string]: string } = formValues;
    this.recordRequiredForSchools?.forEach(record => {
      if (record.fruitVeg.isRequired) {
        let key = this.fruitVegSuffix + record.nick;
        if (key in transferValues) {
          record.fruitVeg.name = transferValues[key];
        }
      }
      if (record.dairy.isRequired) {
        let key = this.dairySuffix + record.nick;
        if (key in transferValues) {
          record.dairy.name = transferValues[key];
        }
      }
      if (SelectProductComponent.required_data_not_selected(record)) {
        this.schoolsWithoutSelectedProduct.push(record.nick);
      }
    })
    return this.schoolsWithoutSelectedProduct.length !== 0;
  }

  private static required_data_not_selected(record: SchoolWithRecordDemand) {
    return (record.fruitVeg.isRequired && record.fruitVeg.name === "")
      && (record.dairy.isRequired && record.dairy.name === "")
      || (!record.fruitVeg.isRequired && (record.dairy.isRequired && record.dairy.name === ""))
      || (!record.dairy.isRequired && (record.fruitVeg.isRequired && record.fruitVeg.name === ""))
  }
}
