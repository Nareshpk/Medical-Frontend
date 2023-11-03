import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthManager } from '../shared/services/restcontroller/bizservice/auth-manager.service';
import { DataSharedService } from '../shared/services/services/datashared.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
   
    constructor(private router: Router, private authManager: AuthManager, private dataSharedService: DataSharedService) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const currentUser = this.authManager.getcurrentUser;
        if (currentUser) {
            return true;
        }
        // not logged in so redirect to login page with the return url
        this.dataSharedService.changeMenuAction(null);
        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
        return false;
    }
}