import { Injectable } from "@angular/core";
import { map } from 'rxjs/operators';
import { environment } from "src/environments/environment";
import { BaseService } from '../../services/base.service';
import { User001mb } from "../entities/User001mb";


@Injectable({ providedIn: 'root' })
export class AuthManager extends BaseService {

    private authManagerUrl: string = `${environment.apiUrl}/auth`;
 
    
    login(uName: string, pWord: string, dept: number, unit: number,) {
        let params: any = {};
        params['username'] = uName;
        params['password'] = pWord;
        params['dpslno'] = dept;
        params['unitdeptslno'] = unit;
        // params['unitslNo'] = unitslNo;
        return this.getCallService(`${this.authManagerUrl}` + `/getUserAuthentication`, params)
            .pipe(map(res => {
                if (res) {
                    sessionStorage.setItem('currentUser', JSON.stringify(res));
                    this.currentUserSubject.next(res.userDTO);
                }
                return res;
            }))
    }

    public get getcurrentUser(): User001mb {
        let currentUser = JSON.parse(sessionStorage.getItem('currentUser') || '{}');
        this.currentUserSubject.next(currentUser.userDTO);
        return this.currentUserSubject.value;
    }

    public setcurrentUser(user001mb: any) {
        let currentUser = JSON.parse(sessionStorage.getItem('currentUser') || '{}');
        currentUser.userDTO = user001mb;
        sessionStorage.setItem('currentUser', JSON.stringify(currentUser));
        this.currentUserSubject.next(currentUser.userDTO);
    }

    logout(temp: any) {
        sessionStorage.removeItem('currentUser');
        this.dataSharedService.changeMenuAction(null);
        this.currentUserSubject.next(temp);
        this.router.navigate(['']);
    }

}
