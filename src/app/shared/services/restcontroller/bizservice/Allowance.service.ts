import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { BaseService } from "../../services/base.service";
import { Departments001mb } from "../entities/Departments001mb";
import { Allowance001mb } from "../entities/Allowance001mb";

@Injectable()
export class AllowanceManager extends BaseService {
  private allowancetUrl: string = `${environment.apiUrl}/allowance`
  allAllowance(unitslno:any) {
    let data: any = {};
    data['unitslno'] = unitslno;
    return this.getCallService(`${this.allowancetUrl}` + "/findAll",data);
  }


 allowancesave(allowance001mb:Allowance001mb) {

    return this.postCallService(`${this.allowancetUrl}` + "/save", {},allowance001mb);
  }
 allowanceupdate(allowance001mb:Allowance001mb) {
    return this.putCallService(`${this.allowancetUrl}` + "/update", {},allowance001mb);
  }

 allowancedelete(slNo: any) {
    let data: any = {};
    data['slNo'] = slNo;
    return this.deleteCallService(`${this.allowancetUrl}` + "/delete", data);
  }
  findOne(id: any) {
    let data: any = {};
    data['id'] = id;
    return this.getCallService(`${this.allowancetUrl}`, data);
  }

}
