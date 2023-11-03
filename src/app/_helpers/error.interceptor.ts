import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthManager } from '../shared/services/restcontroller/bizservice/auth-manager.service';
import { CalloutService } from '../shared/services/services/callout.service';


@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private authManager: AuthManager, private calloutService: CalloutService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(err => {
            if (err.status === 401) {
                this.authManager.logout(null);
            }
            if (err.status === 403) {
                this.calloutService.showError("Invalid Access");
            }
            if (err.error.statusCode === 500) {
                this.calloutService.showError(err.error.message);
            }
            const error = err.error.message || err.statusText;
            return throwError(error);
        }))
    }
}