import {Program} from "./program.model";
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {AppState} from "../store/app.reducer";
import {Store} from "@ngrx/store";
import {Observable, of, switchMap} from "rxjs";
import {map, take} from "rxjs/operators";
import * as ProgramActions from "./store/program.action";
import {Actions, ofType} from "@ngrx/effects";
import {SET_ALL} from "./store/program.action";
import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class ProgramResolverService implements Resolve<Program[]> {

  constructor(private store: Store<AppState>,
              private actions$: Actions) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Program[]> | Promise<Program[]> | Program[] {
    return this.store.select("program").pipe(
      take(1),
      map(programState => {
        return programState.programs;
      }),
      switchMap(programs => {
        if (programs.length === 0) {
          this.store.dispatch(new ProgramActions.Fetch());
          return this.actions$.pipe(
            ofType(SET_ALL),
            take(1)
          )
        } else {
          return of(programs);
        }
      })
    );
  }
}
