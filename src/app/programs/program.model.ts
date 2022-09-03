export class Program {
  constructor(public id: number,
              public semester_no: number,
              public school_year: string,
              public company_id: number,
              public start_date: string | null,
              public end_date: string | null,
              public fruitVeg_price: number | null,
              public dairy_price: number | null,
              public fruitVeg_min_per_week: number | null,
              public dairy_min_per_week: number | null,
              public dairy_amount: number | null,
              public fruitVeg_amount: number | null
  ) {

  }

}