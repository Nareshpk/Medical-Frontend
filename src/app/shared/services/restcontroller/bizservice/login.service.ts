import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { BaseService } from "../../services/base.service";
import { Login001mb } from "../entities/Login001mb";

@Injectable()
export class LoginManager extends BaseService {

    private loginUrl: string = `${environment.apiUrl}/user`



    // updateUserName(updateUser: any) {
    //     let userName: any = {};
    //     userName['userName'] = updateUser;
    //     return this.postCallService("http://localhost:3000/testandreportstudio/api/login/updateUserName", {}, userName);
    // }

   
}