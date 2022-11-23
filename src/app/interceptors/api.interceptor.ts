import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { TokenService } from '../services/token.service';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {

  constructor(private tokenService:TokenService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {


    request = request.clone({
      setHeaders: {
        'Authorization': 'Bearer '+ this.tokenService.getToken()
       }

     });
   // Also handle errors globally
   return next.handle(request).pipe(
     tap(x => x, err => {
       // Handle this err
       console.error(`Error performing request, status code = ${err.status}`);
     })
   );
  }
}
