import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { mergeMap } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import * as auth from '../actions/auth.actions';

@Injectable({
  providedIn: 'root'
})
export class AuthEffects {
  constructor(private actions$: Actions,
    private authService:AuthService,
    ) {}

  setUser$ = this.actions$.pipe(ofType(auth.loginUser),
  mergeMap(
    (action)=>this.authService.loging(action.user),

  )


  );

}
