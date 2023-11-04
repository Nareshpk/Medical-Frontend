import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { BaseService } from "../../services/base.service";
import { Monthlyexpenses001mb } from "../entities/Monthlyexpenses001mb";


@Injectable()
export class MonthlyexpensesManager extends BaseService {
  private monthlyexpensestUrl: string = `${environment.apiUrl}/monthlyexpenses`
  allmonthlyexpenses(unitslno:any) {
    let data: any = {};
    data['unitslno'] = unitslno;
    return this.getCallService(`${this.monthlyexpensestUrl}` + "/findAll",data);
  }

  monthlyexpensessave(monthlyexpenses001mb: Monthlyexpenses001mb) {

    return this.postCallService(`${this.monthlyexpensestUrl}` + "/save", {}, monthlyexpenses001mb);
  }
  monthlyexpensesupdate(monthlyexpenses001mb: Monthlyexpenses001mb) {
    return this.putCallService(`${this.monthlyexpensestUrl}` + "/update", {}, monthlyexpenses001mb);
  }

  monthlyexpensesdelete(slNo: any) {
    let data: any = {};
    data['slNo'] = slNo;
    return this.deleteCallService(`${this.monthlyexpensestUrl}` + "/delete", data);
  }
  findOne(id: any) {
    let data: any = {};
    data['id'] = id;
    return this.getCallService(`${this.monthlyexpensestUrl}`, data);
  }

}
